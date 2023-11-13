import subprocess

def execute_code(file_path, time_limit=5):
    try:
        result = subprocess.run(["python", "-m", "unittest", "-v", file_path], 
                                timeout=time_limit, 
                                capture_output=True, 
                                text=True)
        print("Result:", result)
        return result.returncode, result.stdout, result.stderr, result
    except subprocess.TimeoutExpired:
        return "Time limit exceeded", None
    except subprocess.SubprocessError as e:
        return "", f"An error occurred: {str(e)}"
