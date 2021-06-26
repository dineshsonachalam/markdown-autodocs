<a href="https://github.com/marketplace/actions/markdown-autodocs"><img src="https://i.imgur.com/ZAC4qPa.png"/></a>
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

A GitHub action that uses comment blocks in markdown files to automatically sync or transform its contents. Then to commit the markdown files and push them back to the GitHub repository. By default, the commit is made in the name of "GitHub Actions" and co-authored by the user that made the last commit.
- Automatically keep markdown files up to date from local or remote code sources
- Create an HTML table from JSON file and add the table to markdown files.
- Identifies all the artifacts generated from a workflow. Then add the artifacts table consisting of the artifact download and workflow-run URL in the markdown files.

The comments markdown autodocs uses are hidden in markdown and when viewed as HTML.

This `README.md` is generated with `markdown-autodocs` [view the raw file](https://raw.githubusercontent.com/dineshsonachalam/markdown-autodocs/master/README.md) to see how.

[Video demo - In-Progress](http://www.youtube.com) • [Example Repo](https://github.com/dineshsonachalam/repo-using-markdown-autodocs)

## Table of contents
* [Usage](#usage)
* [Example Workflow](#example-workflow)
* [Inputs](#inputs)
* [Transforms](#transforms)
  * [CODE](#code)
  * [REMOTE](#remote)
  * [JSON_TO_HTML_TABLE](#json_to_html_table)
  * [WORKFLOW_ARTIFACT_TABLE](#workflow_artifact_table)
* [Running the tests](#running-the-tests)
* [Credits](#credits) 
* [License](#license)
