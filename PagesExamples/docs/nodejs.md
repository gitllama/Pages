# Electronの環境構築

## Nodeの環境構築

### バージョンマネージャーを使用する場合

バージョンマネージャーのnvmとかnodist使った方が幸せになれるので最初から使っとけ

1. nodistインストーラーがあるのでダウンロード https://github.com/marcelklehr/nodist/releases
2. 起動する
3. コマンドプロンプトから ``` nodist -v ``` でインストール確認
4. ```nodist dist```でバージョン一覧確認
5. Node.jsの安定版をあらかじめ調べておく
6. 必要なバージョンを順次```nodist + 8.9.1``` or ```nodist add 8.9.1```
7. 使用したいバージョンを```nodist use [ver]```
8. ```node -v```でバージョン確認

### Node.jsだけの場合

1. Node.jsのインストール https://nodejs.org/en/
2. コマンドプロンプトから ``` node -v ``` でインストール確認

おわり

ついでにVisual StdioでNode.js開発環境設定してたらそのままVSで開発できる

## ライブラリのインストール

### ローカルインストール

#### コマンドライン

1. コマンドプロンプトから ```cd [プロジェクトフォルダ]```
2. ```npm install --save-dev electron```でパッケージのローカルインストール

#### package.jsonの使用

1. ```npm init```でpackage.jsonのテンプレート作成
2. package.jsonに依存性ライブラリの記述
3. ```npm install```

すてき！

#### Visual Stdioの使用

- npmの使用
  - [あたらしいnpmパッケージのインストール]という項目があります
  - package.jsonを変更した場合は同期をとってソリューションエクスプローラー内で不足パッケージを連絡してくれます
- プロジェクトの設定
  - node.exeパス項に```[プロジェクトフォルダ]\node_modules\electron\dist\electron.exe```

### グローバルインストール

```npm install -g electron```

全プロジェクト共有のパッケージがある場合、グローバルインストールを選択することを想定できる。

バージョン依存性管理考えるとあまり推奨できない。


