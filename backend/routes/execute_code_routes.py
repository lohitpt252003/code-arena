from flask import Blueprint, request, jsonify
import subprocess
import os
import uuid
import platform

# Create a Blueprint for code execution
code_execution_bp = Blueprint('code_execution', __name__, url_prefix='/execute')

@code_execution_bp.route('/', methods=['GET', 'POST'])
def execute_code():
    code = request.args.get('code')
    language = request.args.get('language')  # e.g., 'python', 'java', 'cpp', 'c', 'javascript'
    input_data = request.args.get('input', '')

    if not code or not language:
        return jsonify({"error": "Missing code or language"})

    # Generate a temporary file name
    file_name = f"temp_{uuid.uuid4().hex}"
    file_path = f"{file_name}.{language if language != 'c' else 'c'}"
    print(file_name, file_path)
    try:
        # Write the code to a temporary file
        with open(file_path, 'w') as f:
            f.write(code)

        # Define executable paths based on the operating system
        if platform.system() == 'Windows':
            python_exec = 'python'  # Use 'python' instead of 'python3' on Windows
            java_exec = 'javac'
            java_run = 'java'
            gcc_exec = 'gcc'
            gpp_exec = 'g++'
            node_exec = 'node'
        else:
            python_exec = 'python3'
            java_exec = 'javac'
            java_run = 'java'
            gcc_exec = 'gcc'
            gpp_exec = 'g++'
            node_exec = 'node'

        # Execute the code based on language
        if language == 'python':
            result = subprocess.run(
                [python_exec, file_path],
                input=input_data.encode(),
                capture_output=True,
                timeout=5
            )
        elif language == 'java':
            class_name = file_name  # Java class name should match the filename
            file_path = f"{class_name}.java"
            with open(file_path, 'w') as f:
                f.write(code.replace("class Main", f"class {class_name}"))
            subprocess.run([java_exec, file_path], check=True)
            result = subprocess.run(
                [java_run, class_name],
                input=input_data.encode(),
                capture_output=True,
                timeout=5
            )
        elif language == 'cpp':
            subprocess.run([gpp_exec, file_path, '-o', file_name], check=True)
            result = subprocess.run(
                [f'./{file_name}'] if platform.system() != 'Windows' else [file_name],
                input=input_data.encode(),
                capture_output=True,
                timeout=5
            )
        elif language == 'c':
            subprocess.run([gcc_exec, file_path, '-o', file_name], check=True)
            result = subprocess.run(
                [f'./{file_name}'] if platform.system() != 'Windows' else [file_name],
                input=input_data.encode(),
                capture_output=True,
                timeout=5
            )
        elif language == 'javascript':
            result = subprocess.run(
                [node_exec, file_path],
                input=input_data.encode(),
                capture_output=True,
                timeout=5
            )
        else:
            return jsonify({"error": "Unsupported language"})

    except subprocess.TimeoutExpired:
        return jsonify({"error": "Execution timed out"})
    except subprocess.CalledProcessError as e:
        return jsonify({"error": f"Compilation/Execution failed: {e}"})
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        # Clean up all temporary files
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
            if language == 'java' and os.path.exists(f"{file_name}.class"):
                os.remove(f"{file_name}.class")
            if language in ['cpp', 'c'] and os.path.exists(file_name):
                os.remove(file_name + '.exe')
                # os.remove(file_name)
            if language == 'javascript' and os.path.exists(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f"Error deleting temporary files: {e}")

    return jsonify({
        "stdout": result.stdout.decode(),
        "stderr": result.stderr.decode()
    })