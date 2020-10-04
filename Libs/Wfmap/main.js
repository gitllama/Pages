
const i = require('./dist/main.js')
const { JSDOM } = require('jsdom')

const code = {
  "config" : {
    "wfsize" : 200,
    "offsetX" : 12.2,
    "offsetY" : 4.0,
    "chipSizeX" : 24.8,
    "chipSizeY" : 17.2,
    "countX" : 9,
    "countY" : 12,
    "edge" : 5,
    "notch" : 9,
    "notchside" : 0
  },
  "legend" : {
    "mode" : "colorscale",
    "colorscale" : {
      "domain": [5,60],
      "range":["green","red"]
    }
  },
  "data": {
    "title" : "Wf02",
    "caution" : "DRAFT",
    "chip" : [
      {"y" : 1, "x": 3, "value": 22},
      {"y" : 1, "x": 4, "value": 23},
      {"y" : 1, "x": 5, "value": 42, "background" : "black"},
      {"y" : 2, "x": 2, "value": 43},
      {"y" : 2, "x": 3, "value": 41},
      {"y" : 2, "x": 4, "value": 24},
      {"y" : 2, "x": 5, "value": 21},
      {"y" : 2, "x": 6, "value": 5},
      {"y" : 3, "x": 2, "value": 6},
      {"y" : 3, "x": 3, "value": 20},
      {"y" : 3, "x": 4, "value": 25},
      {"y" : 3, "x": 5, "value": 40},
      {"y" : 3, "x": 6, "value": 44},
      {"y" : 4, "x": 7, "value": 54},
      {"y" : 4, "x": 6, "value": 45},
      {"y" : 4, "x": 5, "value": 39}
    ]
  }
}


const document = new JSDOM().window.document
console.log(i.render(code, document.body));
console.log(i.render(code, document.body).innerHTML);
