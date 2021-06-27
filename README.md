<h1 align="center">
  <a href="https://github.com/marketplace/actions/markdown-autodocs">
    <img src="https://i.imgur.com/ZAC4qPa.png"/>
  </a>
</h1>
<p align="center">A GitHub Action that automatically generates & updates markdown content (like your README.md) from external or remote files.</p>
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
    <a href="https://github.com/dineshsonachalam/markdown-autodocs/releases">
      <img src="https://badgen.net/github/release/dineshsonachalam/markdown-autodocs" alt="latest release" height="20">     
    </a>
    <a href="https://github.com/dineshsonachalam/markdown-autodocs/blob/master/LICENSE" target="_blank">
        <img src="https://badgen.net/github/license/dineshsonachalam/markdown-autodocs" alt="MIT License" height="20">
    </a>
</p>

## Table of contents
* Why markdown-autodocs?
* Features
* Examples
* Usage
  * Adding markdown-autodocs in your workflow
  * Extended example with all possible options available for this Action
  * Example workflow
* Contributing
* License

## Why markdown-autodocs?
To make your repo more appealing and useful you need to provide example code snippets in your README.md. Manually copy and pasting each code snippet in their respective places in your README would be inefficient and time-consuming.

This problem can be solved using <b>markdown-autodocs</b> a GitHub Action that automatically generates & updates markdown content (like your README.md) from external or remote files. You need to add markers in your README.md that will tell markdown-autodocs where to insert the code snippet.

## ⚡️ Features
* Code block: Insert code snippet in your markdown file from external or remote files.
* JSON to HTML table: Insert HTML Table in your markdown file by converting JSON file contents to HTML table.
* Github Workflow Artifacts table: Insert Github workflow artifacts table in your markdown file by getting the latest artifacts for a workflow run.

## Examples

### CODE Block

Get code from an external file or URL and insert it in your markdown.

**Options:**
- `src`: The relative path to the code to pull in, or the `URL` where the raw code lives

<p align="center">Get code from external file</p>
<a href="https://gist.github.com/dineshsonachalam/f8eb73a29a379b3944fbfb0213c558bb#get-code-from-external-file">
    <img src="https://i.imgur.com/c8FskHr.png"/>
</a>


<p align="center">Get code from remote file</p>
<a href="https://gist.github.com/dineshsonachalam/f8eb73a29a379b3944fbfb0213c558bb#get-code-from-remote-file">
  <img src="https://i.imgur.com/kQ6qhlI.png"/>
</a>

### JSON to HTML table
Get JSON contents from an external file and convert it into HTML table and insert's it in your markdown.

**Options:**
- `src`: The relative path to the JSON file to pull in.

<a href="https://gist.github.com/dineshsonachalam/f8eb73a29a379b3944fbfb0213c558bb#json-to-html-table">
  <img src="https://i.imgur.com/t0pwMk2.png"/>
</a>

### Github Workflow Artifacts table

Get the list of latest artifacts generated from a workflow run. Generates a workflow artifacts table consists of artifacts download and workflow url in a HTML table and insert's it in your markdown file.

<a href="https://gist.github.com/dineshsonachalam/f8eb73a29a379b3944fbfb0213c558bb#github-workflow-artifacts-table">
  <img src="https://i.imgur.com/Gr6P0bM.png"/>
</a>

### [📦 Example Repo which uses all the markdown-autodocs feature](https://github.com/dineshsonachalam/repo-using-markdown-autodocs)

