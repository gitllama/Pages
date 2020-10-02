define([],()=> {
  console.log("call add"); //キャッシュされるので最初の一度しか呼ばれない
  return (a, b)=> {
    return a + b;
  };
});