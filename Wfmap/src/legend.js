import * as d3 from 'd3';

const defaultparam = {
  offsetX : 10,
  offsetY : 10,
  marginY : 5,
  width : 250,
  fontFamily: "sans-serif"
}

exports.create = function(canvas, json){
  const param = Object.assign(
    {
      note : json['note'] || [],
      colorscale : json['colorscale'] || {},
      mark : json["mark"] || {}
    },
    defaultparam
  );

  let y_length;
  let base;

  switch (json['mode']) {
    case "mark":
      y_length = Object.keys(param.mark).length + param.note.length;
      base = createBase(canvas, param, y_length);
      createRect(base, param, y_length);
      createNote(base, param);
      createMark(base, param);
      break;
    case "colorscale":
      y_length = 2 + param.note.length;
      base = createBase(canvas, param, y_length);
      createRect(base, param, y_length);
      createNote(base, param);
      createColorScale(base, param);
      break;
    default:
      break;
  }
}


function createBase(cnv, param, h){
  return cnv.append("svg")
    .attr('version', '1.1')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr("width", param.width)
    .attr("height", h * 15 + param.offsetY * 2 - param.marginY);
}

function createRect(cnv, param, h){
  cnv.append("rect")
    .attr("x", 0)
    .attr("y",0)
    .attr("width", param.width)
    .attr("height", h * 15 + param.offsetY * 2 - param.marginY)
    .attr("stroke-width",1)
    .attr("stroke","black")
    .attr("fill", "none");
}

function createNote(cnv, param){
  param.note.forEach((n, i) =>{
    let child = cnv.append("g");
    let y = i * (10 + param.marginY) + param.offsetY;
    child.append("text")
      .attr("x", param.offsetX)
      .attr("y", y + 10/2)
      .attr("text-anchor", "left")
      .attr("dominant-baseline", "middle")
      .attr("font-family",param.fontFamily)
      .attr("font-size",12)
      .text(n);
  });
}

function createMark(cnv, param){
  Object.keys(param.mark).forEach((n, i) =>{
    let hoge = cnv.append("g");
    let y = (param.note.length + i)  * (10 + param.marginY) + param.offsetY;
    hoge.append("rect")
    .attr("x", param.offsetX)
    .attr("y", y)
    .attr("width", 10)
    .attr("height", 10)
    .attr("stroke-width",1)
    .attr("stroke","black")
    .attr("fill", param.mark[n]["background"] || "white" );
    hoge.append("text")
        .attr("x", param.offsetX + 10 / 2)
        .attr("y", y  + 10/2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-family",param.fontFamily)
        .attr("font-size",10)
        .text(param.mark[n]["mark"] || "");
    hoge.append("text")
        .attr("x", param.offsetX + 10 + 10)
        .attr("y", y  + 10/2)
        .attr("text-anchor", "left")
        .attr("dominant-baseline", "middle")
        .attr("font-family",param.fontFamily)
        .attr("font-size",12)
        .text(param.mark[n]["text"] || "");
  });
}

function createColorScale(cnv, param){
  let cell_width = 10
  let count = (param.width - 50 - param.offsetX*2) / 10;
  let domain = param.colorscale["domain"]
  let data_set =  d3.range(
    domain[0],
    domain[domain.length - 1] ,
    (domain[domain.length - 1] - domain[0]) / count
  );

  let data_set2 =[domain[0], domain[domain.length - 1]]
  let y = param.note.length  * (10 + param.marginY) + param.offsetY;
  let colorScaler = d3.scaleLinear()
    .domain(param["colorscale"]["domain"])    //　入力データ範囲：-1～1
    .range(param["colorscale"]["range"]) //　出力色範囲： 赤―黄色―緑
  let hoge = cnv.append("g");
  hoge.selectAll( "rect" )
    .data(data_set)
    .enter()
    .append("rect")
    .attr("x", (d,i)=> param.offsetX + i*cell_width)
    .attr("y", y)
    .attr("width", cell_width)
    .attr("height", 10)
    .style("fill", (d,i) => colorScaler(d))
  hoge.selectAll( "text" )
    .data(data_set2)
    .enter()
    .append("text")
      .attr("x", (d,i)=> param.offsetX + i*cell_width*count )
      .attr("y", (param.note.length + 1 + 0.5)  * (10 + param.marginY) + param.offsetY)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "middle")
      .attr("font-family",param.fontFamily)
      .attr("font-size",12)
      .text((n)=>n.toExponential(2));
}


exports.covert = function(legend, chips){
  switch(legend["mode"]){
    case "mark":
      convertMark(legend, chips)
      break;
    case "colorscale":
      convertColorScale(legend, chips)
      break;
    case "":
      break;
    default:
      break;
  }
}


function convertMark(legend, chips){
  chips.forEach((v, i)=>{
    if(chips[i]["mark"] == null)
      chips[i]["mark"] = checkObject( legend,
        ["mark", chips[i]["value"], "mark"]
      ) || "";
    if(chips[i]["background"] == null)
      chips[i]["background"] = checkObject( legend,
        ["mark", chips[i]["value"], "background"]
      ) || "lightgray";
  });
}

function convertColorScale(legend, chips){
  let colorScaler = d3.scaleLinear()
    .domain(legend["colorscale"]["domain"])    //　入力データ範囲：-1～1
    .range(legend["colorscale"]["range"]) //　出力色範囲： 赤―黄色―緑

  chips.forEach((v, i)=>{
    if(chips[i]["mark"] == null)
      chips[i]["mark"] = chips[i]["value"];
    if(chips[i]["background"] == null)
      chips[i]["background"] = colorScaler(parseFloat(chips[i]["value"]))
  });
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
