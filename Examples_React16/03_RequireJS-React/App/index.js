'use strict';

define(['react', 'react-dom', 'jsx!App/App'], (React, ReactDOM, App)=>{

  const a = {a : 1, b:2};
  // const b = {...a, c:3}; スプレッドプロパティ構文が使えない
  // babelconfigで解決できそうだけど？
  const b = Object.assign({}, a, {c:3});

  console.log(b);

	ReactDOM.render(<App />, document.getElementById('root'));

});