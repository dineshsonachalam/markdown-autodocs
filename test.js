import {Command} from 'commander/esm.mjs';
const program = new Command();
program
  .option('-o, --outputFilePath <outputFilePaths...>', 'Output file paths')
  .option('-c, --category <categories...>', 'Categories')
program.parse(process.argv)
const options = program.opts()
console.log("outputFilePaths: ", options.outputFilePath)
console.log("categories: ", options.category)

// // dineshsonachalam@macbook markdown-autodocs % node test.js -c a b -o x y
// // outputFilePaths:  [ 'x', 'y' ]
// // categories:  [ 'a', 'b' ]
