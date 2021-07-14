<h1 align="center">
  <a href="https://github.com/marketplace/actions/markdown-autodocs">
    <img src="https://i.imgur.com/ZAC4qPa.png"/>
  </a>
</h1>
<p align="center">A GitHub Action that automatically generates & updates markdown content (like your README.md) from external or remote files.</p>
<p align="center">
    <a href="https://sonarcloud.io/dashboard?id=markdown-autodocs">
        <img src="https://sonarcloud.io/api/project_badges/quality_gate?project=markdown-autodocs"/>
    </a>
</p>
<p align="center">
    <a href="https://github.com/dineshsonachalam/markdown-autodocs/actions/workflows/npm-publish.yml">
        <img src="https://github.com/dineshsonachalam/markdown-autodocs/actions/workflows/npm-publish.yml/badge.svg"/>
    </a>
    <a href="https://github.com/dineshsonachalam/markdown-autodocs/actions/workflows/markdown-autodocs.yml">
        <img src="https://github.com/dineshsonachalam/markdown-autodocs/actions/workflows/markdown-autodocs.yml/badge.svg"/>
    </a>
    <a href="https://www.npmjs.com/package/markdown-autodocs">
      <img src="https://img.shields.io/npm/v/markdown-autodocs?color=dark%20green&label=npm%20package" alt="npm version" height="20">     
    </a>
    <a href="https://github.com/dineshsonachalam/markdown-autodocs/blob/master/LICENSE" target="_blank">
        <img src="https://badgen.net/github/license/dineshsonachalam/markdown-autodocs" alt="MIT License" height="20">
    </a>
</p>

## Table of contents
- [Why markdown-autodocs?](#why-markdown-autodocs)
- [Features](#features)
- [Examples](#examples)
  - [CODE Block](#code-block)
  - [JSON to HTML table](#json-to-html-table)
  - [Github Workflow Artifacts table](#github-workflow-artifacts-table)
  - [Example Repo which uses all the markdown-autodocs feature](#example-repo-which-uses-all-the-markdown-autodocs-feature)
- [Local usage without Github action](#local-usage-without-github-action)
- [Usage](#usage)
  - [Adding markdown-autodocs in your workflow](#adding-markdown-autodocs-in-your-workflow)
  - [Extended example with all possible options available for this Action](#extended-example-with-all-possible-options-available-for-this-action)
- [Github Workflow Artifacts](#github-workflow-artifacts)
- [Contributing](#contributing)
- [Used By](#-used-by)
- [License](#license)

## Why markdown-autodocs?
To make your repo more appealing and useful you need to provide example code snippets in your README.md. Manually copy and pasting each code snippet in their respective places in your README would be inefficient and time-consuming.

This problem can be solved using <b>markdown-autodocs</b> a GitHub Action that automatically generates & updates markdown content (like your README.md) from external or remote files. You need to add markers in your README.md that will tell markdown-autodocs where to insert the code snippet.

## Features
* <b>Code block:</b> Insert code snippet in your markdown file from external or remote files.
* <b>JSON to HTML table:</b> Insert HTML Table in your markdown file by converting JSON file contents to HTML table.
* <b>Github Workflow Artifacts table:</b> Insert the Github workflow artifacts table in your markdown file by getting the latest artifacts for a workflow run.

## Examples

### CODE Block

Get code from an external file or URL and insert it in your markdown.

**Options:**
- `src`: The relative path to the code to pull in, or the `URL` where the raw code lives

<a href="https://gist.github.com/dineshsonachalam/f8eb73a29a379b3944fbfb0213c558bb#get-code-from-external-file" target="_blank">
    <img src="https://i.imgur.com/NUMReeR.png"/>
</a>

<a href="https://gist.github.com/dineshsonachalam/f8eb73a29a379b3944fbfb0213c558bb#get-code-from-remote-file" target="_blank">
  <img src="https://i.imgur.com/blYRUXN.png"/>
</a>

### JSON to HTML table
Get JSON contents from an external file and convert it into an HTML table and insert's it in your markdown.

**Options:**
- `src`: The relative path to the JSON file to pull in.

<a href="https://gist.github.com/dineshsonachalam/f8eb73a29a379b3944fbfb0213c558bb#json-to-html-table" target="_blank">
  <img src="https://i.imgur.com/5pTHIpS.png"/>
</a>

### Github Workflow Artifacts table

Get the list of the latest artifacts generated from a workflow run. Generates a workflow artifacts table consists of artifacts download and workflow URL in an HTML table and inserts it in your markdown file.

<a href="https://gist.github.com/dineshsonachalam/f8eb73a29a379b3944fbfb0213c558bb#github-workflow-artifacts-table" target="_blank">
  <img src="https://i.imgur.com/gVHiSB8.png"/>
</a>

### [Example Repo which uses all the markdown-autodocs feature](https://github.com/dineshsonachalam/repo-using-markdown-autodocs)

## Local usage without Github action

**Install markdown-autodocs CLI:**
```
npm i -g markdown-autodocs
```

**markdown-autodocs CLI usage:**
```
dineshsonachalam@macbook ~ % markdown-autodocs --help
Usage: markdown-autodocs [options]

Options:
  -o, --outputFilePath <outputFilePaths...>  Output file paths
  -c, --category <categories...>             code-block, json-to-html-table, workflow-artifact-table
  -r, --repo <type>                          Repo name
  -b, --branch <type>                        Branch name
  -a, --accessToken <type>                   Github Access token
  -h, --help                                 display help for command
```

1. Code block
```
markdown-autodocs -c code-block -o ./README.md 
```
2. JSON to HTML table
```
markdown-autodocs -c json-to-html-table -o ./README.md
```
3. Github workflow artifacts table
```
markdown-autodocs -c workflow-artifact-table -o ./README.md -r $REPO -b $BRANCH -a $ACCESSTOKEN
```

## Usage

### Adding markdown-autodocs in your workflow
Add the following step at the end of your job, after other steps that might add or change files.
<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=./docs/latest-release.yml) -->
<!-- The below code snippet is automatically added from ./docs/latest-release.yml -->
```yml
uses: dineshsonachalam/markdown-autodocs@v1.0.2
```
<!-- MARKDOWN-AUTO-DOCS:END -->

###  Extended example with all possible options available for this Action
<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=./docs/markdown-autodocs.yml) -->
<!-- The below code snippet is automatically added from ./docs/markdown-autodocs.yml -->
```yml
- name: Markdown autodocs
- uses: dineshsonachalam/markdown-autodocs@v1.0.2
  with:
    # Optional, defaults to author of the commit that triggered the run
    commit_author: Author <actions@github.com>

    # Optional, defaults to "actions@github.com"
    commit_user_email: actions@github.com

    # Optional, but recommended
    # Defaults to "Apply automatic changes"
    commit_message: Apply automatic changes

    # Optional branch name where commit should be pushed to.
    # Defaults to the current branch.
    branch: feature-123

    # Optional output file paths, defaults to '[./README.md]'.
    output_file_paths: '[./README.md]'

    # Categories to automatically sync or transform its contents in the markdown files.
    # Defaults to '[code-block,json-to-html-table,workflow-artifact-table]'
    categories: '[code-block,json-to-html-table,workflow-artifact-table]'
```
<!-- MARKDOWN-AUTO-DOCS:END -->

## Github Workflow Artifacts
<!-- MARKDOWN-AUTO-DOCS:START (WORKFLOW_ARTIFACT_TABLE) -->
<table class="ARTIFACTS-TABLE"><thead><tr><th class="artifact-th">Artifact</th><th class="workflow-th">Workflow</th></tr></thead><tbody ><tr ><td class="artifact-td td_text"><a href=https://github.com/dineshsonachalam/markdown-autodocs/suites/3240585046/artifacts/75209078>Jest-integration-test-report</a></td><td class="workflow-td td_text"><a href=https://github.com/dineshsonachalam/markdown-autodocs/actions/runs/1031529096>integration-tests</a></td></tr>
<tr ><td class="artifact-td td_text"><a href=https://github.com/dineshsonachalam/markdown-autodocs/suites/3240585046/artifacts/75209079>module-dependencies-license-report</a></td><td class="workflow-td td_text"><a href=https://github.com/dineshsonachalam/markdown-autodocs/actions/runs/1031529096>integration-tests</a></td></tr>
<tr ><td class="artifact-td td_text"><a href=https://github.com/dineshsonachalam/markdown-autodocs/suites/3240585046/artifacts/75209080>size-of-dependencies</a></td><td class="workflow-td td_text"><a href=https://github.com/dineshsonachalam/markdown-autodocs/actions/runs/1031529096>integration-tests</a></td></tr>
<tr ><td class="artifact-td td_text"><a href=https://github.com/dineshsonachalam/markdown-autodocs/suites/3240585046/artifacts/75209081>vulnerabilities-audit-report</a></td><td class="workflow-td td_text"><a href=https://github.com/dineshsonachalam/markdown-autodocs/actions/runs/1031529096>integration-tests</a></td></tr></tbody></table>
<!-- MARKDOWN-AUTO-DOCS:END -->

## Contributing

* [Code of Conduct](CODE_OF_CONDUCT.md)
* [Contributing Guideline](CONTRIBUTING.md)

## 🚀 Used By

* [iro.js - 🎨 Modular color picker widget for JavaScript, with support for a bunch of color formats](https://github.com/jaames/iro.js)
* [LucidDynamodb - A minimalistic wrapper to AWS DynamoDB](https://github.com/dineshsonachalam/Lucid-Dynamodb)


## License

[MIT](https://choosealicense.com/licenses/mit/) © [dineshsonachalam](https://www.github.com/dineshsonachalam)
