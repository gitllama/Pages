# wfmap.js ver.0.0.1

## install

```
$ npm install gitllama/wfmap
$ npm install gitllama/wfmap#master
```

## Usage

```javascript
let elem = node || document.createElement("svg");
wfmap.render(code, node);
console.log(node.outerHTML)
```

```javascript
const { JSDOM } = require('jsdom')

function render(node){
  let elem = node || (new JSDOM().window.document).body;
  return wfmap.render(code, node).innerHTML
}
```

## Structure
