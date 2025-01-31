from flask import Blueprint, request, jsonify
import subprocess
import os
import uuid
import time
import resource

execute_bp = Blueprint('execute', __name__)

@execute_bp.route('/api/execute', methods=['POST'])
def execute_code():
    data = request.json
    code = data.get('code')
    language = data.get('language')  # e.g., 'python', 'java', 'cpp'
    input_data = data.get('input', '')

    # Save code to a temporary file
    file_name = f"temp_{uuid.uuid4().hex}"
    if language == 'python':
        file_path = f"{file_name}.py"
    elif language == 'java':
        file_path = f"{file_name}.java"
    elif language == 'cpp':
        file_path = f"{file_name}.cpp"
    else:
        return jsonify({"error": "Unsupported language"}), 400

    with open(file_path, 'w') as f:
        f.write(code)

    try:
        # Start measuring time
        start_time = time.perf_counter()

        if language == 'python':
            result = subprocess.run(
                ['python3', file_path],
                input=input_data.encode(),
                capture_output=True,
                timeout=5  # Timeout after 5 seconds
            )
        elif language == 'java':
            subprocess.run(['javac', file_path], check=True)
            result = subprocess.run(
                ['java', file_name],
                input=input_data.encode(),
                capture_output=True,
                timeout=5
            )
        elif language == 'cpp':
            subprocess.run(['g++', file_path, '-o', file_name], check=True)
            result = subprocess.run(
                ['./' + file_name],
                input=input_data.encode(),
                capture_output=True,
                timeout=5
            )

        # Stop measuring time
        end_time = time.perf_counter()
        execution_time = end_time - start_time  # Time in seconds
        memory_usage = resource.getrusage(resource.RUSAGE_CHILDREN).ru_maxrss  # Memory in KB

    except subprocess.TimeoutExpired:
        return jsonify({"error": "Execution timed out"}), 400
    except subprocess.CalledProcessError as e:
        return jsonify({"error": str(e)}), 400
    finally:
        # Clean up temporary files
        if os.path.exists(file_path):
            os.remove(file_path)
        if language == 'java' and os.path.exists(f"{file_name}.class"):
            os.remove(f"{file_name}.class")
        if language == 'cpp' and os.path.exists(file_name):
            os.remove(file_name)

    return jsonify({
        "stdout": result.stdout.decode(),
        "stderr": result.stderr.decode(),
        "execution_time": execution_time,  # Time in seconds
        "memory_usage": memory_usage  # Memory in KB
    })