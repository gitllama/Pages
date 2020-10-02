/* Draw Wf Map by JavaScript
*  jwafermap.js
*
* TEXT generation is faster than
*  DOM (createElementNS/createElement and setAttribute)
*/

class jwafermap{
  constructor(setting) {
    if(setting == null) setting = { };

    const supplement = (val, default_val)=> val === undefined ? default_val : val;

    this.WfSize = supplement(setting.WfSize, 200);
    this.ShotsNum = supplement(setting.ShotsNum,{ X:10, Y:7 });
    this.ShotSize = supplement(setting.ShotSize,{X:17.2,Y:24.8});
    this.Chips = supplement(setting.Chips,54);
    this.Notch = supplement(setting.Notch,90);
    this.Edgecut = supplement(setting.Edgecut,5);
    this.Notchcut = supplement(setting.Notchcut,9);
    this.ArixOrigin = supplement(setting.ArixOrigin,{X:0,Y:0});
    this.ArixInversion = supplement(setting.ArixInversion,{X:false,Y:false});

    this.Mark = supplement(setting.Mark,"null");

    this.EnableChips = setting.EnableChips;

    this.Margin =  supplement(setting.Margin,{ Top:20,Bottom:20, Left:20,Right:20});
    this.DisableChip =  supplement(setting.DisableChip,{ Top: 1,Bottom: 1, Left :1, Right:1});

    this.Width = (this.ShotsNum.X + this.DisableChip.Left + this.DisableChip.Right) * this.ShotSize.X;
    this.Height = (this.ShotsNum.Y + this.DisableChip.Top + this.DisableChip.Bottom) * this.ShotSize.Y;
    this.cx = this.Width/2 + this.Margin.Left;
    this.cy = this.Height/2 + this.Margin.Top;
    this.FullWidth = this.Width + (this.Margin.Left + this.Margin.Right);
    this.FullHeight = this.Height + (this.Margin.Top + this.Margin.Bottom);

  }

  getstr(vals, scale){
    console.log(vals);

    let tags = [];
    if(scale != null){
      tags.push(`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ${this.FullWidth} ${this.FullHeight}" width=${this.FullWidth * scale}>`);
    }else{
      tags.push(`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ${this.FullWidth} ${this.FullHeight}">`);
    }

    tags.push('<defs>');
    tags.push(`<marker id="atr" markerUnits="strokeWidth" markerWidth="6" markerHeight="6" viewBox="0 0 10 10" refX="5" refY="5" orient="auto-start-reverse">`);
    tags.push(`<polygon points="0,0 5,5 0,10 10,5" fill="red"/>`);
    tags.push(`</marker>`);
    tags.push('</defs>');

    tags.push(this.wfenable());
    tags.push(this.wfgrid());
    tags.push(this.wfexternal());
    tags.push(this.wfaxis());
    tags.push(this.wfsummary());

    if(vals != null)
      tags.push(this.drawValue(vals));

    tags.push('</svg>');
    return tags.join('');
    //element.innerHTML = tags.join('');
  }

  wfgrid() {
    const line =(x1,x2,y1,y2)=> `<line x1=${x1} x2=${x2} y1=${y1} y2=${y2} stroke="lightgray" stroke-width="1" />`;
    const rect =(x1,y1,w,h)=> `<rect x=${x1} y=${y1} width=${w} height=${h} stroke="black" fill="none" stroke-width="2" />`;

    let tags = [];
    tags.push('<g>');
    let startx = this.Margin.Left + this.DisableChip.Left * this.ShotSize.X;
    for(let x = startx; x < this.Margin.Left + this.Width; x += this.ShotSize.X){
      tags.push(line(x, x, this.Margin.Top, this.Margin.Top + this.Height));
    }
    let starty = this.Margin.Top + this.DisableChip.Top * this.ShotSize.Y;
    for(let y = starty; y < this.Margin.Top + this.Height; y += this.ShotSize.Y){
      tags.push(line(this.Margin.Left, this.Margin.Left + this.Width, y, y));
    }
    tags.push(rect(this.Margin.Left, this.Margin.Top, this.Width, this.Height));
    tags.push('</g>');

    return tags;
  }

  wfexternal(){
    const radian =(deg)=> deg * Math.PI / 180;
    const degree =(rad)=> rad * 180 / Math.PI;

    let x = this.cx,
        y = this.cy,
        d = this.WfSize,
        rot = this.Notch,
        cutsize = this.Edgecut / 2,
        rot_o = degree(Math.asin(cutsize * 2 / (d/2)));

    let cx_s = x + d/2 * Math.cos(radian(rot - rot_o)),
        cy_s = y + d/2 * Math.sin(radian(rot - rot_o)),
        cx_e = x + d/2 * Math.cos(radian(rot + rot_o)),
        cy_e = y + d/2 * Math.sin(radian(rot + rot_o)),
        nx = x + (d/2 - cutsize) * Math.cos(radian(rot)),
        ny = y + (d/2 - cutsize) * Math.sin(radian(rot));
    let str = `M ${cx_s} ${cy_s} A ${d/2} ${d/2} ${rot - rot_o} 1 0 ${cx_e}, ${cy_e} L ${nx}, ${ny} z`;

    let cx_si = x + (d/2 - this.Notchcut) * Math.cos(radian(rot)) - d/3 * Math.sin(radian(rot)),
        cy_si = y + (d/2 - this.Notchcut) * Math.sin(radian(rot)) - d/3 * Math.cos(radian(rot)),
        cx_ei = x + (d/2 - this.Notchcut) * Math.cos(radian(rot)) + d/3 * Math.sin(radian(rot)),
        cy_ei = y + (d/2 - this.Notchcut) * Math.sin(radian(rot)) + d/3 * Math.cos(radian(rot))

     //notch -> Edge -> Notch Reserved Distance
     let tags = [];
     tags.push('<g>');
     tags.push(`<path d="${str}"" stroke="black" fill="none" stroke-width="2" />`);
     tags.push(`<circle cx=${x} cy=${y} r=${d/2- cutsize * 2} stroke="black" fill="none" stroke-width="2" />`);
     tags.push(`<line x2=${cx_si} y1=${cy_si} x1=${cx_ei} y2=${cy_ei} stroke="black" stroke-width="1" />`);
     tags.push('</g>');
     return tags;
  }

  wfaxis(){
    const redline =(x1,x2,y1,y2,text)=>
        `<line x1=${x1} x2=${x2} y1=${y1} y2=${y2} stroke="red" stroke-width="1" marker-end="url(#atr)"/>`
      + `<text x=${x2} y=${y2} font-size="9" font-weight="bold">${text}</text>`;
    const mark =(x,y,text)=>
        `<text x=${x} y=${y} text-anchor="middle" font-size="9">${text}</text>`;

    let fontsize = 9,
        offset_xAxis = fontsize * 1.5,
        offset_yAxis = fontsize * -1,
        ArrowOffset = 4.5;

    //mark -> axis -> text
    let tags = [];
    tags.push('<g>');
    tags.push(redline(
      this.Margin.Left-ArrowOffset,
      this.Margin.Left+this.Width+ArrowOffset,
      this.cy,
      this.cy,
      "X"));
    tags.push(redline(
      this.cx,
      this.cx,
      this.Margin.Top - ArrowOffset,
      this.Margin.Top + this.Height + ArrowOffset,
      "Y"));
    for(let n = 0;n < this.ShotsNum.X; n++){
      tags.push(mark(
        this.Margin.Left + (n + this.DisableChip.Left) * (this.ShotSize.X) + this.ShotSize.X/2,
        this.FullHeight - this.Margin.Bottom + offset_xAxis,
        (this.ArixInversion.X ? this.ShotsNum.X - 1 - (n - this.ArixOrigin.X) : n + this.ArixOrigin.X)
      ));
    }
    for(let n = 0;n < this.ShotsNum.Y; n++){
      tags.push(mark(
        this.Margin.Left + offset_yAxis,
        this.Margin.Top + (n + this.DisableChip.Top) * this.ShotSize.Y + this.ShotSize.Y/2,
        (this.ArixInversion.Y ? this.ShotsNum.Y - 1 - (n - this.ArixOrigin.Y) : n + this.ArixOrigin.Y)
      ));
    }
    tags.push('</g>');
    return tags;
  }
  wfsummary(){
    const mark =(x,y,text)=>
        `<text x=${x} y=${y} text-anchor="left" font-size="9">${text}</text>`;

    let fontsize = 9,
        offset_xAxis = fontsize * 1.5,
        offset_yAxis = fontsize * -1,
        ArrowOffset = 4.5;

    let tags = [];
    tags.push('<g>');

    tags.push(mark(
      this.Margin.Left,
      this.FullHeight - this.Margin.Bottom +9 ,
      "Mark : A012345-00"
    ));
    tags.push('</g>');
    return tags;
  }

  wfenable(){
    const rect =(x,y)=> `<rect x=${x} y=${y} width=${this.ShotSize.X} height=${this.ShotSize.Y} fill="gray" />`;

    let ox = this.Margin.Left + this.DisableChip.Left * this.ShotSize.X,
        oy = this.Margin.Top + this.DisableChip.Top * this.ShotSize.Y;

    let tags = [];
    tags.push('<g>');
    for(let y = -this.DisableChip.Top; y < this.DisableChip.Bottom + this.ShotsNum.Y; y++){
      for(let x = -this.DisableChip.Left; x < this.DisableChip.Right + this.ShotsNum.X; x++){
        if(!this.EnableChips.some((e)=> e.X == x && e.Y ==y)){
          tags.push(rect(ox + x * this.ShotSize.X, oy + y * this.ShotSize.Y));
        }
      }
    }
    tags.push('</g>');
    return tags;
  }

  drawValue(vals){
    const Val =(x,y,v)=> `<text x=${x} y=${y} text-anchor="middle" font-size="9">${v}</text>`;
    const rect =(x,y)=> `<rect x=${x} y=${y} width=${this.ShotSize.X} height=${this.ShotSize.Y} stroke="black" fill="red" stroke-width="1" />`;
    let txtoffset = 9 / 2;
    let ox = this.Margin.Left + this.DisableChip.Left * this.ShotSize.X,
        oy = this.Margin.Top + this.DisableChip.Top * this.ShotSize.Y;

    let tags = [];
    tags.push('<g>');
    for(let n of vals){
      let x = ox + n.X * this.ShotSize.X ,
          y = oy + n.Y * this.ShotSize.Y;
      tags.push(rect(x, y));
      tags.push(Val(
        x + this.ShotSize.X/2,
        y + this.ShotSize.Y/2 + txtoffset,
        n.Value));

    }
    tags.push('</g>');
    return tags;
  }

}
