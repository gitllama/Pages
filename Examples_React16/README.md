# React16 Examples

## 01_React16

## 02_RequireJS

## 03_RequireJS-React

## 04_RequireJS-React-Navigate

画面遷移のテスト。

## 05_MaterialAppBar

AppBar内の遷移先要素も最初にすべて読み込むので、規模が大きくなると起動が遅くなりtimeoutする

## 06_AppBarWithSession

URL query parame + Sessionを利用した画面遷移

遷移先の遅延ロードを疑似的に実現するために利用。AppBarの再描画も毎回入るのでちらつく。

## 07_AppBarWithLazy

自作component遅延ロード

React.lazy + React.Suspenseを使いたいところだけど、importの利用問題を解決するの面倒なので自作実装

# メモ

```
<Hello toWhat="World">Hello world!</>,
React.createElement(Hello, {toWhat: 'World'}, "Hello world!"),
```//https://github.com/gregberge/loadable-components