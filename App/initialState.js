/******** State ********/
'use strict';

define([],()=>{

  const initialState = {
    loading : true,
    region : 'home',
    oldRegion : [],
    title : document.title,
    err : { handled: true, type : undefined, message : undefined},
    screen : {width: window.parent.screen.width, height:window.parent.screen.height},
    count : 0
  };

  return initialState;

});