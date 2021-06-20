<a href="https://github.com/marketplace/actions/audodoc-workflow-artifacts"><img src="https://i.imgur.com/Kod5IUj.png"/></a>
<p align="center">
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
```
<!-- AUTO-GENERATED-CONTENT:START (artifactsTable) -->
<!-- AUTO-GENERATED-CONTENT:END -->
```

## Usage in workflow
Add the following step at the end of your job, after other steps that might add or change files.

```yaml
# Autodoc workflow artifacts in ./README.md
- uses: dineshsonachalam/Autodoc-workflow-artifacts@v1

# To commit the updated ./README.md and  push them back to the GitHub repository
- uses: stefanzweifel/git-auto-commit-action@v4

# or use: https://github.com/actions/checkout#push-a-commit-using-the-built-in-token
```

The following is an extended example with all possible options available for this Action.

```yaml
- uses: dineshsonachalam/Autodoc-workflow-artifacts@v1
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

        - uses: dineshsonachalam/Autodoc-workflow-artifacts@v1

        - uses: stefanzweifel/git-auto-commit-action@v4
          with:
            commit_message: Autodoc workflow artifactsTable
            branch: ${{ github.head_ref }}
            file_pattern: README.md
```

## Artifacts
<!-- AUTO-GENERATED-CONTENT:START (artifactsTable) -->
<!-- AUTO-GENERATED-CONTENT:END -->

## License

[MIT](https://choosealicense.com/licenses/mit/) © [dineshsonachalam](https://www.github.com/dineshsonachalam)
