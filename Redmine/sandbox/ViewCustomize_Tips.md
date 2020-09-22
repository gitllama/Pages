# view customize Tips

## jQuery

redmineのverにもよるかもしれませんが、jQueryなどは  
埋め込み前のhtmlに記述済み

デバッグには
- ブラウザの検証（Chrome/検証など）
- CodePen
- jsdo.it
- JSFiddle

などご使用

日本語リファレンスはこちら  
http://semooh.jp/jquery/api/selectors/

##


### body要素に付与されるもの

```html
<body class="project-test1 controller-projects action-show">
```

| class名 | 内容 |
|:--|:--|
| controller-{コントローラ名} | Railsでのコントローラ名 |
| action-{アクション名}      | Railsでのアクション名 |
| project-{プロジェクト名}   | Redmine上のプロジェクトの識別子 |

### チケット一覧の各行に付与されるもの

| class名 | 内容 |
|:--|:--|
| issue                 | チケットであることを表す |
| tracker-{トラッカーID} | idはその設定画面urlから確認できる |
| status-{ステータスID}  |  |
| priority-{優先度ID}    |  |
| priority-{優先度種別}  | |
| created-by-me |	自分が作ったチケットの場合に付与 |
| assigned-to-me |	自分が担当となっているチケットの場合に付与 |
| closed |	終了状態のチケット |
| private |	プライベートのチケット |

### 検索方法

```javascript
//A
var parent = $('div#main div#content');
var children = parent.children();
for (var i = 0; i < children.length; i++){
    var child = $(children[i]); //←$()で囲ってやる
    if (child.hasClass("tracker-16")){
        console.log("true");
    }
}

//B
console.log($('.issue').hasClass("tracker-13"));

//C
var classVal = $('.issue').attr('class');
var classVals = classVal.match(/tracker-([\s\S]*?) /)[1];
console.log(classVals);
```

### バッドノウハウ

view customize pluginはType:JavaScriptの場合、```<head>```内に順に  
```<script type="text/javascript"></script>```で囲ってコードを埋め込んでいる  
だけなので以下のような記述を使用してCDNを使用することができます

```javascript
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-yaml/3.4.2/js-yaml.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
<script type="text/babel">
  const hoge = (name) => {
    console.log(name);
  };
  hoge('Hello');

  ReactDOM.render(
    <div>Hello, world!</div>,
    $("body")[0]
  );
</script>
<script type="text/javascript">
```

$.getScript(()=>{})でコールバック地獄を記述するよりはマシ程度で、  
どちらかというとview customizeだけでReact/babelなんかを無理やり  
使いたいときに活用できるでしょうか？  
（そんなシチュエーションがあるかは知らない）

（おそらく番号順ですが）埋め込み順がどのようになっているかは留意する必要があります。
