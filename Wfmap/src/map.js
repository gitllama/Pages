import * as d3 from 'd3';

const margin = {"top": 20, "left":20,"right":3,"bottom":20}

exports.create = function(canvas, config, legend, wf){

  let param = parse(config, legend, wf)
  let child = baseCreate(param, canvas);

  markerCreate(param, child);
  wfCreate(param,  child);
  axisCreate(param, child);

  if(param["chip"]){
    gridCreate(param, child);
    directionCreate(param, child);
    chipState(param, child);
  }

  if(param["caution"])
    cautionCreate(param, child, param["caution"])

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


function parse(config, legend, wf){
    let scale = config["scale"] || 1.0;
  return {
    countX : config["countX"],
    countY : config["countY"],
    chipSizeX : config["chipSizeX"] * scale,
    chipSizeY : config["chipSizeY"] * scale,
    width : config["chipSizeX"] * scale * config["countX"] + margin.left + margin.right,
    height : config["chipSizeY"] * scale * config["countY"] + margin.top + margin.bottom,
    offsetX : config["offsetX"] + margin.left,
    offsetY : config["offsetY"] + margin.top,
    edge : config["edge"] * scale,
    notch : config["notch"] * scale, //notch reserve dist
    notchside : config["notchside"],
    wfsize : config["wfsize"] * scale,

    legend : legend,

    title : wf["title"] || "",
    caution : wf["caution"],
    chip : wf["chip"],

    //callback : json["callback"],

    f_x : ((i)=> i*config["chipSizeX"]* scale + margin.left),
    f_y : ((i)=> i*config["chipSizeY"]* scale + margin.top)
  }
}

function baseCreate(param, canvas){
  return canvas
  .append("svg")
    .attr("version","1.1")
    .attr("xmlns","http://www.w3.org/2000/svg")
    .attr("class","wfmap")
    .attr("height", param.height)
    .attr("width", param.width);
}

function markerCreate(param, canvas){
  canvas
    .append('svg:marker')
    .attr("id","arrow")
    .attr('markerHeight', 5)
    .attr('markerWidth', 5)
    .attr('orient', "auto")
    .attr('refX', 0)
    .attr('refY', 0)
    .attr('viewBox', '-5 -5 10 10')
    .append('svg:path')
      .attr('d', 'M 0,0 m -5,-5 L 5,0 L -5,5 Z')
      .attr('fill', "black");
}

function axisCreate(param, canvas){
  let x_axis = canvas.append("g");
  let y_axis = canvas.append("g");
  let title_axis = canvas.append("g");

  title_axis.append("text")
    .attr("x", param.width / 2 + margin.left / 2)
    .attr("y", param.height -  margin.bottom / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("font-family","sans-serif")
    .attr("font-size",12)
    .text(param.title);
  x_axis.selectAll("text")
    .data([...Array(param.countX)])
    .enter()
    .append("text")
    .attr("x", (_, i) => param.f_x(i + 0.5))
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("font-family","sans-serif")
    .attr("font-size",12)
    .text((_, i) => i);
  y_axis.selectAll("text")
    .data([...Array(param.countY)])
    .enter()
    .append("text")
    .attr("x", margin.left / 2)
    .attr("y", (_, i) => param.f_y(i + 0.5))
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("font-family","sans-serif")
    .attr("font-size",12)
    .text((_, i) => i);

}

function gridCreate(param, canvas){
  let grid = canvas.append("g");
  let x = Array.from(new Array(param.countX+1),(v,i)=>{
    return {
      "x1" : param.f_x(i),
      "x2" : param.f_x(i),
      "y1" : margin.top,
      "y2" : param.f_y(param.countY)
    }
  });
  let y = Array.from(new Array(param.countY+1),(v,i)=>{
    return {
      "x1" : margin.left,
      "x2" : param.f_x(param.countX),
      "y1" : param.f_y(i),
      "y2" : param.f_y(i)
    }
  });
  grid.selectAll("line")
    .data(x.concat(y))
    .enter()
    .append("line")
    .attr("x1",(n) => n["x1"])
    .attr("x2",(n) => n["x2"])
    .attr("y1", (n) => n["y1"])
    .attr("y2", (n) => n["y2"])
    .attr("stroke-width",1)
    .attr("stroke","gray")
    .attr("stroke-dasharray", "1, 1");
}

function directionCreate(param, canvas){
  let direction = canvas.append("g");
  let size = 15

  direction.append("line")
    .attr("x1", margin.left)
    .attr("x2", margin.left + size)
    .attr("y1", margin.top)
    .attr("y2", margin.top)
    .attr("marker-end", "url(#arrow)")
    .attr("stroke-width",1)
    .attr("stroke","black");
  direction.append("line")
    .attr("x1", margin.left)
    .attr("x2", margin.left)
    .attr("y1", margin.top)
    .attr("y2", margin.top + size)
    .attr("marker-end", "url(#arrow)")
    .attr("stroke-width",1)
    .attr("stroke","black");
  direction.append("text")
    .attr("x", margin.left + size + 2)
    .attr("y", margin.top)
    .attr("dominant-baseline", "hanging")
    .attr("font-family","sans-serif")
    .attr("font-size",10)
    .text("x")
  direction.append("text")
    .attr("x", margin.left)
    .attr("y", margin.top + size + 2)
    .attr("dominant-baseline", "hanging")
    .attr("font-family","sans-serif")
    .attr("font-size",10)
    .text("y")
}

function wfCreate(param, canvas){
  const r = param.wfsize / 2
  const notch_w = 4
  const cx = r + param.offsetX;
  const cy = r + param.offsetY;
  const x_notch = (i) => Math.cos(i*Math.PI/180)
  const y_notch = (i) => Math.sin(i*Math.PI/180)
  let wf = canvas.append("g");

  wf.append("circle")
     .attr("cx",cx )
     .attr("cy",cy )
     .attr("r", r)
     .attr("fill","darkgray")
     .attr("stroke-width",2)
     .attr("stroke","black");
  wf.append("circle")
    .attr("cx",r + param.offsetX)
    .attr("cy",r + param.offsetY)
    .attr("r",r - param.edge)
    .attr("fill","none")
    .attr("stroke-width",1)
    .attr("stroke","black");
  wf.append('line')
    .attr("x1",cx + (r - param.notch) * x_notch(param.notchside))
    .attr("y1",cy + (r - param.notch) * y_notch(param.notchside))
    .attr("x2",cx + r * x_notch(param.notchside+notch_w))
    .attr("y2",cy + r * y_notch(param.notchside+notch_w))
    .attr("stroke-width",2)
    .attr("stroke","black");
  wf.append('line')
    .attr("x1",cx + (r - param.notch) * x_notch(param.notchside))
    .attr("y1",cy + (r - param.notch) * y_notch(param.notchside))
    .attr("x2",cx + r * x_notch(param.notchside-notch_w))
    .attr("y2",cy + r * y_notch(param.notchside-notch_w))
    .attr("stroke-width",2)
    .attr("stroke","black")
    .attr("fill","none");
}

function chipState(param, canvas){
  let chips = Object.keys(param.chip)
  let chipmap = canvas.append("g");

  chips.forEach((n)=>{
    let child = chipmap.append("g")
      .on("click",()=> param.callback(n))
    // .on("mouseover", ()=>d3.select( ".tooltip" ).attr("visibility", "visible").text(param.chip[n]["value"] || ""))
    // .on("mouseout", ()=>d3.select( ".tooltip" ).attr("visibility", "hidden"))
    //   .on("mouseover", function(){
    //     d3.select(this) // マウスに重なった要素を選択
    //       .attr("style", "fill:rgb(0,0,255)");
    // })
    // .on("mouseout", function(){
    //   d3.select(this) // マウスに重なっていた要素を選択
    //       .attr("style", "fill:rgb(255,0,0)");
    // })
    child.append("rect")
        .attr("x", param.f_x(param.chip[n]["x"]))
        .attr("y", param.f_y(param.chip[n]["y"]))
        .attr("width", param.chipSizeX)
        .attr("height", param.chipSizeY)
        .attr("stroke-width",1)
        .attr("stroke","black")
        .attr("fill", param.chip[n]["background"] || "lightgray")
        .append("title")
        .text(param.chip[n]["value"] || "");
    child.append("text")
      .attr("x", param.f_x(param.chip[n]["x"]+0.5))
      .attr("y", param.f_y(param.chip[n]["y"]+0.5))
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-family","sans-serif")
      .attr("font-size",12)
      .text(()=>{
        switch(param.legend["text"]){
          case "mark": return param.chip[n]["mark"] || "";
          case "value": return param.chip[n]["value"] || "";
          default: return "";
        }
      });
  })
}

function cautionCreate(param, canvas, txt){
  const r = param.wfsize / 2
  const notch_w = 4
  const cx = r + param.offsetX;
  const cy = r + param.offsetY;
  let caution = canvas.append("g");
  caution.append("text")
    .attr("x", cx)
    .attr("y", cy)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("font-family","sans-serif")
    .attr("fill","red")
    .attr("font-size",32)
    .text(txt)
    .attr("transform",`rotate(-10,${cx},${cy})`);
}


function _chipState(param, canvas){
  let chips = Object.keys(param.chip)
  let chipmap = canvas.append("g");

  let mode = checkObject(param.legend, ["mode"]);

  let colorScaler;
  if(mode == "colorscale"){
    colorScaler = d3.scaleLinear()
      .domain(param.legend["colorscale"]["domain"])    //　入力データ範囲：-1～1
      .range(param.legend["colorscale"]["range"]) //　出力色範囲： 赤―黄色―緑
  }

  const fillColor =(n)=>{
    if(param.chip[n]["background"]){
      return param.chip[n]["background"]
    }else{
      switch(mode){
        case "mark":
          return checkObject(
            param.legend,
            ["mark", param.chip[n]["value"], "background"]
          ) || "lightgray";
        case "colorscale":
          return colorScaler(parseFloat(param.chip[n]["value"]));
        default:
          return "lightgray"
      }
    }
  }
  const addMark =(d, n)=> {
    d.append("text")
      .attr("x", param.f_x(param.chip[n]["x"]+0.5))
      .attr("y", param.f_y(param.chip[n]["y"]+0.5))
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-family","sans-serif")
      .attr("font-size",12)
      .text(checkObject(param.legend, ["mark",param.chip[n]["value"],"mark"]) || "");
  }
  const addText =(d, n)=>{
    d.append("text")
      .attr("x", param.f_x(param.chip[n]["x"]+0.5))
      .attr("y", param.f_y(param.chip[n]["y"]+0.5))
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-family","sans-serif")
      .attr("font-size",12)
      .text(param.chip[n]["value"] || "");
  }

  chips.forEach((n)=>{
    let hoge = chipmap.append("g")
      .on("click",()=> param.callback(n))
    // .on("mouseover", ()=>d3.select( ".tooltip" ).attr("visibility", "visible").text(param.chip[n]["value"] || ""))
    // .on("mouseout", ()=>d3.select( ".tooltip" ).attr("visibility", "hidden"))
    //   .on("mouseover", function(){
    //     d3.select(this) // マウスに重なった要素を選択
    //       .attr("style", "fill:rgb(0,0,255)");
    // })
    // .on("mouseout", function(){
    //   d3.select(this) // マウスに重なっていた要素を選択
    //       .attr("style", "fill:rgb(255,0,0)");
    // })
    hoge.append("rect")
        .attr("x", param.f_x(param.chip[n]["x"]))
        .attr("y", param.f_y(param.chip[n]["y"]))
        .attr("width", param.chipSizeX)
        .attr("height", param.chipSizeY)
        .attr("stroke-width",1)
        .attr("stroke","black")
        .attr("fill", fillColor(n))
        .append("title")
        .text(param.chip[n]["value"] || "");
    if(param.legend["text"])
      addText(hoge, n);
    else if(mode == "mark")
      addMark(hoge, n);
  })
}
