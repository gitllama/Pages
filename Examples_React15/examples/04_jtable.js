class jtable{
  constructor() {
  }

  static render(obj){
    let dst = "";
    for(let i of obj.detail){
      switch (i.type) {
        case 'code39':
          dst += `<svg class="barcode"
  jsbarcode-format="code39"
  jsbarcode-value="${i.value}"
  jsbarcode-textmargin="0"
  jsbarcode-fontoptions="bold">`;
          break;
        default:
          break;
      }
    }
    return dst;
  }
}
