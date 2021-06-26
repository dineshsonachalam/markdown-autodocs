from ruamel.yaml import YAML
import requests

def update_latest_release_version(file_path, action_name):
    file = yaml.load(open(file_path))
    if "latest-release" in file_path:
        file["uses"]=action_name
    else:
        file[-1]["uses"] = action_name
    with open(file_path, 'w') as outfile:
        yaml.dump(file, outfile)

if __name__ == "__main__":
    yaml=YAML()
    yaml.default_flow_style = False
    url = "https://api.github.com/repos/dineshsonachalam/markdown-autodocs/releases/latest"
    response = requests.request("GET", url, headers={}, data={})
    response = response.json()
    tag = response["tag_name"]
    action_name="dineshsonachalam/markdown-autodocs@{}".format(tag)
    files = [
        './docs/latest-release.yml',
        './docs/markdown-autodocs.yml'
    ]
    for _, file_path in enumerate(files):
        update_latest_release_version(file_path, action_name)