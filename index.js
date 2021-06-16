import {markdownTable} from 'markdown-table'
module.exports = function DEPENDENCYTABLE(content, _options = {}, config) {
    const result = markdownTable([
        ['Branch', 'Commit'],
        ['main', '0123456789abcdef'],
        ['staging', 'fedcba9876543210']
    ])
    return result
};