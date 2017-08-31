class WfRender{
  constructor(id) {
    this.id = id;

    this.WfSize = 200;
    this.ShotsNum = { X:10, Y:7 };
    this.ShotSize = {X:17.2,Y:24.8};
    this.Chips = 54;
    this.Notch = 90;
    this.Edgecut = 5;
    this.Notchcut = 9;
    this.ArixOrigin={X:0,Y:0};
    this.ArixInversion={X:false,Y:false};

    this.Margin = { Top:20,Bottom:20, Left:20,Right:20};
    this.DisableChip = { Top: 1,Bottom: 1, Left :1,Right:1};
  }
  get(id){
    var tags = [];
    tags.push('<svg xmlns="http://www.w3.org/2000/svg">');
    tags.push(drawLine(90, 70, 120, 90));
    tags.push('</svg>');
    //var placeHolder = document.getElementById(id);
    document.getElementById(id).innerHTML = tags.join('');
  }
  getStateObj(){
    let ShotSize = this.ShotSize,
        ShotsNum = this.ShotsNum,
        margin = this.Margin,
        disChip = this.DisableChip,
        w = (ShotsNum.X + disChip.Left + disChip.Right) * ShotSize.X,
        h = (ShotsNum.Y + disChip.Top + disChip.Bottom) * ShotSize.Y,
        cx = w/2 + margin.Left,
        cy = h/2 + margin.Top,
        fullx = w + (margin.Left + margin.Right),
        fully = h + (margin.Top + margin.Bottom);
    return {
      ShotSize : ShotSize,
      ShotsNum : ShotsNum,
      margin : margin,
      disChip : disChip,
      w : w,
      h : h,
      cx : cx,
      cy : cy,
      fullx : fullx,
      fully : fully
    }
  }
  grid() {
    let i = this.getStateObj();
    let dst = [];
    for(let x = i.margin.Left + i.disChip.Left*i.ShotSize.X;
       x < i.margin.Left + i.w; x+=i.ShotSize.X){
      dst.push({
        x1 : x,
        x2 : x,
        y1 : i.margin.Top,
        y2 : i.margin.Top + i.h
      });
    }
    for(let y = i.margin.Top + i.disChip.Top*i.ShotSize.Y; y < i.margin.Top + i.h; y+=i.ShotSize.Y){
      dst.push({
        x1 : i.margin.Left,
        x2 : i.margin.Left + i.w,
        y1 : y,
        y2 : y
      });
    }
    dst.map((n)=>setAttr("line", this.id, {
      x1 : n.x1,
      x2 : n.x2,
      y1 : n.y1,
      y2 : n.y2,
      stroke : "lightgray",
      stroke-width="1"
    }}));
    setAttr("line", this.id, {
      x:i.margin.Left,
      y:i.margin.Top,
      width:i.w,
      height:i.h,
      stroke:"black",
      fill:"none",
      stroke-width:"2"
    }}));
  }
  setAttr(key, state, svg){
    //document.getElementById(id);
    let obj = document.createElement(key); // HTMLElement
    //document.createElementNS("http://www.w3.org/2000/svg", "path") ); // SVGRectElement
    for(let i in state){
      obj.setAttribute(i.key, i.value);
    }
    svg.appendChild(obj);
  }

}
