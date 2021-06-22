#!/usr/bin/env node
/**
 *  Entry point for markdown-autodocs-test CLI app
 *  Author: Dinesh Sonachalam
 */

import {app} from './utils/app.js'
import pkg from 'log4js';
const { getLogger } = pkg;
import {Command} from 'commander/esm.mjs';

export const gitCliargs = function() {
  const program = new Command();
  program
    .option('-o, --outputFilePath <outputFilePaths...>', 'Output file paths')
    .option('-c, --category <categories...>', 'code-block, json-to-html-table, workflow-artifact-table')
    .option('-r, --repo <type>', 'Repo name')
    .option('-b, --branch <type>', 'Branch name')
    .option('-a, --accessToken <type>', 'Github Access token')  
  program.parse(process.argv)
  const options = program.opts()
  return options
}

export const main = function() {
  const logger = getLogger();
  logger.level = "info";
  const options = gitCliargs()
  console.log(options)
}

main()



// if((options.categories == "code-block" || options.categories == "json-to-html-table") && options.outputFilePaths){
//   let categories = options.categories
//   let outputFilePaths = options.outputFilePaths 
//   const message = await app(categories, outputFilePaths)
//   logger.info(message) 
// }else if(options.categories == "workflow-artifact-table" && options.outputFilePaths && options.repo && options.branch && options.accessToken){
//   let categories = options.categories
//   let repo = options.repo
//   let branchInfo  = options.branch
//   let branch = ""
//   if(branchInfo.includes("refs/heads")){
//     branchInfo = branchInfo.split("/")
//     branch = branchInfo[branchInfo.length - 1]
//   }else{
//     branch = options.branch
//   }
//   let accessToken = options.accessToken
//   let outputFilePaths = options.outputFilePaths  
//   console.log("categories: ", categories)
//   console.log("outputFilePaths: ", outputFilePaths)
//   console.log("repo: ",repo)
//   console.log("branch: ",branch)
//   console.log("accessToken: ",accessToken)
//   const message = await app(categories, outputFilePaths, repo, branch, accessToken)
//   logger.info(message)
// } else {
//     logger.info("Missed arguments. Please make sure if you missed any arguments.")
//     if(options.categories == "code-block"){
//       logger.info("This CLI requires outputFilePaths argument for code-block categories")
//     }else if(options.categories == "json-to-html-table"){
//       logger.info("This CLI requires outputFilePaths argument for json-to-html-table categories")
//     }else if(options.categories == "workflow-artifact-table"){
//       logger.info("This CLI requires repo, branch, accessToken, outputFilePaths arguments for workflow-artifact-table categories")
//     }
// }