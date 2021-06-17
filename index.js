import {app} from './app.js'

let repo = process.env.repo;
let branchInfo = process.env.branch.split("/")
let branch  = branchInfo[branchInfo.length - 1]
let githubApiToken = process.env.githubApiToken

await app(repo, branch, githubApiToken)