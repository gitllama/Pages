JS 1996 2000google
Flash 1996 (3,4 1998 2005adobe)
HTML4 1997
HTML5 2008
JQuery 2006
Ajaxの登場（2005年）
React 2013 (VirtualDOM)
JSON 2006
MySQL 1995
mvc 2010
mvvm 2012

ヒューマンエラー
バーコード化

変更管理に関しての一文（変更するな/製造品・実験品

モデルNo, モノに対して一意である必要がある

・受注票 -> 統合
・カスタマーコード 
　普段は「その他」/登録
   口座開設->めったにないけど登録
Quantityでマイナス表記をできるように
ドラフト　下書き
DRAFT（見込み
起案（確定
終了（

を分ける


/******/



**前提**

- スケジューリング管理側のみRedmineと連携  
- SQLやJson,Yamlデータとして管理（統計処理に接続可能）  
- 柔軟なアウトプットフォーマット作成  
- PDFの生成（工程への指示

## 現在の構造

- RedmineのSQL使用、詳細はYaml入力  
- フォーマットはHTML(Excel, Markdown等より生成可能)  
- フォーマットをGit管理  
- すべて通しのLotNoで紐つけ管理

### viewer側

- MarkdownのライブラリはGFM未対応が多く却下
- AsciiDocも開発途上で却下
- PDFはiTextが使用できるが、置換処理は不可能（Adobeフォント縛り）
- PDF直書きはつらい

- JsonよりYamlは見やすい。PreViewがインデントを消すがView customizeで対応可

- htmlは出力できるソフトはそれなりに多彩
- html生成はscriptも生成するの注意
- htmlはgitからも直接読める
- Markdownからもhtml生成できる
- Excelからも生成できる（UTF-8化とリンク修正は必要
- ASP.Net移行が楽
- html to pdfライブありある（フォント問題でペンディング
- wpfでのレイアウトも一応可能

=> htmlで

#### 1. 読み込み

redmine-api使用

```C#
string host = "";
string apiKey = "";

var manager = new RedmineManager(host, apiKey);

var parameters = new NameValueCollection { { "subject", "17F001_PRE00" } };
//var i = manager.GetObjects<Issue>(10, 0, "17F001_PRE00");
var i = manager.GetObjects<Issue>(parameters);

var json = i[0].CustomFields[0].Values[0].Info;
Model = JsonConvert.DeserializeObject<PreStats>(json);
```

でシリアライズまで可能。

#### 2. 表示

```C#
WebClient client = new WebClient();
string temp = client.DownloadString("https://brookmantech.github.io/Documents/html/");

Content = temp
    .Replace("[Foundry]", Model.Foundry);
```

webから直接読み取り、Behavior設定したwpf, Webbrowserに直接流し込み

PreView時の表示修正

```
  var i = $('div.issue div.description div.wiki').text();
  $('div.issue div.description div.wiki').html("<pre>"+jQuery.trim(i)+"</pre>");
  $('div.issue div.description').css('color', 'red');
```

#### 3. PDF化

iTextではいてもよいが、単純に右クリック印刷でもよさそう・・・

## ワークフロー管理

分岐など複雑な管理を行わない限りRedmineのワークフローでフォローできる

ポイント

- 作成・発行者のみ編集
- 照査はコメントとステータス移動のみ
- 承認者はコメントを確認したうえで、承認か差し戻しの選択

-> 作成者に戻る

## 外部データ管理

外部データとして管理すべき項目は下記があげられる

- 機種データ（マスクセット/使用ファブ/標準条件
- 顧客情報（コード/顧客名/届け先

SQLないでの管理もできるが、

- Gitでの差分管理
- Yaml形式

であると変更管理が楽

Redmineで行う場合はWiki -> 正規表現でYaml抜出 -> デシリアライズが可能
