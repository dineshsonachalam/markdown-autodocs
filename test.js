
export const hello = async function(url, headers) {
    return "hello"
}
let a = await hello()
console.log(a)

// dineshsonachalam@macbook Autodoc-workflow-artifacts % node test.js
// hello