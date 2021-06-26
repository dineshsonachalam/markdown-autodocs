var Table = require('.');
var simple = {
    data: [
        { "name": "Larry Wall", "age":57, "link": "<a href='http://www.wall.org/~larry/'>www.wall.org/~larry/</a>" },
        { "name": "Bill Gates", "age":56, "link": "<a href='http://www.microsoft.com'>www.microsoft.com</a>" },
        { "name": "Daffy Duck", "age":75, "link": "" }
    ],
    headersObj: { "name" : "User name", "age": "User age", "link": "Homepage" },
    headersPairs: [['name', 'User name'], ['age', 'User age'], ['link', 'Homepage']],
};

var html = (new Table({'class': 'some-table'}))
    .setHeaders(simple.headersObj)
    .setData(simple.data)
    .render();

console.log(html);
