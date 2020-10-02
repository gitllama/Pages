const add =(a, b) =>{
  requirejs(['add'], (f)=> {
    let result = f(a, b);
    return f;
  });
}

const asyncAdd =(a,b)=> new Promise(resolve => {
  requirejs(['add'], (f)=> resolve(f(a,b)));
});

const asyncSub  =(a,b)=> new Promise(resolve => {
  requirejs(['sub'], (f)=> resolve(f(a,b)));
});

(async () => {

  console.log(add(6,1)); //呼び出しは非同期なのでundefined

  //Subの読み込みに時間かかっても同期的に動く
  console.log(await asyncSub(6,1));
  console.log(await asyncAdd(6,1)); 
})();
