import argparse
import os

def get_cli_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('-repo', required=True)
    parser.add_argument('-access_token', required=True)
    parser.add_argument('-commit_author', required=True)
    parser.add_argument('-commit_user_email', required=True)
    parser.add_argument('-commit_message', required=True)
    parser.add_argument('-branch', required=True)
    parser.add_argument('-output_file_paths', required=True)
    parser.add_argument('-categories', required=True)
    return parser.parse_args()
    
def option_processor(option):
    option = option.translate({ord(i):None for i in '[]" '})
    option = option.split(",")
    option = ' '.join(option)
    return option

if __name__ == "__main__":
    args = get_cli_args()
    repo = args.repo
    access_token = args.access_token
    commit_author = args.commit_author
    commit_user_email = args.commit_user_email
    commit_message = args.commit_message
    branch = (args.branch).split("/")[-1]
    output_file_paths = option_processor(args.output_file_paths)
    categories = option_processor(args.categories)
    ma_cli_command = "markdown-autodocs-test --outputFilePath {} --category {} --repo {} --branch {} --accessToken {}".format(output_file_paths, categories, repo, branch, access_token)
    os.system("git config user.name {}".format(commit_author))
    os.system("git config user.email {}".format(commit_user_email))
    os.system("sudo npm i -g markdown-autodocs-test")
    os.system(ma_cli_command)
    os.system("git add {}".format(output_file_paths))
    os.system("git commit -m {} {}".format(commit_message, output_file_paths))
    os.system("git push origin {}".format(branch))

