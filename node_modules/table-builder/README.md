table-builder [![Build Status](https://travis-ci.org/a-x-/table-builder.svg?branch=master)](https://travis-ci.org/a-x-/table-builder)
============

Create HTML tables from a JSON in a both Node.js (0.10+) and browsers enviroments.

#### Installation

```sh
yarn add --production table-builder
```

or

```sh
npm i --production table-builder
```

`--production` flag skips devDependencies of the table-builder (testing framework).

#### Usage

##### node.js and webpack
```js
import TableBuilder from 'table-builder'
```

##### browser (without build tool)
1. Copy built UMD module:
   `cp node_modules/table-builder/tablebuilder.js dist/tablebuilder.js`

2. Insert tag:
   `<script src="/dist/tablebuilder.js"></script>`

#### Simple Example

Each object represents one row in the data array.
```json
[
  { "name":"Larry Wall", "age":57, "link": "<a href='http://www.wall.org/~larry/'>www.wall.org/~larry/</a>" },
  { "name":"Bill Gates", "age":56, "link": "<a href='http://www.microsoft.com'>www.microsoft.com</a>" },
  { "name":"Daffy Duck", "age":75, "link": "" }
]
```

```javascript
var data = [/* see data section above */];

// You can put key-value pairs if you strongly want keep headers order:
// [['name', 'User name'], ['age', 'User age'], ['link', 'Homepage']]
var headers = { "name" : "User name", "age": "User age", "link": "Homepage" };

var Table = require('table-builder');
console.log(
  (new Table({'class': 'some-table'}))
    .setHeaders(headers) // see above json headers section
    .setData(data) // see above json data section
    .render()
);
```

Rendered to:
```html
<table class='some-table'>
  <thead> <tr> <th>User name</th> <th>User age</th> <th>Homepage</th> </tr> </thead>
  <tbody>
    <tr>
      <td class="name-td">Larry Wall</td>
      <td class="age-td">57</td>
      <td class="link-td"><a href="http://www.wall.org/~larry/">www.wall.org/~larry/</a></td>
    </tr>
    <tr>
      <td class="name-td">Bill Gates</td>
      <td class="age-td">56</td>
      <td class="link-td"><a href="http://www.microsoft.com">www.microsoft.com</a></td>
    </tr>
    <tr>
      <td class="name-td">Daffy Duck</td>
      <td class="age-td">75</td>
      <td class="link-td"></td>
    </tr>
  </tbody>
</table>
```

#### Example of simple scrapper with tablebuilder result representation

```js
const process = require('process')
const TableBuilder = require('table-builder')
    const table = new TableBuilder({class: 'avito'})
    const headers = {price: 'Price', title: 'Title'}
const thrw = require('throw')
const fetch = require('isomorphic-fetch')
    const getHttp = (uri) => fetch(uri).then(r => r.status >= 400 ? thrw (r.status) : r.text())
const parseHtml = html => require('jsdom').jsdom(html)

const uri = process.argv[2] || 'https://www.avito.ru/moskva/telefony/iphone?q=iphone+se'

const retreiveData = (document) => Array.from(document.querySelectorAll('.js-catalog_after-ads .item')).map(i=>({title:i.querySelector('.title'), price:i.querySelector('.about')})).map(({title,price})=>({title:title.textContent.trim(),price:price.textContent.trim()}))

const main = () =>
    getHttp(uri)
    .then(html => parseHtml(html))
    .then(document => retreiveData(document))
    .then(data => table.setHeaders(headers).setData(data).render())

const style = `<style>body { text-align: center; } .avito {width: 100%;} thead { text-align: left; } .price-td { text-align: right; }</style>`
main().then(r=>console.log(style, r))
```

![example result](https://cloud.githubusercontent.com/assets/6201068/20455981/216d347c-ae7a-11e6-83bf-572d410ef6e8.png)


## API

#### Prisms
Prism are callbacks-preprocessors for specified fields.

```javascript
var data = [ // Look the previous case differences: link format changed and name splitted into firstname and surname
  { "firstname":"Larry", "surname":"Wall", "age":57, "link": "www.wall.org/~larry/" },
  { "firstname":"Bill", "surname":"Gates", "age":56, "link": "www.microsoft.com" },
  { "firstname":"Daffy", "surname":"Duck", "age":75, "link": "" }
];

(new Table({'class': 'some-table'}))
  .setPrism('link', function (cellData) {
    return cellData && '<a href="http://'+cellData+'">'+cellData+'</a>' || 'N/A';
  })
  .setPrism('name', function (cellData, row) {
    return row.surname + ' ' + row.firstname;
  })
  .setHeaders({ "name": "User name", "age": "User age", "link": "Homepage" })
  .setData(data)
  .render()
```

Render output is equal the previous case.

Also, prism callback may return `{presentation: '...', raw: '...'}` object
for splitting html wrapped cell values and raw values.
For example, raw values uses in [totals](#totals).

#### Totals
See following code:

```js
table.setTotal('age', function (columnCellsCollection, rowsCollection) {
  // Calc average age
  return Math.round(
    columnCellsCollection
      .reduce(function (prev, val) { return +prev + val; })
      / columnCellsCollection.length
  );
});
```

It adds `tfoot` in the table with average age:
```html
<tfoot><tr><td></td><td></td><td>62</td></tr></tfoot>
```

#### Grouping

Grouping fields util (`setGroup`).

```js
// ...
table
  .setGroup('product_category', function (value, recordsCount, totals) {
    // ...
  })
  // ...
  .render();
```

Group removes the field (`product_category`) from the table 
and adds row-separators with the field's values (group names). and referenced items.

Body of the setGroup callback may contains processor of group name. 
Additionaly processor may use the group's `recordsCount` and `totals` collection for group
if `setTotal` for whole table have installed.

If callback is not defined then tableBuilder uses group name without processing, as is.

## Empty data collection

```js
// Show table replacer block if data set is empty
// ...
table
  // ...
  .render()
  || 'Data collection is empty!';
```

## Client side sorting, filtering

You can use [list.js](https://github.com/javve/list.js) with table builder.

## TODO

* [x] Unit tests, CI
* [x] Decompose methods
* [ ] More unit tests
* [ ] Run building and another activity only in the render() method, push intermediate methods into preordered list
* [ ] Framefork agnostic: possibility to use with React and another frameworks
  * `tagBuilder` as a dependency injection (for compatibility with either: `innerHTML`, `createElement`, `React.Component`)
* [ ] Internal type constructors with asserts
* [ ] Data model, changing/accessing data api
* [ ] Client-side filters, multisort  s
* [ ] Plural versions of methods: `setPrisms`, `setTotals`
* [ ] Plugins system (call hooks for different cells)
* [ ] N/A maps
* [ ] Escaping

## See also another solutions

**React based**:
* [react-data-grid](https://github.com/adazzle/react-data-grid) - I did not use it stil
* [react-table](https://github.com/tannerlinsley/react-table) - I revealed problems with custom styles and stbility
* _suggestions are welcome_

**Framework agnostic**:
* _suggestions are welcome_
