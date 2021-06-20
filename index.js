#!/usr/bin/env node
/**
 *  Entry point for markdown-autodocs CLI app
 *  Author: Dinesh Sonachalam
 */
import pkg from 'log4js';
import {app} from './utils/app.js'
import {Command} from 'commander/esm.mjs';
const program = new Command();
program
  .option('-i, --inputFilePath <type>', 'Input file path')
  .option('-o, --category <type>', 'code-block, json-to-html-table, workflow-artifacts-table')
  .option('-r, --repo <type>', 'Repo name')
  .option('-b, --branch <type>', 'Branch name')
  .option('-a, --accessToken <type>', 'Github Access token')
  
program.parse(process.argv)
const options = program.opts()
const { getLogger } = pkg;
const logger = getLogger();
logger.level = "info";

if((options.category == "code-block" || options.category == "json-to-html-table") && options.inputFilePath){
  let category = options.category
  let inputFilePath = options.inputFilePath 
  const message = await app(category, inputFilePath)
  logger.info(message) 
}else if(options.category == "workflow-artifacts-table" && options.inputFilePath && options.repo && options.branch && options.accessToken){
  let category = options.category
  let repo = options.repo
  let branchInfo  = options.branch
  let branch = ""
  if(branchInfo.includes("refs/heads")){
    branchInfo = branchInfo.split("/")
    branch = branchInfo[branchInfo.length - 1]
  }else{
    branch = options.branch
  }
  let accessToken = options.accessToken
  let inputFilePath = options.inputFilePath  
  const message = await app(category, inputFilePath, repo, branch, accessToken)
  logger.info(message)
} else {
    logger.info("Missed arguments. Please make sure if you missed any arguments.")
    if(options.category == "code-block"){
      logger.info("This CLI requires inputFilePath argument for code-block category")
    }else if(options.category == "json-to-html-table"){
      logger.info("This CLI requires inputFilePath argument for json-to-html-table category")
    }else if(options.category == "workflow-artifacts-table"){
      logger.info("This CLI requires repo, branch, accessToken, inputFilePath arguments for workflow-artifacts-table category")
    }
}
