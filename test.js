import {js_beautify} from 'js-beautify';

const originalCode = `
    const foo = 'bar';



    console.log(foo);`


const beautifiedCode = js_beautify(originalCode, { preserve_newlines: false});
