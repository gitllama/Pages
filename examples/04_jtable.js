class jtable{
  constructor() {
  }

  static render(obj){
    let dst = "";
    for(let i of obj.detail){
      switch (i.type) {
        case 'code39':
          dst += `<p>${i.value}</p>`;
          break;
        default:
          break;
      }
    }
    return dst;
  }
}

function testaaa(){
  return <div>aa</div>;
}
