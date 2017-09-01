/*Draw Wf Map by JavaScript*/

// TEXT generation is faster than DOM (createElementNS/createElement and setAttribute)
//

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
    this.DisableChip = { Top: 1,Bottom: 1, Left :1, Right:1};
  }

  getstr(notch){
    var tags = [];

    let w = (this.ShotsNum.X + this.DisableChip.Left + this.DisableChip.Right) * this.ShotSize.X;
    let h = (this.ShotsNum.Y + this.DisableChip.Top + this.DisableChip.Bottom) * this.ShotSize.Y;
    let cx = w/2 + this.Margin.Left;
    let cy = h/2 + this.Margin.Top;
    let fullx = w + (this.Margin.Left + this.Margin.Right);
    let fully = h + (this.Margin.Top + this.Margin.Bottom);

    tags.push(`<svg  xmlns="http://www.w3.org/2000/svg"  version="1.1" viewBox="0 0 ${fullx} ${fully}" width="400">`);
    tags.push(this.grid(this.ShotsNum, this.ShotSize, this.DisableChip, this.Margin));
    tags.push(this.wfexternal(cx, cy, this.WfSize, notch, this.Notchcut, this.Edgecut));
    tags.push(this.wfaxis(w,h,cx,cy));
    tags.push(this.drawValue([{X :2,Y:4,Value:10}]));
    tags.push('</svg>');
    return tags.join('');
    //element.innerHTML = tags.join('');
  }

  grid(shotsnum, shotsize, dischip, margin) {
    let width = (shotsnum.X + dischip.Left + dischip.Right) * shotsize.X;
    let height = (shotsnum.Y + dischip.Top + dischip.Bottom) * shotsize.Y;

    const line =(x1,x2,y1,y2)=> `<line x1=${x1} x2=${x2} y1=${y1} y2=${y2} stroke="lightgray" stroke-width="1" />`;
    const rect =(x1,y1,w,h)=> `<rect x=${x1} y=${y1} width=${w} height=${h} stroke="black" fill="none" stroke-width="2" />`;

    let tags = [];
    tags.push('<g>');
    for(let x = margin.Left + dischip.Left*shotsize.X; x < margin.Left + width; x+=shotsize.X){
      tags.push(line(x, x, margin.Top, margin.Top + height));
    }
    for(let y = margin.Top + dischip.Top*shotsize.Y; y < margin.Top + height; y+=shotsize.Y){
      tags.push(line(margin.Left, margin.Left + width, y, y));
    }
    tags.push(rect(margin.Left,margin.Top,width,height));
    tags.push('</g>');
    return tags;
  }

  wfexternal(cx, cy, wfsize, notch, notchcut, edgecut){
    const radian =(deg)=> deg * Math.PI / 180;
    const degree =(rad)=> rad * 180 / Math.PI;

    let x = cx,
        y = cy,
        d = wfsize,
        rot = notch,
        cutsize = edgecut/2,
        rot_o = degree(Math.asin(cutsize * 2 / (d/2)));

    let cx_s = x + d/2 * Math.cos(radian(rot - rot_o)),
        cy_s = y + d/2 * Math.sin(radian(rot - rot_o)),
        cx_e = x + d/2 * Math.cos(radian(rot + rot_o)),
        cy_e = y + d/2 * Math.sin(radian(rot + rot_o)),
        nx = x + (d/2 - cutsize) * Math.cos(radian(rot)),
        ny = y + (d/2 - cutsize) * Math.sin(radian(rot));
    let str = `M ${cx_s} ${cy_s} A ${d/2} ${d/2} ${rot - rot_o} 1 0 ${cx_e}, ${cy_e} L ${nx}, ${ny} z`;

    let cx_si = x + (d/2 - notchcut) * Math.cos(radian(rot)) - d/3 * Math.sin(radian(rot)),
        cy_si = y + (d/2 - notchcut) * Math.sin(radian(rot)) - d/3 * Math.cos(radian(rot)),
        cx_ei = x + (d/2 - notchcut) * Math.cos(radian(rot)) + d/3 * Math.sin(radian(rot)),
        cy_ei = y + (d/2 - notchcut) * Math.sin(radian(rot)) + d/3 * Math.cos(radian(rot))

     //notch -> Edge -> Notch Reserved Distance
     let tags = [];
     tags.push('<g>');
     tags.push(`<path d="${str}"" stroke="black" fill="none" stroke-width="2" />`);
     tags.push(`<circle cx=${x} cy=${y} r=${d/2- cutsize*2} stroke="black" fill="none" stroke-width="2" />`);
     tags.push(`<line x2=${cx_si} y1=${cy_si} x1=${cx_ei} y2=${cy_ei} stroke="black" stroke-width="1" />`);
     tags.push('</g>');
     return tags;
  }

  wfaxis(width, height,cx,cy){
    console.log(width)
    const redline =(x1,x2,y1,y2,text)=>
        `<line x1=${x1} x2=${x2} y1=${y1} y2=${y2} stroke="red" stroke-width="1" marker-end="url(#atr)"/>`
      + `<text x=${x2} y=${y2} font-size="9" font-weight="bold">${text}</text>`;
    const mark =(x,y,text)=>
        `<text x=${x} y=${y} text-anchor="middle" font-size="9">${text}</text>`;

    let fontsize = 9,
        offset_xAxis = fontsize * 1.5,
        offset_yAxis = fontsize * -1,
        Inversion = this.ArixInversion,
        Origin = this.ArixOrigin;
    let ArrowOffset = 4.5;
    let fully = height + (this.Margin.Top + this.Margin.Bottom);
    //mark -> axis -> text
    let tags = [];
    tags.push('<g>');
    tags.push(`<marker id="atr" markerUnits="strokeWidth" markerWidth="6" markerHeight="6" viewBox="0 0 10 10" refX="5" refY="5" orient="auto-start-reverse"`);
    tags.push(`<polygon points="0,0 5,5 0,10 10,5" fill="red"/>`);
    tags.push(`</marker>`);
    tags.push(redline(this.Margin.Left-ArrowOffset,this.Margin.Left+width+ArrowOffset,cy,cy,"X"));
    tags.push(redline(cx,cx,this.Margin.Top-ArrowOffset,this.Margin.Top+height+ArrowOffset,"Y"));
    for(let n = 0;n < this.ShotsNum.X; n++){
      tags.push(mark(
        this.Margin.Left + (n + this.DisableChip.Left)*(this.ShotSize.X) + this.ShotSize.X/2,
        fully - this.Margin.Bottom + offset_xAxis,
        (Inversion.X ? this.ShotsNum.X - 1 - (n + Origin.X) : n + Origin.X)
      ));
    }
    for(let n = 0;n < this.ShotsNum.Y; n++){
      tags.push(mark(
        this.Margin.Left + offset_yAxis,
        this.Margin.Top + (n+this.DisableChip.Top)*this.ShotSize.Y + this.ShotSize.Y/2,
        (Inversion.Y ? this.ShotsNum.Y - 1 - (n + Origin.Y) : n + Origin.Y)
      ));
    }
    tags.push('</g>');
    return tags;
  }

  drawValue(Value){
    const Val =(x,y,v)=> `<text x=${x} y=${y} text-anchor="middle" font-size="9">${v}</text>`;
    let txtoffset = 9 / 2;

    let tags = [];
    tags.push('<g>');
    for(let n of Value){
      let ox = this.Margin.Left + this.ShotSize.X/2,
          oy = this.Margin.Top + this.ShotSize.Y/2 + txtoffset;
      tags.push(Val(
        ox + (n.X + this.DisableChip.Left) * this.ShotSize.X,
        oy + (n.Y + this.DisableChip.Top) * this.ShotSize.Y,
        n.Value
      ));
    }
    tags.push('</g>');
    return tags;
  }

}
