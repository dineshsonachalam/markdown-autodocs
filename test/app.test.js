import {app} from "../utils/app.js";
import * as child from 'child_process';
function output(error, stdout, stderr){
    /* eslint no-console: "error" */
    console.log("message: ", stdout)
    return {};
}

describe("should test App functionality", () => {
    const repo = process.env.TEST_REPO;
    const branch = process.env.TEST_BRANCH;
    const githubApiToken = process.env.TEST_ACCESSTOKEN;
    child.exec(
        "wget -c -N  https://gist.githubusercontent.com/dineshsonachalam/17965bed1d67ea51ee9c80473f70f078/raw/86fa6b562af89c39113e1cde66ab15c6cf0c7ac8/TEST_README.md",
        (error, stdout, stderr) => output(error, stdout, stderr)
    );
    child.exec(
        "wget -c -N  https://gist.githubusercontent.com/dineshsonachalam/cb143249e4daeb847992577da2f8e2db/raw/d53d1c8d16a58d039f64e2b21218ba3e2464d063/sponsors.json",
        (error, stdout, stderr) => output(error, stdout, stderr)
    );
    child.exec(
        "wget -c -N  https://gist.githubusercontent.com/dineshsonachalam/db8cec9c076d2a423b28a09d105cd8c6/raw/52865d53575287adbdf203c03acd705c69938a6a/contributors.json",
        (error, stdout, stderr) => output(error, stdout, stderr)
    );
    
    test("should test code-block", async () => {
        expect(await app("./TEST_README.md", "code-block", repo, branch, githubApiToken))
        .toMatch("Auto documented code-block in ./TEST_README.md");
    });
    
    test("should test json-to-html-table", async () => {
        expect(await app("./TEST_README.md", "json-to-html-table", repo, branch, githubApiToken))
        .toMatch("Converted JSON to HTML table. Then auto-documented HTML table in ./TEST_README.md");
    });

    test("should test workflow-artifact-table", async () => {
        expect(await app("./TEST_README.md", "workflow-artifact-table", repo, branch, githubApiToken))
        .toMatch("artifacts in artifactsTable - ./TEST_README.md"); 
    });
});
