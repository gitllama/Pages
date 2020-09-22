/*

 wfmap


*/

import * as d3 from 'd3';
import * as legend from './legend.js';
import * as map from './map.js';

let config = {};
let legendConfig = {};

exports.render = function(code, elem) {

  let canvas = d3.select(elem);
  //canvas.selectAll("svg > *").remove();
  canvas.selectAll().remove();

  let json = typeof (code) == "string" ? JSON.parse(code) : code;

  selector(json, canvas);

  return elem;
}

exports.parseCoord = parseChipCoord;

function selector(code, base){
  if(code["config"]) config = code["config"];
  if(code["legend"]) legendConfig = code["legend"];
  switch(code["data"]){
    case "legend":
      legend.create(base, code["legend"]);
      break;
    default:
      if(typeof(checkObject(code,["data","chip",0])) == "string"){
        code["data"]["chip"] = parseChipCoord(code["data"]["chip"]);
      }
      if(!(code["data"]["chip"])) code["data"]["chip"] = [];
      legend.covert(legendConfig, code["data"]["chip"]);
      map.create(base, config, legendConfig, code["data"]);
      break;
  }
}

function checkObject(obj, arr){
  let dst = null;
  if(arr.length > 1){
    if(obj[arr[0]]){
      let hoge = arr.slice()
      hoge.shift()
      return checkObject(obj[arr[0]],hoge)
    }else{
      return null;
    }
  }
  return obj[arr[0]];
}

function parseChipCoord(chip){
  let dst = []
  chip.forEach((line, y)=>{
    line.split('').forEach((val, x)=>{
      if(val != "."){
        dst.push({"x":x, "y":y, "value":val});
      }
    })
  })
  return dst
}
