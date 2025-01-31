from flask import Blueprint, jsonify
import json
import os

def read_json_file(file_path):
    """Helper function to read a JSON file."""
    if not os.path.exists(file_path):
        return None
    with open(file_path, 'r') as file:
        return json.load(file)

problems_bp = Blueprint('problems', __name__, url_prefix='/problems')

@problems_bp.route('/', methods=['GET'])
def get_problems():
    """Fetch all problems from all contests."""
    problem_dir = './data/problems'
    problems = []
    for problem in os.listdir(problem_dir):
        _file = f'{problem_dir}/{problem}/problem.json'
        _problem = read_json_file(_file)
        problems.append(_problem)
        if not _problem:
            return jsonify({"error": "Contest file not found"}), 404
    return jsonify(problems)

@problems_bp.route('/<problem_id>', methods=['GET'])
def get_problem(problem_id):
    """Fetch a specific problem by ID."""
    problem_dir = f'./data/problems/{problem_id}'
    _file = f'{problem_dir}/problem.json'
    problem = read_json_file(_file)
    print(_file)
    if not problem:
        return jsonify({"error": "Problem not found"}), 404
    
    return jsonify(problem)
