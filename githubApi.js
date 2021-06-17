import {get, getYamlConfigValue} from './crud.js'
import fetch from 'cross-fetch';

const githubInfo = {
    "url": "https://github.com",
    "api_url": "https://api.github.com/repos",
    "workflow_path": ".github/workflows"
}

/**
 * Module to interact with Github Api
 * Author: Dinesh Sonachalam
 * @param {string} repo 
 * @param {string} branch 
 * @param {string} githubApiToken 
 */
export default class githubApi {
    constructor(repo, branch, githubApiToken) {
        this.repo   = repo
        this.branch = branch
        this.githubApiToken = githubApiToken
        this.headers = {
            Authorization: `Bearer ${this.githubApiToken}`,
            "User-Agent": "request"
        }
        console.log(this.repo)
        console.log(this.branch)
        console.log(this.githubApiToken)
    }
    /**
     * Get all workflow names
     * @returns {Array} workflowNames
     */
    async getWorkflowNames(){
        const url = `${githubInfo.api_url}/${this.repo}/contents/${githubInfo.workflow_path}?ref=${this.branch}`  
        const workflows = await get(url, this.headers)
        let workflowNames = []
        for(var i = 0; i < workflows.length; i++) {
            var workflow = workflows[i];
            const workflowYamlUrl = workflow.download_url
            let workflowName = await getYamlConfigValue(workflowYamlUrl, this.headers, "name")
            workflowNames.push(workflowName)
        }
        return workflowNames
    }

    /**
     * Get run_id and check_suite_id of a workflow run
     * @param {Array} workflowNames 
     * @returns {Array} workflowIds
     */
    async getWorkflowIds(workflowNames){
        let workflowIds = []
        let url = `${githubInfo.api_url}/${this.repo}/actions/runs?branch=${this.branch}`
        let workflowRuns = (await get(url, this.headers)).workflow_runs
        workflowRuns.forEach((workflowRun) => {
            let workflowName = workflowRun.name
            if(workflowNames.includes(workflowName)){
                let runId = (workflowRun.id).toString();
                let checkSuiteId = (workflowRun.check_suite_id).toString()
                workflowIds.push({
                    "workflow_name": workflowName,
                    "run_id": runId,
                    "check_suite_id": checkSuiteId
                })
                workflowNames = workflowNames.filter(item => item !== workflowName)
                if(workflowNames.length===0){
                    return workflowIds
                }
            }
        });
        return workflowIds
    }
}
//  [ 'Integration-Test' ]
// /repos/{owner}/{repo}/actions/workflows/{workflow_id}    
// https://docs.github.com/en/rest/reference/actions#workflows

// https://api.github.com/dineshsonachalam/Lucid-Dynamodb/actions/workflows/Integration-Test

    

    
//     /**
//      * Get workflow details
//      * Github API:
//      * 1. List workflow runs for a repository
//      *    GET /repos/{repo}/actions/runs?branch={branch}
//      *    Docs: https://docs.github.com/en/rest/reference/actions#list-workflow-runs-for-a-repository
//      * For example: 
//      *    https://api.github.com/repos/dineshsonachalam/Lucid-Dynamodb/actions/runs?branch=master      
//      * @param {string} workflowNames
//      * @returns {array} workflows 
//      */
//     async get_workflow(workflowNames){
//         let workflows = []
//         let url = `${githubInfo.api_url}/${this.repo}/actions/runs?branch=${this.branch}`
//         let workflowRuns = (await get(url, this.headers)).workflow_runs
//         workflowRuns.forEach((workflow) => {
//             if(workflowNames.includes(workflow.name)){
//                 let workflowName = workflow.name
//                 let workflow_id = (workflow.id).toString();
//                 let workflow_check_suite_id = (workflow.check_suite_id).toString()
//                 workflows.push({
//                     "id": workflow_id,
//                     "check_suite_id": workflow_check_suite_id
//                 })
//                 workflowNames = workflowNames.filter(item => item !== workflowName)
//                 if(workflowNames.length===0){
//                     return workflows
//                 }
//             }
//         });
//         return workflows
//     }

//     /**
//      * Get artifacts download info
//      * Github API: 
//      * 1. List workflow run artifacts
//      *    GET /repos/{repo}/actions/runs/{run_id}/artifacts
//      *    Docs: https://docs.github.com/en/rest/reference/actions#list-workflow-run-artifacts
//      * For example:
//      *    https://api.github.com/repos/dineshsonachalam/Lucid-Dynamodb/actions/runs/918921415/artifacts
//      * @param {string} workflow_id 
//      * @param {string} check_suite_id 
//      * @returns {array} artifacts_info 
//      */
//     async get_artifacts_download_url(workflow_id, check_suite_id){
//         let url = `${githubInfo.api_url}/${this.repo}/actions/runs/${workflow_id}/artifacts`
//         const artifacts = (await get(url, this.headers)).artifacts
//         let artifacts_info = []
//         for(var i = 0; i < artifacts.length; i++) {
//             let artifact = artifacts[i]
//             let id = artifact.id
//             let artifact_name = artifact.name
//             let artifact_download_url = `${githubInfo.url}/${this.repo}/suites/${check_suite_id}/artifacts/${id}`
//             artifacts_info.push({
//                 name: artifact_name,
//                 download_url : artifact_download_url
//             })
//         }
//         return artifacts_info
//     }

//     /**
//      * Get all artifacts from a workflow.
//      * @param {array} workflowNames 
//      * @returns {array} artifacts
//      */
//     async get_artifacts(workflowNames){
//         const workflows = await this.get_workflow(workflowNames)
//         for(var i = 0; i < workflows.length; i++) {
//             let workflow = workflows[i];
//             let workflow_id = workflow.id
//             let check_suite_id = workflow.check_suite_id
//             let artifacts = await this.get_artifacts_download_url(workflow_id, check_suite_id)
//             return artifacts
//         }  
//     }
// }
