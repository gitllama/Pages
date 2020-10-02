/******** State ********/
'use strict';

define([],()=>{

  const initialState = {
    loading : true,
    region : 'home',
    oldRegion : [],
    title : document.title,
    err : undefined,
    count : 0
  };

  return initialState;

});