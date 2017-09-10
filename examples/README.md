# Pages examples

## Description

Examples for Pages (Frontend-Code) by JavaScript.



### JQuery

// fetch("http://xxx.xx.xxx.xx/redmine/issues/444.json")
// .then(response => response.json())
// .then(json => {
//    console.log(json);
//    this.props.dispatch(api(json));
// });

### React, React-Bootstrap

[React]("01_react.html")

[React-Bootstrap]("02_react-bootstrap.html")

### React+Redux

[ReactRedux]("03_ReactRedux.html")

React+Reduxをnode.jpを使用せずフロントエンドとCDNのみで記述しています。環境構築の手間がなく開発環境を選びませんが、あまり行儀が良い気はしましません。

[TableRender]("04_TableRender.html")

Yamlデータに対するReact+Reduxでのリアルタイムレンダリング + 遷移先レンダリング

- jsyamlでのシリアライズ
- sessionStorageでの遷移先JSON通信
- styleで帳票印刷設定
- window.openで親でのDOM生成

### API / SQL

[axiosapi]("05_axiosapi.html")

axiosを使用したAPIの呼び出し

[Sqlite]("06_sqlite.html")

SqliteのChormeなどではセキュリティ上ローカルファイルの参照時にエラー出る。

```
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files
```
で回避可能

https://github.com/kripken/sql.js

### for Redmine

[ReactReduxRedmine]("04_ReactReduxRedmine.html")

Redmineとの接続を記述してます。
