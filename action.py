import argparse
import os
import fnmatch

def get_cli_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('-repo', required=True)
    parser.add_argument('-access_token', required=True)
    parser.add_argument('-commit_author', required=True)
    parser.add_argument('-commit_user_email', required=True)
    parser.add_argument('-commit_message', required=True)
    parser.add_argument('-branch', required=True)
    return parser.parse_args()

def find(pattern, path):
    result = ""
    for root, dirs, files in os.walk(path):
        for name in files:
            if fnmatch.fnmatch(name, pattern):
                result = result + " " + os.path.join(root, name)
    return result.strip()

if __name__ == "__main__":
    args = get_cli_args()
    repo = args.repo
    access_token = args.access_token
    commit_author = args.commit_author
    commit_user_email = args.commit_user_email
    commit_message = args.commit_message
    branch = (args.branch).split("/")[-1]
    output_file_paths = find('*.md', './')
    ma_cli_command = f"markdown-autodocs --outputFilePath {output_file_paths} --repo {repo} --branch {branch} --accessToken {access_token}"
    os.system(f"git config user.name '{commit_author}'")
    os.system(f"git config user.email '{commit_user_email}'")
    os.system("sudo npm i -g markdown-autodocs")
    os.system(ma_cli_command)
    os.system(f"git add {output_file_paths}")
    os.system(f"git commit -m '{commit_message}' {output_file_paths}")
    os.system(f"git push origin {branch}")