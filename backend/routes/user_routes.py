from flask import Blueprint, jsonify
import json
import os 

users_bp = Blueprint('users', __name__, url_prefix='/users')

def read_json_file(file_path):
    """Helper function to read a JSON file."""
    if not os.path.exists(file_path):
        return None
    with open(file_path, 'r') as file:
        return json.load(file)


@users_bp.route('/', methods=['GET'])
def get_users():
    """Fetch all users."""
    users = []
    user_dir = './data/users'
    for user_file in os.listdir(user_dir):
        _file = f'{user_dir}/{user_file}/user.json'
        user = read_json_file(_file)
        users.append(user)
        if not user:
            return jsonify({"error": "User file not found"}), 404
    return jsonify(users)

@users_bp.route('/<user_id>', methods=['GET'])
def get_user(user_id):
    """Fetch a specific user by ID."""
    user_dir = f'./data/users/{user_id}'
    _file = f'{user_dir}/user.json'
    user = read_json_file(_file)
    if not user:
        return jsonify({"error": "user not found"}), 404
    return jsonify(user)