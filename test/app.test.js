import {app} from '../utils/app.js'

describe('should test GithubApi functionality', () => {
    const repo = process.env.TEST_REPO
    const branch = process.env.TEST_BRANCH
    const githubApiToken = process.env.TEST_ACCESSTOKEN
    
    test('should test code-block', async () => {
        expect(await app("./README.md", "code-block", repo, branch, githubApiToken))
        .toMatch("Auto documented code-block in ./README.md") 
    });
    test('should test json-to-html-table', async () => {
        expect(await app("./README.md", "json-to-html-table", repo, branch, githubApiToken))
        .toMatch("Converted JSON to HTML table. Then auto-documented HTML table in ./README.md") 
    });
    test('should test workflow-artifact-table', async () => {
        expect(await app("./README.md", "workflow-artifact-table", repo, branch, githubApiToken))
        .toMatch("artifacts in artifactsTable - ./README.md") 
    });
});