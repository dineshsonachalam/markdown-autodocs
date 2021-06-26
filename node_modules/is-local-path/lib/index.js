var url = require('url');
var dataUri = function (value) {
	return (
		typeof value === 'string'
		&& /^data:.*,.*/.test(value)
	);
};
var localPath = function (value) {
	return (
		typeof value === 'string'
		&& !url.parse(value).hostname
		&& !dataUri(value)
	);
};
module.exports = localPath;