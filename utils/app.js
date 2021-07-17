import fs from "fs"
import path from "path"
import markdownMagic from "markdown-magic"
import Table from "table-builder"
import GithubApi from "./GithubApi.js"

/**
 * 
 * Generate HTML table
 * @param {Object} tableHeaders 
 * @param {Array} tableRows 
 * @param {String} className
 * @returns {Object} htmlTable 
 */
export const generateHtmlTable = function(tableHeaders, tableRows, className) {
    return ((new Table({"class": className}))
        .setHeaders(tableHeaders)
        .setData(tableRows)
        .render()
    );
}

/**
 * Module to generate JSON to HTML table.
 * @param {String} content 
 * @param {Object} options 
 * @param {Object} config 
 * @returns {String} htmlTable
 */
export const convertJsonToHtmlTable = function(content, options = {}, config) {
    const inputFilePath = options["src"];
    let tableRows = JSON.parse(fs.readFileSync(inputFilePath))
    if(Object.keys(tableRows).length>0){
        let tableHeaderData = Object.keys(tableRows[0])
        let tableHeaders = {}
        tableHeaderData.forEach((header) => {
            tableHeaders[header]=header
        })
        return generateHtmlTable(tableHeaders, tableRows, "JSON-TO-HTML-TABLE");
    }else {
        return "";
    }
}

/**
 * Module to generate artifacts html table.
 * @param {String} content 
 * @param {Object} options 
 * @param {Object} config 
 * @returns {String} artifactsTable
 */
export const generateArtifactsTable = function(content, options = {}, config) {
    let workflows = config.workflows
    let tableRows = []
    let tableHeaders = { "artifact" : "Artifact", "workflow": "Workflow" };
    workflows.forEach((workflow) => {
        let workflow_name = `<a href=${workflow.run_url}>${workflow.name}</a>`
        let artifacts = workflow["artifacts"]
        artifacts.forEach((artifact) => {
            let artifact_name = `<a href=${artifact.url}>${artifact.name}</a>`
            tableRows.push({
                "artifact": artifact_name,
                "workflow": workflow_name
            })
        })
    })
    return generateHtmlTable(tableHeaders, tableRows, "ARTIFACTS-TABLE");
}

/**
 * @param {String} outputFilePath 
 * @param {String} repo 
 * @param {String} branch 
 * @param {String} githubApiToken 
 * @returns {String} message
 */
export const app = async function(outputFilePath, category, repo, branch, githubApiToken) {
    const markdownPath = path.join(outputFilePath);
    if(category == "code-block"){
        const config = {
            matchWord: 'MARKDOWN-AUTO-DOCS'
        };
        markdownMagic(markdownPath, config)
        return `Auto documented code-block in ${outputFilePath}`;
    }else if(category == "json-to-html-table"){
        const config = {
            matchWord: 'MARKDOWN-AUTO-DOCS',
            transforms: {
              JSON_TO_HTML_TABLE: convertJsonToHtmlTable,
            },
        };
        markdownMagic(markdownPath, config)        
        return `Converted JSON to HTML table. Then auto-documented HTML table in ${outputFilePath}`
    }else if(category == "workflow-artifact-table"){
        const github = new GithubApi(repo, branch, githubApiToken);
        const workflowNames = await github.getWorkflowNames();
        const workflowIds   = await github.getWorkflowIds(workflowNames);
        const workflowInfo = await github.getWorkflowArtifacts(workflowIds);
        const workflows = workflowInfo.workflowArtifacts;
        const config = {
            matchWord: 'MARKDOWN-AUTO-DOCS',
            workflows: workflows,
            transforms: {
              WORKFLOW_ARTIFACT_TABLE: generateArtifactsTable,
            },
        };
        markdownMagic(markdownPath, config)
        return `Auto documented ${workflowInfo.totalArtifacts} artifacts in artifactsTable - ${outputFilePath}`;
    }
}








