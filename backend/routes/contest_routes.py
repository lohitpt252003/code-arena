from flask import Blueprint, jsonify
import json
import os

contests_bp = Blueprint('contests', __name__, url_prefix='/contests')

def read_json_file(file_path):
    """Helper function to read a JSON file."""
    if not os.path.exists(file_path):
        return None
    with open(file_path, 'r') as file:
        return json.load(file)


@contests_bp.route('/', methods=['GET'])
def get_contests():
    """Fetch all contests."""
    contests = []
    contest_dir = './data/contests'
    for contest_file in os.listdir(contest_dir):
        _file = f'{contest_dir}/{contest_file}/contest.json'
        contest = read_json_file(_file)
        contests.append(contest)
        if not contest:
            return jsonify({"error": "Contest file not found"}), 404
    return jsonify(contests)

@contests_bp.route('/<contest_id>', methods=['GET'])
def get_contest(contest_id):
    """Fetch a specific contest by ID."""
    contest_dir = f'./data/contests/{contest_id}'
    _file = f'{contest_dir}/contest.json'
    contest = read_json_file(_file)
    if not contest:
        return jsonify({"error": "Contest not found"}), 404
    return jsonify(contest)

@contests_bp.route('/<contest_id>/leaderboard', methods=['GET'])
def get_contest_leaderboard(contest_id):
    """Fetch a specific contest leaderboard by ID."""
    contest_dir = f'./data/contests/{contest_id}'
    _file = f'{contest_dir}/leaderboard.json'
    leaderboard = read_json_file(_file)
    return jsonify(leaderboard)


@contests_bp.route('/<contest_id>/submissions', methods=['GET'])
def get_contest_submissions(contest_id):
    """Fetch a specific contest submissions by ID."""
    contest_dir = f'./data/contests/{contest_id}'
    _file = f'{contest_dir}/submissions.json'
    submissions = read_json_file(_file)
    if not submissions:
        return jsonify({"error": "Submissions not found"}), 404
    return jsonify(submissions)

