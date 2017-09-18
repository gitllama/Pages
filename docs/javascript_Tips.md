# Javascript入門

どちいかというとjQueryメモ書き

## Main

```javascript
//一番前のめりで実行される
$(document).ready(function(){ });

//DOMツリーの構築が完了したタイミングで実行(3パターン)
//jQueryではこのタイミングまで待たないといけない
$(function(){ });
jQuery(document).ready(function() { }); //3.0以降ready非推奨
jQuery(function(){ });

//すべてのリソースの読み込み完了後
//容量の大きな画像のプロパティ取得が必要な際はこちら
$(window).on("load",function(){ });

//

```

## 関数

```javascript
//関数リテラル
//スコープ内に限定され、実行時に関数登録される(=巻き上げられない)
var calc = function(x, y) {return x + y};
var calc = () =>{　}; //アロー式でも書ける

//関数宣言
//ホイスト（巻き上げ）がおきるのでどこに宣言しても良い
function addStatement(x, y) {
  return x + y;
};
```

関数は任意にスコープを作るための唯一の手段なので、  
関数リテラルはスコープ管理の数少ない手段。

## クラス

```javascript
class Animal  {

  constructor(name) {
    this.name = name;
  }

  get x() { return this._x || 0; } //定義されていない場合は0を返す
  get y() { return this._y || 0; }
  set x(x) { this._x = x }
  set y(y) { this._y = y; }

  walk() {
    console.log(this.name + 'が歩いてます');
  }

  static call(){

  }
}

class Cat extends Animal { // Animalを継承したCatクラスを定義
  mew() {
    super.walk(); // Animalクラスのwalkメソッド呼び出し
    console.log(this.name + 'がニャーと鳴いてます');
  }
}
```


## セレクタ

```html
<div id="hoge1"></div>
<div class="hoge2"></div>
```

```javascript
$(function(){
  console.error('start');
  $(“#hoge1”).text("1");          //idセレクタ
  $(“.hoge2”).text("2");          //クラスセレクタ
  $(“li a”).text();               //子孫セレクタ
  $(“p.hoge, p.hogehoge”).text(); //グループセレクタ

  $(“#hoge1”).children().next().text("1"); //子要素の二番目の要素
});
```

## ブロックスコープ

if文/for文にはブロックスコープは存在せず、if文内で定義でもブロック外で使用可能

```javascript

//即時関数を使用したスコープ
(function () {
})();

// withによるローカルスコープ
with ({ val_with: "" } ) {
}

//letで変数指定するとif文内でもスコープが成立
if (true) {
  let val_if2 = "if2";
}
```

JavaScriptではあるスコープ内で宣言されたローカル変数は、すべてそのスコープの先頭で宣言されたものとみなされる（巻き上げ/ホイスティング）

## イベント

```javascript
$(function(){
  $(“#hoge1”).click(function(){
    $(this).css("color","green")
  });
});
```

## 文字列

```javascript
var a = "a",
    b = 'b',
    c = `b = ${ b }`;
```

バッククオートでテンプレートリテラル（文字列に数式の埋め込み）

## 非同期

javascript自体はシリアルに動作するが、ajax命令は非同期となるので注意が必要。  

```javascript
//通常のajax
$.get(path , (data)=>{
  //このなかは同期的
});

//async, awaitでの非同期の処理待
async function Main(){
  var i = await f();
}
function f()
{
  return new Promise(resolve => {
    $.get(path , (data)=>{
      resolve(data);
    });
  });
}
Main();
```

## json, yamlを使う

```javascript
$(function(){
  var path = "https://cdnjs.cloudflare.com/ajax/libs/js-yaml/3.4.2/js-yaml.min.js";
  $.getScript(path, function(){             //js-yamlを動的に読み込み
    $.get("/config.yaml" , function(data){  //yamlファイルの読み込み

      var doc = jsyaml.load(data);          //js-yamlでデシリアライズ
      console.log(JSON.stringify(doc));     //JSONでシリアライズして内容確認

      console.log(doc["key1"]["key2"]);     //要素にアクセス

    });
  });
});
```
