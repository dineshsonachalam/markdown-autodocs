import {app, convertJsonToHtmlTable, generateArtifactsTable} from "../utils/app.js";
import GithubApi from "../utils/GithubApi"
const repo = process.env.TEST_REPO;
const branch = process.env.TEST_BRANCH;
const githubApiToken = process.env.TEST_ACCESSTOKEN;
const github = new GithubApi(repo, branch, githubApiToken);

describe("should test App functionality", () => {    
    test("should test code-block", async () => {
        expect(await app("./TEST_README.md", "code-block", repo, branch, githubApiToken))
        .toMatch("Auto documented code-block in ./TEST_README.md");
    });

    test("should test convertJsonToHtmlTable", () => {
        const htmlTable = `<table class="JSON-TO-HTML-TABLE"><thead><tr><th class="username-th">username</th></tr></thead><tbody ><tr ><td class="username-td td_text">dineshsonachalam</td></tr></tbody></table>`;
        expect(convertJsonToHtmlTable("", {"src": "./contributors.json"}, "")).toMatch(htmlTable);
    });

    test("should test generateArtifactsTable", () => {
        let workflowArtifacts = {
            "workflows": [{
                "name": "tests",
                "run_url": "https://github.com/dineshsonachalam/markdown-autodocs/actions/runs/1039932338",
                "run_id": "1039932338",
                "check_suite_id": "3262597270",
                "artifacts": [{
                    "name": "module-dependencies-license-report",
                    "url": "https://github.com/dineshsonachalam/markdown-autodocs/suites/3262597270/artifacts/75928184"
                }, {
                    "name": "size-of-dependencies",
                    "url": "https://github.com/dineshsonachalam/markdown-autodocs/suites/3262597270/artifacts/75928185"
                }, {
                    "name": "vulnerabilities-audit-report",
                    "url": "https://github.com/dineshsonachalam/markdown-autodocs/suites/3262597270/artifacts/75928186"
                }]
            }]
        };
        const workflowArtifactsTable = `<table class="ARTIFACTS-TABLE"><thead><tr><th class="artifact-th">Artifact</th><th class="workflow-th">Workflow</th></tr></thead><tbody ><tr ><td class="artifact-td td_text"><a href=https://github.com/dineshsonachalam/markdown-autodocs/suites/3262597270/artifacts/75928184>module-dependencies-license-report</a></td><td class="workflow-td td_text"><a href=https://github.com/dineshsonachalam/markdown-autodocs/actions/runs/1039932338>tests</a></td></tr>`;
        expect(generateArtifactsTable("", "", workflowArtifacts)).toMatch(workflowArtifactsTable);
    });
    
    test("should test json-to-html-table", async () => {
        expect(await app("./TEST_README.md", "json-to-html-table", repo, branch, githubApiToken))
        .toMatch("Converted JSON to HTML table. Then auto-documented HTML table in ./TEST_README.md");
    });

    test("should test workflow-artifact-table", async () => {
        expect(await app("./TEST_README.md", "workflow-artifact-table", repo, branch, githubApiToken))
        .toMatch("Auto documented workflow artifacts in artifactsTable - ./TEST_README.md"); 
    });

    test("should test Github Workflow API", async () => {
        const workflowNames = await github.getWorkflowNames();
        const workflowIds   = await github.getWorkflowIds(workflowNames);
        const workflowInfo = await github.getWorkflowArtifacts(workflowIds);
        const workflows = workflowInfo.workflowArtifacts;        
        expect(workflows.length>0)
        .toEqual(true)
    });
});
