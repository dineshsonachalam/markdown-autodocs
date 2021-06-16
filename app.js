import path from 'path'
import markdownMagic from 'markdown-magic'
import {markdownTable} from 'markdown-table'

function artifactTable(content, _options = {}, config) {
  const result = markdownTable([
      ['Branch', 'Commit'],
      ['main', '0123456789abcdef'],
      ['staging', 'fedcba9876543210']
  ])
  return result
}

const config = {
  transforms: {
    ARTIFACT: artifactTable,
  },
};
const markdownPath = path.join('./README.md')
markdownMagic(markdownPath, config)