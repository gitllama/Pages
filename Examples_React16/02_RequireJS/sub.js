define([],()=> {
  console.log("call sub"); //キャッシュされるので最初の一度しか呼ばれない
  let time = new Date().getTime();
  while (new Date().getTime() < time + 3000); //読み出しに時間かかっていることを模擬する同期的なwait
  return (a, b)=> {
    return a - b;
  };
});