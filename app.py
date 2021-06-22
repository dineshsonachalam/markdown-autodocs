import argparse

def get_cli_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('-commit_author', required=True)
    parser.add_argument('-commit_user_email', required=True)
    parser.add_argument('-commit_message', required=True)
    parser.add_argument('-branch', required=True)
    parser.add_argument('-output_file_paths', required=True)
    parser.add_argument('-categories', required=True)
    return parser.parse_args()
    
def string_to_list(option):
    option = option.translate({ord(i):None for i in '[]" '})
    return option.split(",")

if __name__ == "__main__":
    args = get_cli_args()
    commit_author = args.commit_author
    commit_user_email = args.commit_user_email
    commit_message = args.commit_message
    branch = args.branch
    output_file_paths = string_to_list(args.output_file_paths)
    categories = string_to_list(args.categories)
    
    print("commit_author: ", commit_author)
    print("commit_user_email: ", commit_user_email)
    print("commit_message: ", commit_message)
    print("branch: ", branch)
    print("output_file_paths: ", output_file_paths)
    print("categories: ", categories)
    
# python3 app.py -commit_author 'dineshsonachalam' -commit_user_email 'dineshsonachalam@gmail.com' -commit_message 'Apply automatic changes' -branch 'master' -output_file_paths '[./README.md,./docs/Intro.md]' -categories '[code-block,json-to-html-table,workflow-artifact-table]'
# commit_author:  dineshsonachalam
# commit_user_email:  dineshsonachalam@gmail.com
# commit_message:  Apply automatic changes
# branch:  master
# output_file_paths:  ['./README.md', './docs/Intro.md']
# categories:  ['code-block', 'json-to-html-table', 'workflow-artifact-table']