import it from 'ava';
import Table from '.';
import htmlDiff from './3thparty/htmldiff';
const read = file => require('fs').readFileSync(file, 'utf8')

const simple = {
    data: [
        { "name": "Larry Wall", "age":57, "link": "<a href='http://www.wall.org/~larry/'>www.wall.org/~larry/</a>" },
        { "name": "Bill Gates", "age":56, "link": "<a href='http://www.microsoft.com'>www.microsoft.com</a>" },
        { "name": "Daffy Duck", "age":75, "link": "" }
    ],
    headersObj: { "name" : "User name", "age": "User age", "link": "Homepage" },
    headersPairs: [['name', 'User name'], ['age', 'User age'], ['link', 'Homepage']],
    refHtml: read('./test-assets/simple.html')
};

it('should build simple table with footers', t => {
    const html = (new Table({'class': 'some-table'}))
        .setHeaders(simple.headersObj)
        .setData(simple.data)
        .setTotal('age', function (columnCellsCollection, rowsCollection) {
          // Calc average age
          return Math.round(columnCellsCollection.reduce(function (prev, val) { return +prev + val; }) / columnCellsCollection.length);
        })
        .render();
    const diff = htmlDiff(simple.refHtml, html);
    diff ? t.fail('There is html diff') : t.pass('Html is ok');
    diff && console.log(diff);
});


it('should build simple table without footers', t => {
  simple.refHtml = read('./test-assets/simple-no-footer.html')
  const html = (new Table({'class': 'some-table'}))
      .setHeaders(simple.headersObj)
      .setData(simple.data)
      .render();
  const diff = htmlDiff(simple.refHtml, html);
  diff ? t.fail('There is html diff') : t.pass('Html is ok');
  diff && console.log(diff);
});
