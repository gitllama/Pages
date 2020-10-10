/******** State ********/
'use strict';

define([],()=>{

  let data = undefined;
  try{
    //data = JSON.parse(localStorage.getItem('state'));
  }catch(e){
    console.log(e);
    data = null;
  }

  const initialState = Object.assign({
      loading : true,
      region : 'A',
      oldRegion : [],
      title : document.title,
      err : { handled: true, type : undefined, message : undefined},
      count : 0
    },
    data
  );

  return initialState;

});