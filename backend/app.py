from flask import Flask, jsonify, request
from flask_cors import CORS


from routes.problem_routes import problems_bp
from routes.user_routes import users_bp
from routes.contest_routes import contests_bp
from routes.execute_code_routes import code_execution_bp

app = Flask(__name__)
CORS(app, origins='*')

app.register_blueprint(problems_bp)
app.register_blueprint(contests_bp)
app.register_blueprint(users_bp)
app.register_blueprint(code_execution_bp)

@app.route('/')
def index():
    return jsonify(message='Welcome to the Flask API!')


if __name__ == '__main__':
    app.run(debug=True)
