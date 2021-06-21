const { exec } = require('child_process');
describe('Validate markdown-autodocs-test CLI', () => {
  
  beforeEach(() => {
    jest.setTimeout(25000);
  });
  
  it('Autodoc code block. Gave all the required arguments to the CLI as an input, it should now return a success message', (done) => {
    exec(
      'node index.js -o ./README.md -c code-block',
      (error, stdout, stderr) => {
        expect(stdout).toMatch(/(Autodocumented code-block)/i)
        done();
      }
    );
  });

  it('Autodoc json-to-html-table. Gave all the required arguments to the CLI as an input, it should now return a success message', (done) => {
    exec(
      'node index.js -o ./README.md -c json-to-html-table',
      (error, stdout, stderr) => {
        expect(stdout).toMatch(/(Converted JSON to HTML table.)/i)
        done();
      }
    );
  });

  it('Autodoc workflow artifact table. Gave all the required arguments to the CLI as an input, it should now return a success message', (done) => {
    exec(
      'node index.js -c workflow-artifact-table -o ./README.md -r $TEST_REPO -b $TEST_BRANCH -a $TEST_ACCESSTOKEN',
      (error, stdout, stderr) => {
        expect(stdout).toMatch(/([INFO] default - Added|artifacts)/i)
        done();
      }
    );
  });

  it('Missed required arguments to the CLI as an input, it should now return a failure message', (done) => {
    exec(
      'node index.js --repo $TEST_REPO --branch $TEST_BRANCH',
      (error, stdout, stderr) => {
        expect(stdout).toMatch(/(Missed arguments. Please make sure if you missed any arguments.)/i)
        done();
      }
    );
  });

});
