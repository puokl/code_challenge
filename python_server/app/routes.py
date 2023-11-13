from flask import request, jsonify
import os
from .utils.subprocess_handler import execute_code

def init_routes(app):

    @app.route('/healthcheck', methods=['GET'])
    def healthcheck():
        return "Server is running!"

    @app.route('/submit', methods=['POST'])
    def submit_code():
        data = request.json

        # Check for required keys in the data
        if 'code' not in data or 'challengeName' not in data:
            return jsonify({'error': 'Missing required data'}), 400  # 400 Bad Request

        code = data['code']
        challenge_name = data['challengeName']

        # Create a directory for the challenge
        challenge_dir = os.path.join('challenges', challenge_name)
        os.makedirs(challenge_dir, exist_ok=True)

        # Write the user's code to a file
        solution_file_path = os.path.join(challenge_dir, 'solution.py')
        with open(solution_file_path, 'w') as file:
            file.write(code)

        # Path to the test file
        test_file_path = os.path.join(challenge_dir, f'{challenge_name}_test.py')

        # Execute the tests using the subprocess_handler utility
        return_code, stdout, stderr, full_result = execute_code(test_file_path)
        print("return_code:", return_code)
        print("rstdout:", stdout)
        print("stderr:", stderr)
        print("full_result: ", full_result)


        # Check the result and form the response
        if return_code == 0:
            response_message = "Tests passed!"
        else:
            response_message = "Tests failed!"

        return jsonify({
            "message": response_message, 
            "details": stdout, 
            "error": stderr,

        })


      