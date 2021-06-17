import {app} from './app.js'

let inputFilePath = './readme.md'
let repo = process.env.repo;
let branchInfo = process.env.branch.split("/")
let branch  = branchInfo[branchInfo.length - 1]
let githubApiToken = process.env.githubApiToken

await app(inputFilePath, repo, branch, githubApiToken)