
/******** util ********/
'use strict';

define([],()=>{

  const asyncWait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const wait =(ms)=>{
    const time = new Date().getTime();
    while (new Date().getTime() < time + ms);
  }

  const getParams = (val, def)=>{
    const dst = ((new URL(document.location)).searchParams).get(val);
    return dst ? dst : def;
  };
  

  return {asyncWait,wait, getParams };

});