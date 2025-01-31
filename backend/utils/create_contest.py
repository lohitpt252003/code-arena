import os
import json

# Directory where contests will be stored
CONTESTS_DIR = "../data/contests"

# Default content for contest.json
DEFAULT_CONTEST_JSON = {
    "id": None,
    "title": "Weekly Coding Contest",
    "description": "Join our weekly coding contest and solve exciting problems!",
    "start_time": "2023-10-15T10:00:00Z",
    "end_time": "2023-10-15T12:00:00Z",
    "duration": "2 hours",
    "problems": [],  # List of problem IDs included in the contest
    "organizer": "Coding Club",
    "rules": [
        "No plagiarism allowed.",
        "Submissions must be made before the contest ends."
    ]
}

# Default content for problems.json
DEFAULT_PROBLEMS_JSON = [
    {
        "id": "problem1",
        "title": "Two Sum",
        "difficulty": "easy"
    },
    {
        "id": "problem2",
        "title": "Add Two Numbers",
        "difficulty": "medium"
    }
]

# Default content for leaderboard.json (initially empty)
DEFAULT_LEADERBOARD_JSON = []

# Default content for submissions.json (initially empty)
DEFAULT_SUBMISSIONS_JSON = []

def create_contest_folder():
    # Ensure the contests directory exists
    if not os.path.exists(CONTESTS_DIR):
        os.makedirs(CONTESTS_DIR)

    # Find the next available ID
    existing_folders = [int(f) for f in os.listdir(CONTESTS_DIR) if f.isdigit()]
    next_id = max(existing_folders) + 1 if existing_folders else 1

    # Create the new contest folder
    contest_folder = os.path.join(CONTESTS_DIR, str(next_id))
    os.makedirs(contest_folder)

    # Create contest.json
    contest_json = DEFAULT_CONTEST_JSON.copy()
    contest_json["id"] = next_id
    with open(os.path.join(contest_folder, "contest.json"), "w") as f:
        json.dump(contest_json, f, indent=4)

    # Create problems.json
    with open(os.path.join(contest_folder, "problems.json"), "w") as f:
        json.dump(DEFAULT_PROBLEMS_JSON, f, indent=4)

    # Create leaderboard.json
    with open(os.path.join(contest_folder, "leaderboard.json"), "w") as f:
        json.dump(DEFAULT_LEADERBOARD_JSON, f, indent=4)

    # Create submissions.json
    with open(os.path.join(contest_folder, "submissions.json"), "w") as f:
        json.dump(DEFAULT_SUBMISSIONS_JSON, f, indent=4)

    print(f"Created contest folder: {contest_folder}")

if __name__ == "__main__":
    create_contest_folder()