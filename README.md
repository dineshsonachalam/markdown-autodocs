<a href="https://github.com/marketplace/actions/audodoc-workflow-artifacts"><img src="https://i.imgur.com/ZAC4qPa.png"/></a>
<p align="center">
    <a href="https://github.com/dineshsonachalam/Autodoc-workflow-artifacts/actions/workflows/npm-publish.yml">
        <img src="https://github.com/dineshsonachalam/Autodoc-workflow-artifacts/actions/workflows/npm-publish.yml/badge.svg"/>
    </a>
    <a href="https://github.com/dineshsonachalam/Autodoc-workflow-artifacts/actions/workflows/autodoc-workflow-artifacts.yml">
        <img src="https://github.com/dineshsonachalam/Autodoc-workflow-artifacts/actions/workflows/autodoc-workflow-artifacts.yml/badge.svg"/>
    </a>
    <a href="https://badge.fury.io/js/autodoc-workflow-artifacts">
      <img src="https://badge.fury.io/js/autodoc-workflow-artifacts.svg" alt="npm version" height="18">     
    </a>
    <a href="https://packagephobia.com/result?p=badge@0.2.1">
      <img src="https://packagephobia.com/badge?p=badge@0.2.1">
    </a>
    <a href="https://github.com/dineshsonachalam/Lucid-Dynamodb/blob/master/LICENSE" target="_blank">
        <img src="https://img.shields.io/apm/l/atomic-design-ui.svg" alt="MIT License">
    </a>
   
</p>

A GitHub Action for auto documenting workflow artifacts table in README.md.

## Usage in markdown
<a href="https://gist.github.com/dineshsonachalam/66080387ad80b49a2cd4828658efe22c">
    <img src="https://user-images.githubusercontent.com/12673979/122662860-f550da80-d1b3-11eb-9ffb-912d086b7f66.png"/>
</a>


## Usage in workflow
Add the following step at the end of your job, after other steps that might add or change files.

```yaml
# Autodoc workflow artifacts in ./README.md
- uses: dineshsonachalam/Autodoc-workflow-artifacts@v2

# To commit the updated ./README.md and  push them back to the GitHub repository
- uses: stefanzweifel/git-auto-commit-action@v4

# or use: https://github.com/actions/checkout#push-a-commit-using-the-built-in-token
```

The following is an extended example with all possible options available for this Action.

```yaml
- uses: dineshsonachalam/Autodoc-workflow-artifacts@v2
  with:
    # Optional branch name where commit should be pushed to.
    # Defaults to the current branch.
    branch: feature-123

    # Optional local file path to the README.md. 
    # Defaults to the root of the repository (`./README.md`)
    input_file_path: ./README.md
```

## Example Workflow

```yaml
name: autodoc-workflow-artifacts

on:
  workflow_run:
    workflows:
      - publish-to-npm
    types:
      - completed

jobs:        
  autoupdate-readme:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v2

        - uses: dineshsonachalam/Autodoc-workflow-artifacts@v2

        - uses: stefanzweifel/git-auto-commit-action@v4
          with:
            commit_message: Autodoc workflow artifactsTable
            branch: ${{ github.head_ref }}
            file_pattern: README.md
```

## Artifacts


## License

[MIT](https://choosealicense.com/licenses/mit/) © [dineshsonachalam](https://www.github.com/dineshsonachalam)


## Example (Code block):
<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./examples/autodoc-workflow-artifacts.yml) -->
<!-- The below code snippet is automatically added from ./examples/autodoc-workflow-artifacts.yml -->
```yml
name: autodoc-workflow-artifacts

on:
  workflow_run:
    workflows:
      - publish-to-npm
    types:
      - completed

jobs:        
  autoupdate-readme:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v2

        - uses: ./

        - uses: stefanzweifel/git-auto-commit-action@v4
          with:
            commit_message: Autodoc workflow artifacts
            branch: ${{ github.head_ref }}
            file_pattern: README.md
```
<!-- The below code snippet is automatically added from ./examples/autodoc-workflow-artifacts.yml -->
<!-- AUTO-GENERATED-CONTENT:END -->


## Example (JSON to HTML table):
<!-- AUTO-GENERATED-CONTENT:START (JSON_TO_HTML_TABLE:src=./app1.json) -->
<table class="JSON-TO-HTML-TABLE"><thead><tr><th class="name-th">name</th><th class="age-th">age</th><th class="link-th">link</th></tr></thead><tbody ><tr ><td class="name-td td_text">Larry Wall</td><td class="age-td td_num">57</td><td class="link-td td_text"><a href='http://www.wall.org/~larry/'>www.wall.org/~larry/</a></td></tr>
<tr ><td class="name-td td_text">Bill Gates</td><td class="age-td td_num">56</td><td class="link-td td_text"><a href='http://www.microsoft.com'>www.microsoft.com</a></td></tr>
<tr ><td class="name-td td_text">Daffy Duck</td><td class="age-td td_num">75</td><td class="link-td td_num"></td></tr></tbody></table>
<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (JSON_TO_HTML_TABLE:src=./app2.json) -->
<table class="JSON-TO-HTML-TABLE"><thead><tr><th class="name-th">name</th><th class="age-th">age</th><th class="link-th">link</th></tr></thead><tbody ><tr ><td class="name-td td_text">Dinesh Sonachalam</td><td class="age-td td_num">57</td><td class="link-td td_text"><a href='http://www.wall.org/~larry/'>www.wall.org/~larry/</a></td></tr>
<tr ><td class="name-td td_text">Niranjan Sonachalam</td><td class="age-td td_num">56</td><td class="link-td td_text"><a href='http://www.microsoft.com'>www.microsoft.com</a></td></tr></tbody></table>
<!-- AUTO-GENERATED-CONTENT:END -->

## Example (ARTIFACTS TABLE)
<!-- AUTO-GENERATED-CONTENT:START (WORKFLOW_ARTIFACT_TABLE) -->
<table class="ARTIFACTS-TABLE"><thead><tr><th class="artifact-th">Artifact</th><th class="workflow-th">Workflow</th></tr></thead><tbody ><tr ><td class="artifact-td td_text"><a href=https://github.com/dineshsonachalam/Lucid-Dynamodb/suites/3039101370/artifacts/68998446>dependency-graph</a></td><td class="workflow-td td_text"><a href=https://github.com/dineshsonachalam/Lucid-Dynamodb/actions/runs/954189227>Integration-test</a></td></tr>
<tr ><td class="artifact-td td_text"><a href=https://github.com/dineshsonachalam/Lucid-Dynamodb/suites/3039101370/artifacts/68998447>module-dependencies-license-report</a></td><td class="workflow-td td_text"><a href=https://github.com/dineshsonachalam/Lucid-Dynamodb/actions/runs/954189227>Integration-test</a></td></tr>
<tr ><td class="artifact-td td_text"><a href=https://github.com/dineshsonachalam/Lucid-Dynamodb/suites/3039101370/artifacts/68998448>Pytest-report</a></td><td class="workflow-td td_text"><a href=https://github.com/dineshsonachalam/Lucid-Dynamodb/actions/runs/954189227>Integration-test</a></td></tr></tbody></table><br><p>Auto generated by <a href="https://github.com/dineshsonachalam/Autodoc-workflow-artifacts">Autodoc-workflow-artifacts</a></p>
<!-- AUTO-GENERATED-CONTENT:END -->

```

dineshsonachalam@macbook markdown-autodocs % node index.js -o ./README.md -c code-block
✔ README.md Updated
 Transforms run
  ⁕ CODE:src=./examples/autodoc-workflow-artifacts.yml

[2021-06-21T09:12:06.701] [INFO] default - Autodocumented code-block in ./README.md

dineshsonachalam@macbook markdown-autodocs % node index.js -o ./README.md -c json-to-html-table
✔ README.md Updated
 Transforms run
  ⁕ JSON_TO_HTML_TABLE:src=./app1.json
  ⁕ JSON_TO_HTML_TABLE:src=./app2.json
  ⁕ CODE:src=./examples/autodoc-workflow-artifacts.yml

[2021-06-21T09:15:43.242] [INFO] default - Converted JSON to HTML table. Then autodocumented HTML table in ./README.md


dineshsonachalam@macbook markdown-autodocs % node index.js -c workflow-artifact-table -o ./README.md -r $repo -b $branch -a $accessToken
category:  workflow-artifact-table
outputFilePath:  ./README.md
repo:  dineshsonachalam/Lucid-Dynamodb
branch:  master
accessToken:  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
✔ README.md Updated
 Transforms run
  ⁕ WORKFLOW_ARTIFACT_TABLE
  ⁕ CODE:src=./examples/autodoc-workflow-artifacts.yml

[2021-06-21T09:22:32.957] [INFO] default - Autodocumented 3 artifacts in artifactsTable - ./README.md
```