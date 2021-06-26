var isLocalPath = require('../');
var expect = require('chai').expect;

describe('isLocalPath', function () {
	it('works', function () {
		expect(isLocalPath('/path/to/file.txt')).to.be.true;
		expect(isLocalPath('/path/to/directory')).to.be.true;
		expect(isLocalPath('./relative/path')).to.be.true;
		expect(isLocalPath('../relative/path')).to.be.true;
		expect(isLocalPath('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D')).to.be.false;
		expect(isLocalPath('http://host.com/path/to/file.txt')).to.be.false;
	});
});
