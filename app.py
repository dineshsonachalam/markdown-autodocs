import argparse
import logging

def get_cli_args():
    parser = argparse.ArgumentParser()
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
    logging.basicConfig(level=logging.INFO)
    args = get_cli_args()
    commit_author = args.commit_author
    commit_user_email = args.commit_user_email
    commit_message = args.commit_message
    branch = args.branch
    output_file_paths = option_processor(args.output_file_paths)
    categories = option_processor(args.categories)
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
# output_file_paths:  ./README.md ./docs/Intro.md
# categories:  code-block json-to-html-table workflow-artifact-table

#   with:
#     commit_author: dineshsonachalam <dineshsonachalam@users.noreply.github.com>
#     commit_user_email: actions@github.com
#     commit_message: Apply automatic changes
#     branch: refs/heads/master
#     output_file_paths: [./README.md]
#     categories: [code-block,json-to-html-table,workflow-artifact-table]
# commit_author:  dineshsonachalam <dineshsonachalam@users.noreply.github.com>
# commit_user_email:  actions@github.com
# commit_message:  Apply automatic changes
# branch:  refs/heads/master
# output_file_paths:  ['./README.md']
# categories:  ['code-block', 'json-to-html-table', 'workflow-artifact-table']