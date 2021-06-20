import fs from "fs";
import path from 'path'
import Table from 'table-builder'
import markdownMagic from 'markdown-magic'

export const generateHtmlTable = function(tableHeaders, tableRow, className) {
    return ((new Table({'class': className}))
        .setHeaders(tableHeaders)
        .setData(tableRow)
        .render()
    )
}

export const convertJsonToHtmlTable = function(content, options = {}, config) {
    const inputFilePath = options["src"]
    let tableRow = JSON.parse(fs.readFileSync(inputFilePath))
    if(Object.keys(tableRow).length>0){
        let tableHeaderData = Object.keys(tableRow[0])
        let tableHeaders = {}
        tableHeaderData.forEach((header) => {
            tableHeaders[header]=header
        })
        console.log("tableHeaders: ", tableHeaders)
        console.log("tableRow: ", tableRow)
        const htmlTable = generateHtmlTable(tableHeaders, tableRow, "JSON-TO-HTML-TABLE")
        console.log("HTML Table: ", htmlTable)
        return htmlTable
    }else {
        return ""
    }

}

const outputFilePath='./README.md'
const markdownPath = path.join(outputFilePath)
const config = {
    transforms: {
      JSON_TO_HTML_TABLE: convertJsonToHtmlTable,
    },
};
markdownMagic(markdownPath, config)