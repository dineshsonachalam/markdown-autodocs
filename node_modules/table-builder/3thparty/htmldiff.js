module.exports = (() => {
    var diff = (new (require('html-differ').HtmlDiffer)).diffHtml;
    var print = require('html-differ/lib/logger').getDiffText;

    return function(h1, h2) {
        return print(diff(h1, h2));
    };
})();
