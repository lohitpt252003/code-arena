import os
import json

# Directory where problems will be stored
PROBLEMS_DIR = "../data/problems"

# Default content for problem.json
DEFAULT_PROBLEM_JSON = {
    "id": None,
    "title": "Problem Name",
    "description": "Problem Statement",
    "tags": [""],
    "difficulty": "",
    "constraints": [
        "constraint1",
        "constraint2",
        "constraint3"
    ],
    "author": "Admin",
    "tester": "Admin",
    "input_format": "Input format",
    "output_format": "Output format",
    "time_limit": "1 second",
    "memory_limit": "256 MB",
    "examples": [
        {
            "input": "input1",
            "expected_output": "expected_output1"
        },
        {
            "input": "input2",
            "expected_output": "expected_output2"
        }
    ]
}

# Default content for testcases.json
DEFAULT_TESTCASES_JSON = [
    {
        "id": 1,
        "input": "input1",
        "expected_output": "expected_output1"
    },
    {
        "id": 2,
        "input": "input2",
        "expected_output": "expected_output2"
    }
]

# Default content for boilerplate.json
DEFAULT_BOILERPLATE_JSON = {
    "python": "def solve():\n    # Your code here\n\nif __name__ == '__main__':\n    t = int(input())\n    while t--:\n        solve()",
    "java": "import java.util.*;\n\npublic class Main {\n    public static void solve() {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int t = sc.nextInt();\n        while (t-- > 0) {\n            solve();\n        }\n    }\n}",
    "javascript": "function solve() {\n    // Your code here\n}\n\nlet t = parseInt(prompt());\nwhile (t--) {\n    solve();\n}",
    "c": "#include <stdio.h>\n\nvoid solve() {\n    // Your code here\n}\n\nint main() {\n    int t;\n    scanf(\"%d\", &t);\n    while (t--) {\n        solve();\n    }\n    return 0;\n}",
    "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nvoid solve() {\n    // Your code here\n}\n\nint main() {\n    int t;\n    cin >> t;\n    while (t--) {\n        solve();\n    }\n    return 0;\n}"
}

# Default content for solution.json
DEFAULT_SOLUTION_JSON = {
    "explanation": "Explanation",
    "codes": {
        "python": "def twoSum(nums, target):\n    num_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in num_map:\n            return [num_map[complement], i]\n        num_map[num] = i\n    return []",
        "java": "import java.util.*;\n\npublic class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> numMap = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (numMap.containsKey(complement)) {\n                return new int[] { numMap.get(complement), i };\n            }\n            numMap.put(nums[i], i);\n        }\n        return new int[] {};\n    }\n}",
        "javascript": "function twoSum(nums, target) {\n    const numMap = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (numMap.has(complement)) {\n            return [numMap.get(complement), i];\n        }\n        numMap.set(nums[i], i);\n    }\n    return [];\n}",
        "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    int* result = (int*)malloc(2 * sizeof(int));\n    *returnSize = 2;\n    for (int i = 0; i < numsSize; i++) {\n        for (int j = i + 1; j < numsSize; j++) {\n            if (nums[i] + nums[j] == target) {\n                result[0] = i;\n                result[1] = j;\n                return result;\n            }\n        }\n    }\n    return result;\n}",
        "cpp": "#include <vector>\n#include <unordered_map>\n\nclass Solution {\npublic:\n    std::vector<int> twoSum(std::vector<int>& nums, int target) {\n        std::unordered_map<int, int> numMap;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (numMap.find(complement) != numMap.end()) {\n                return { numMap[complement], i };\n            }\n            numMap[nums[i]] = i;\n        }\n        return {};\n    }\n};"
    }
}

def create_problem_folder():
    # Ensure the problems directory exists
    if not os.path.exists(PROBLEMS_DIR):
        os.makedirs(PROBLEMS_DIR)

    # Find the next available ID
    existing_folders = [int(f) for f in os.listdir(PROBLEMS_DIR) if f.isdigit()]
    next_id = max(existing_folders) + 1 if existing_folders else 1

    # Create the new problem folder
    problem_folder = os.path.join(PROBLEMS_DIR, str(next_id))
    os.makedirs(problem_folder)

    # Create problem.json
    problem_json = DEFAULT_PROBLEM_JSON.copy()
    problem_json["id"] = next_id
    with open(os.path.join(problem_folder, "problem.json"), "w") as f:
        json.dump(problem_json, f, indent=4)

    # Create testcases.json
    with open(os.path.join(problem_folder, "testcases.json"), "w") as f:
        json.dump(DEFAULT_TESTCASES_JSON, f, indent=4)

    # Create boilerplate.json
    with open(os.path.join(problem_folder, "boilerplate.json"), "w") as f:
        json.dump(DEFAULT_BOILERPLATE_JSON, f, indent=4)

    # Create solution.json
    with open(os.path.join(problem_folder, "solution.json"), "w") as f:
        json.dump(DEFAULT_SOLUTION_JSON, f, indent=4)

    print(f"Created problem folder: {problem_folder}")

if __name__ == "__main__":
    create_problem_folder()