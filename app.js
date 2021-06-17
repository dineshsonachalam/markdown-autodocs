import path from 'path'
import markdownMagic from 'markdown-magic'
import {markdownTable} from 'markdown-table'
import githubApi from './githubApi.js'






let repo = process.env.repo;
let branchInfo = process.env.branch.split("/")
let branch  = branchInfo[branchInfo.length - 1]
let githubApiToken = process.env.githubApiToken
const github = new githubApi(repo, branch, githubApiToken)
const workflowNames = await github.getWorkflowNames()
const workflowIds   = await github.getWorkflowIds(workflowNames)
const workflowArtifacts = await github.getWorkflowArtifacts(workflowIds)

