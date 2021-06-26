// import { promisify } from 'util'
// import * as child from 'child_process';
// const exec = promisify(child.exec)
// // const ls = await exec('ls -s')
// // console.log(ls.stdout)

import * as core from '@actions/core';
const github = require('@actions/github');

try {
  const repo = core.getInput('repo');
  console.log("===>REPO: ", repo)
} catch (error) {
  core.setFailed(error.message);
}