import {app} from './app.js'
import {Command} from 'commander/esm.mjs';
const program = new Command();
program
  .option('-r, --repo <type>', 'Repo name')
  .option('-b, --branch <type>', 'Branch name')
  .option('-a, --accessToken <type>', 'Github Access token')
  .option('-i, --inputFilePath <type>', 'Input file path')

program.parse(process.argv)
const options = program.opts()
if(options.repo && options.branch && options.accessToken && options.inputFilePath){
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
  const message = await app(inputFilePath, repo, branch, accessToken)
  console.log(message)
}else{
  console.log("Missed arguments. Please make sure if you missed any arguments.")
  console.log("This CLI requires repo, branch, accessToken, inputFilePath arguments")
}

// node index.js --repo $repo --branch $branch --accessToken $accessToken --inputFilePath ./readme.md



