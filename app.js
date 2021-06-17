import path from 'path'
import markdownMagic from 'markdown-magic'
import {markdownTable} from 'markdown-table'
import githubApi from './githubApi.js'

export const app = async function(repo, branch, githubApiToken) {
    const github = new githubApi(repo, branch, githubApiToken)
    const workflowNames = await github.getWorkflowNames()
    const workflowIds   = await github.getWorkflowIds(workflowNames)
    const workflowArtifacts = await github.getWorkflowArtifacts(workflowIds)
    console.log("workflowArtifacts: ", workflowArtifacts)
}








