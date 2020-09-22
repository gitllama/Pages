# Pages examples

[View on Pages](https://gitllama.github.io/Pages/examples/)

## Description

Examples for Pages (Frontend-Code) by JavaScript.

### React, React-Bootstrap

[01_React](01_react.html)

[02_React-Bootstrap](02_react-bootstrap.html)

### React+Redux

[03_ReactRedux](03_ReactRedux.html)

React+Reduxをnode.jpを使用せずフロントエンドとCDNのみで記述しています。環境構築の手間がなく開発環境を選びませんが、あまり行儀が良い気はしましません。

[03_ReactReduxImmutable.html](03_ReactReduxImmutable.html)

React+Redux+Immutableで変数管理

[04_TableRender](04_TableRender.html)

Yamlデータに対するReact+Reduxでのリアルタイムレンダリング + 遷移先レンダリング

- jsyamlでのシリアライズ
- sessionStorageでの遷移先JSON通信
- styleで帳票印刷設定
- window.openで親でのDOM生成

### API / SQL

[05_axiosapi](05_axiosapi.html)

axiosを使用したAPIの呼び出し

[06_Sqlite](06_sqlite.html)

SqliteのChormeなどではセキュリティ上ローカルファイルの参照時にエラー出る。

```
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files
```
で回避可能

https://github.com/kripken/sql.js

### for Redmine

[07-1_ReactReduxIFrame](07-1_ReactReduxIFrame.html)  
[07-2_ReactReduxIShadowDOM](07-2_ReactReduxIShadowDOM.html)

Redmineと共用しようとするとCSSがぶつかる件の苦肉の策。markdownのレンダリングも合わせて

iFreamをShadowDOMで書き換えたもの。


[08_ReactReduxRedmine](08_ReactReduxRedmine.html)

View customizes puluginを使用したReact+ReduxのRedmine埋め込み例。

例えば".splitcontentright"にレンダリングすればリッチなホームページが作成できます（".splitcontentleft"は全般設定のウェルカムメッセージが表示されている）

- stateのimmutable.jsでの管理
- Reducerのswitch -> 辞書化

[09_ReactReduxChart](09_ReactReduxChart.html)

チャートの表示。plotlyを使用してます。pythonなどでも使えるのでいいかんじ。

[10_ReactReduxTables](10_ReactReduxTables.html)

### Node.js

[11_ReactReduxWebpack](11_ReactReduxWebpack/dist/index.html)

ローカルにWebpack入れようとしたら赤字出たので、グローバルに入れています。  
Ver違いでwebpack.config.jsの記述違うし  
つらい
