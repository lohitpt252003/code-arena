import os
import json

# Directory where users will be stored
USERS_DIR = "../data/users"

# Default content for user.json
DEFAULT_USER_JSON = {
    "id": None,
    "username": "john_doe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "role": "participant",  # Roles: participant, admin, etc.
    "joined_at": "2023-10-15T10:00:00Z",
    "problems_solved_by_category": {
        "easy": 0,
        "medium": 0,
        "hard": 0
    },
    "contests_participated": [],
    "problems_solved": [],
    "rating": 0,
}

# Default content for submissions.json (initially empty)
DEFAULT_SUBMISSIONS_JSON = []

def create_user_folder():
    # Ensure the users directory exists
    if not os.path.exists(USERS_DIR):
        os.makedirs(USERS_DIR)

    # Find the next available ID
    existing_folders = [int(f) for f in os.listdir(USERS_DIR) if f.isdigit()]
    next_id = max(existing_folders) + 1 if existing_folders else 1

    # Create the new user folder
    user_folder = os.path.join(USERS_DIR, str(next_id))
    os.makedirs(user_folder)

    # Create user.json
    user_json = DEFAULT_USER_JSON.copy()
    user_json["id"] = next_id
    with open(os.path.join(user_folder, "user.json"), "w") as f:
        json.dump(user_json, f, indent=4)

    # Create submissions.json
    with open(os.path.join(user_folder, "submissions.json"), "w") as f:
        json.dump(DEFAULT_SUBMISSIONS_JSON, f, indent=4)

    print(f"Created user folder: {user_folder}")

if __name__ == "__main__":
    create_user_folder()