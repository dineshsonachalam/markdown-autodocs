var mapObj = require('./mapobj');

module.exports = function buildTag(tag, attributes, content) {
    return buildOpenTag(attributes, tag) + content + buildCloseTag(tag);
};

function buildOpenTag(attributes, tag) {
    var attrs = mapObj(attributes, function (val, key) {
        return key + '="' + htmlEncode(val) + '"';
    }).join(' ');

    return '<' + tag + ' ' + attrs + '>';
}

function buildCloseTag(tag) {
    return '</' + tag + '>';
}

// WTF?
function htmlEncode(value) {
    return (value || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
