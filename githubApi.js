// import {get, getYamlConfigValue} from './crud'

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
}
    
    // async getWorkflowNames(){
    // }
    
    // /**
    //  * Generates Github workflow badges
    //  * Github API:
    //  * 1. List all filenames in a directory. 
    //  *    GET /repos/{repo}/contents/{path}?ref=${branch}`  
    //  *    Docs: https://docs.github.com/en/rest/reference/repos#get-repository-content
    //  * @returns {array} workflow_badges
    // */
    // async get_pipeline_info() {
    //     const url = `${githubInfo.api_url}/${this.repo}/contents/${githubInfo.workflow_path}?ref=${this.branch}`  
    //     const workflows = await get(url, this.headers)
    //     let pipeline_badges = []
    //     let pipelines       = []

    //     for(var i = 0; i < workflows.length; i++) {
    //         var workflow = workflows[i];
    //         const workflow_yaml_url = workflow.download_url
    //         let pipeline_name = await get_yaml_config_value(workflow_yaml_url, this.headers, "name")
    //         const workflow_badge = `${githubInfo.url}/${this.repo}/actions/workflows/${workflow.name}/badge.svg?branch=${this.branch}`
    //         pipeline_badges.push(workflow_badge);
    //         pipelines.push(pipeline_name)
    //     }        
    //     return {
    //         "pipelines" : pipelines,
    //         "pipeline_badges": pipeline_badges
    //     }      
    // }
    
//     /**
//      * Get workflow details
//      * Github API:
//      * 1. List workflow runs for a repository
//      *    GET /repos/{repo}/actions/runs?branch={branch}
//      *    Docs: https://docs.github.com/en/rest/reference/actions#list-workflow-runs-for-a-repository
//      * For example: 
//      *    https://api.github.com/repos/dineshsonachalam/Lucid-Dynamodb/actions/runs?branch=master      
//      * @param {string} workflow_names
//      * @returns {array} workflows 
//      */
//     async get_workflow(workflow_names){
//         let workflows = []
//         let url = `${githubInfo.api_url}/${this.repo}/actions/runs?branch=${this.branch}`
//         let workflows_info = (await get(url, this.headers)).workflow_runs
//         workflows_info.forEach((workflow) => {
//             if(workflow_names.includes(workflow.name)){
//                 let workflow_name = workflow.name
//                 let workflow_id = (workflow.id).toString();
//                 let workflow_check_suite_id = (workflow.check_suite_id).toString()
//                 workflows.push({
//                     "id": workflow_id,
//                     "check_suite_id": workflow_check_suite_id
//                 })
//                 workflow_names = workflow_names.filter(item => item !== workflow_name)
//                 if(workflow_names.length===0){
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
//      * @param {array} workflow_names 
//      * @returns {array} artifacts
//      */
//     async get_artifacts(workflow_names){
//         const workflows = await this.get_workflow(workflow_names)
//         for(var i = 0; i < workflows.length; i++) {
//             let workflow = workflows[i];
//             let workflow_id = workflow.id
//             let check_suite_id = workflow.check_suite_id
//             let artifacts = await this.get_artifacts_download_url(workflow_id, check_suite_id)
//             return artifacts
//         }  
//     }
// }
