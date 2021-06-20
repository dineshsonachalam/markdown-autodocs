import fs from "fs";
import Table from 'table-builder'

export const generateHtmlTable = function(tableHeaders, tableRow, className) {
    return ((new Table({'class': className}))
        .setHeaders(tableHeaders)
        .setData(tableRow)
        .render()
    )
}

export const convertJsonToHtmlTable = function(inputFilePath) {
    let tableRow = JSON.parse(fs.readFileSync(inputFilePath))
    if(Object.keys(tableRow).length>0){
        let tableHeaderData = Object.keys(tableRow[0])
        let tableHeaders = {}
        tableHeaderData.forEach((header) => {
            tableHeaders[header]=header
        })
        return generateHtmlTable(tableHeaders, tableRow, "JSON-TO-HTML-TABLE")
    }else {
        return ""
    }
}

let inputFilePath='./app.json'

let result = convertJsonToHtmlTable(inputFilePath)
console.log(result)

