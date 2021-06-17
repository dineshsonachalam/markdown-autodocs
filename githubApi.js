import {get, getYamlConfigValue} from './crud.js'

const githubInfo = {
    "url": "https://github.com",
    "apiUrl": "https://api.github.com/repos",
    "workflowPath": ".github/workflows"
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
    }
    /**
     * Get all workflow names
     * @returns {Array} workflowNames
     */
    async getWorkflowNames(){
        const url = `${githubInfo.apiUrl}/${this.repo}/contents/${githubInfo.workflowPath}?ref=${this.branch}`  
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
        let url = `${githubInfo.apiUrl}/${this.repo}/actions/runs?branch=${this.branch}`
        let workflowRuns = (await get(url, this.headers)).workflow_runs
        workflowRuns.forEach((workflowRun) => {
            let workflowName = workflowRun.name
            if(workflowNames.includes(workflowName)){
                let runId = (workflowRun.id).toString();
                let checkSuiteId = (workflowRun.check_suite_id).toString()
                workflowIds.push({
                    "name": workflowName,
                    "run_url": `${githubInfo.url}/${this.repo}/actions/runs/${runId}`,
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

    /**
     * Get artifacts download URL
     * @param {string} runId 
     * @param {string} checkSuiteId 
     * @returns {array} artifactsDownloadUrl
     */
    async getArtifactsDownloadUrl(runId, checkSuiteId){
        let url = `${githubInfo.apiUrl}/${this.repo}/actions/runs/${runId}/artifacts`
        const artifacts = (await get(url, this.headers)).artifacts
        let artifactsDownloadUrl = []
        for(var i = 0; i < artifacts.length; i++) {
            let artifact = artifacts[i]
            let artifactId = artifact.id
            let artifactName = artifact.name
            let artifactDownloadUrl = `${githubInfo.url}/${this.repo}/suites/${checkSuiteId}/artifacts/${artifactId}`
            artifactsDownloadUrl.push({
                name: artifactName,
                url : artifactDownloadUrl
            })
        }
        return artifactsDownloadUrl
    }

    /**
     * Get workflow artifacts
     * @param {Array} workflowIds 
     * @returns {Array} workflowArtifacts
     */
    async getWorkflowArtifacts(workflowIds){
        let workflowArtifacts = []
        for(var i = 0; i < workflowIds.length; i++) {
            let workflow = workflowIds[i];
            let runId = workflow['run_id']
            let checkSuiteId = workflow['check_suite_id']
            let artifacts = await this.getArtifactsDownloadUrl(runId, checkSuiteId)
            if(artifacts.length>0){
                workflowArtifacts.push(
                    {
                        "workflow_name": workflow['name'],
                        "workflow_run_url": workflow['run_url'],
                        "run_id": runId,
                        "check_suite_id": checkSuiteId,
                        "artifacts": artifacts
                    }
                )
            }
        }
        return workflowArtifacts  
    }
}