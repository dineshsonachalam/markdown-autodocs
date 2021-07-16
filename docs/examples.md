# Examples

## CODE Block

Get code from an external file or URL and insert it in your markdown.

#### Get code from external file

```
<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=./relative/path/to/code.js) -->
<!-- MARKDOWN-AUTO-DOCS:END -->
```


#### Get code from remote file

```
<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=https://raw.githubusercontent.com/kubernetes/kubectl/master/docs/book/examples/nginx/nginx.yaml) -->
<!-- MARKDOWN-AUTO-DOCS:END -->
```

## JSON to HTML table

Get JSON contents from an external file and convert it into HTML table. Then insert it in your markdown.

```
<!-- MARKDOWN-AUTO-DOCS:START (JSON_TO_HTML_TABLE:src=./relative/path/to/dev_salaries.json) -->
<!-- MARKDOWN-AUTO-DOCS:END -->
```

## Github Workflow Artifacts table

Get the list of latest artifacts generated from a workflow run. Generates a workflow artifacts table consists of artifacts download and workflow url in a HTML table and insert's it in your markdown file.

```
<!-- MARKDOWN-AUTO-DOCS:START (WORKFLOW_ARTIFACT_TABLE) -->
<!-- MARKDOWN-AUTO-DOCS:END -->
```