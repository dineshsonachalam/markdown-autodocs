import argparse
import logging
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
    logging.basicConfig(level=logging.INFO)
    args = get_cli_args()
    repo = args.repo
    access_token = args.access_token
    commit_author = args.commit_author
    commit_user_email = args.commit_user_email
    commit_message = args.commit_message
    branch = (args.branch).split("/")[-1]
    output_file_paths = option_processor(args.output_file_paths)
    categories = option_processor(args.categories)
    print("repo: ",repo)
    print("access_token: ", access_token)
    print("commit_author: ", commit_author)
    print("commit_user_email: ", commit_user_email)
    print("commit_message: ", commit_message)
    print("branch: ", branch)
    print("output_file_paths: ", output_file_paths)
    print("categories: ", categories)
    ma_cli_command = "node index.js --outputFilePath {} --category {} --repo {} --branch {} --accessToken {}".format(output_file_paths, categories, repo, branch, access_token)
    os.system(ma_cli_command)

# python3 app.py -repo $repo -access_token $accessToken -commit_author 'dineshsonachalam' -commit_user_email 'dineshsonachalam@gmail.com' -commit_message 'Apply automatic changes' -branch 'master' -output_file_paths '[./README.md]' -categories '[code-block,json-to-html-table,workflow-artifact-table]'    
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