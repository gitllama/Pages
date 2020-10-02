</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-yaml/3.4.2/js-yaml.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/signature_pad/1.5.3/signature_pad.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js"></script>
<script src="https://unpkg.com/react-jsonschema-form/dist/react-jsonschema-form.js"></script>

<script type="text/javascript">

class ViewCustomClass{
  constructor() {
    this.defaulttracker = 16;
    this.sign_array = ['12', '13', '14', '15'];
    this.conditionsID = "6";
    this.resultID = "7";
    this.addresseeID = "10";
    this.customerID = "17";

    this.IDList = { "conditions" : "6",
                    "result" : "7",
                    "addressee" : "10",
                    "customer" : "17" };
  }

  

}


/*******************************
  YamlClass
*******************************/
class YamlClass{
  constructor() {
  }

  /*クラス定数*/
  static get url_yaml() {　
    return "https://cdnjs.cloudflare.com/ajax/libs/js-yaml/3.4.2/js-yaml.min.js";
  }

  /* Check */
  static Check(src, reg){
    let dst = "";
    this.Enumeration(src, [], (key, value)=> {
      let r = new RegExp(this.Parse(reg, key));
      if(!(r.test(value))) dst += `[${key}]:${value},`;
    });
    return dst;
  }

  /* Enumeration */
  static Enumeration(src, ary, callback){
    for (var key in src) {
      if (typeof src[key] === "object") {
        this.Enumeration(src[key], ary.concat(key), callback);
      }else{
        callback(ary.concat(key), src[key]);
      }
    }
  }
  /*
  static Enumeration(src1,src2){
    JSON.parse(JSON.stringify(src1), (key, value)=>{
      if(!is("Object", value))
        console.log(key + ":" + value);
      return value;
    });
  }
  */

  /* Parse / this.Parse(json,["a","b"]); */
  static Parse(src, ary){
    for(let key of ary){
      src = src[key];
      if(src == null) return null;
    }
    return src;
    /*
    let key = ary.shift();
    if(key in val){
      return ary.length < 1
        ? val[key]
        : this.Parse(val[key], ary);
    }
    return null;
    */
  }

  /* is (type = String Number Boolean Date Error Array Function RegExp Object)*/
  static is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
  }

  /**/
  static Read(text, callback){
      callback(jsyaml.load(text));

    //$.getScript(this.url_yaml, ()=>{
    //}).fail(()=>{ alert('fail read yaml'); });
  }

  /**/
  static ReadPath(path, callback){
    $.get(path).done((src)=>{
      let yaml = src.match(/```yaml([\s\S]*?)```/)[1];
      this.Read(yaml, callback);
    }).fail(()=>{ alert('fail read yaml'); });
  }

  static ReadPromise(text){
    return new Promise((resolve, reject)=> {
      $.getScript(this.url_yaml, ()=>{
        resolve(jsyaml.load(text));
      }).fail(()=>{ alert('fail read yaml'); });
    });
  }

  static ReadPathPromise(path){
    return new Promise((resolve, reject)=> {
      console.log(path);
      $.get(path).done((src)=>{
        let yaml = src.match(/```yaml([\s\S]*?)```/)[1];
        resolve(jsyaml.load(yaml));
      }).fail(()=>{ alert('fail read yaml'); });
    });
  }

}

/*******************************
  AutoNumberingClass
*******************************/
class AutoNumberingClass{

  constructor() {
    this.ary = ['0','1','2','3','4','5','6','7','8','9'
               ,'A','B','C','D','E','F','G','H',    'J'
               ,'K','L','M','N',    'P',    'R','S','T'
               ,'U','V','W','X','Y','Z' ];
    this.now = new Date();
    this.year = this.now.getFullYear();
    this.month = this.now.getMonth()+1;
    this.date = this.now.getDate();

    this._url = `/redmine/issues.json?limit=100&created_on=%3E%3D${this.GetDate('url')}`;
    //(uncrypted filter is ">=2012-03-01") %3E%3D
  }

  /* AutoNumbering */
  AutoNumbering(callback) {
    $.ajax({ type: 'GET', url: this._url , dataType: 'json'}).done((data)=>{
      /*
      console.log(_url + data["total_count"]);
      for(var key in data["issues"]){
        console.log(`${key} : ${data["issues"][key]["id"]}, ${data["issues"][key]["created_on"]}`);
      }
      */
      if(data["total_count"] > 99){
        alert('Failed : Too many \"issues\"');
        return callback('Failed : Too many \"issues\"');
      }else{
        let code = `${this.GetDate('lot') + ("0" + data["total_count"]).slice(-2)}`;
        let cd = this.CheckDigit(code);
        callback(`[DRAFT]TEST-${code}${cd}`);
      }
    }).fail((data)=>{ alert('Fail AutoNumbering'); });
  }

  /* GetDate */
  GetDate(val){
    switch (val) {
      case 'url':
        return `${this.year}-${("0"+this.month).slice(-2)}-${("0"+this.date).slice(-2)}`;
        break;
      case 'lot':
        return `${this.ary[this.year - 2000]}${this.ary[this.month+9]}${this.ary[this.date]}`;
        break;
      case 'lotwcd':
        //let hoge = `${this.ary[this.year - 2000]}${this.ary[this.month+9]}${this.ary[this.date]}`;
        return ;
        break;
      case 'doc':
        return `${this.year}${("0"+this.month).slice(-2)}${("0"+this.date).slice(-2)}`;
        break;
    }
  }

  /* */
  CheckDigit(str){
    let cd = 0;
    let beforeAry = str.split('');
    for(let i of beforeAry){
      console.log(i + " " + this.ary.indexOf(i));
      cd = cd + this.ary.indexOf(i);
    }
    cd = cd % this.ary.length;
    return this.ary[cd];
  }
}

/*******************************
  SignClass
*******************************/
class SignClass{

  constructor() {
  }

  //target.parent().parent().append(target);
  //for (let i of sign_array) {
  // $(`.cf_${i}.attribute`).children('.value');
  
  static ToImg(element){
    let sign = element.text();
    element.html('<img width="200" />');//(`<img id=\"cf_signature_preview${i}\"/>`);
    if(sign != "") element.children().attr("src",`data:${sign}`);
  }

  static Set(element){
   
    let signid = element.attr("id") + "_sign";
    let clearid = element.attr("id") + "_clear";
    let elm =  `<canvas id="${signid}" width="600" height="200" style="border: 1px solid black;"></canvas>`;
        elm += `<button id="${clearid}">Clear</button>`;
  
    element.parent().append(elm);
    element.hide();

    var signaturePad = new SignaturePad($("#" + signid)[0], {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      penColor: 'rgb(0, 0, 0)',
      onEnd : ()=>{
        element.val(signaturePad.toDataURL("image/svg+xml"));
      }
    });
    var cancelButton = $("#" + clearid)[0];
  
    cancelButton.addEventListener('click', (event)=>{
      signaturePad.clear();
      element.val("");
    });
  }
}
