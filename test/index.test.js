const { exec } = require('child_process');
describe('Validate autodoc-workflow-artifacts CLI', () => {
  it('Gave all the required arguments to the CLI as an input, it should now return a success message', (done) => {
    jest.setTimeout(25000);
    exec(
      'node index.js --repo $TEST_REPO --branch $TEST_BRANCH --accessToken $TEST_ACCESSTOKEN --inputFilePath ./readme.md',
      (error, stdout, stderr) => {
        expect(stdout).toMatch(/([INFO] default - Added|artifacts)/i)
        done();
      }
    );
  });

  it('Missed required arguments to the CLI as an input, it should now return a failure message', (done) => {
    jest.setTimeout(25000);
    exec(
      'node index.js --repo $repo --branch $branch --accessToken $accessToken',
      (error, stdout, stderr) => {
        expect(stdout).toMatch(/(Missed arguments. Please make sure if you missed any arguments.)/i)
        done();
      }
    );
  });
});