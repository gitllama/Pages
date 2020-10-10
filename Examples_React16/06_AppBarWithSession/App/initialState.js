/******** State ********/
'use strict';

define([],()=>{

  let data;
  try{
    data = JSON.parse(localStorage.getItem('state'));
  }catch(e){
    console.log(e);
    data = null;
  }

  const initialState = Object.assign({
      loading : true,
      region : 'home',
      oldRegion : [],
      title : document.title,
      err : { handled: true, type : undefined, message : undefined},
      count : 0
    },
    data
  );

  console.log(initialState)

  return initialState;

});