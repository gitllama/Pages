/******** Reducers ********/
'use strict';

define(['immer'],({produce})=>{

  const reducers = {
    LOADING : (draft, action) => { draft.loading = true; },
    LOADED : (draft, action) => { draft.loading = false; },
    
    NAVIGATE : (draft, action) => {
      if(action.value == 'back'){
        draft.region = draft.oldRegion.pop();
      }else if(action.value == 'home'){
        draft.oldRegion = [];
        draft.region = home;
      }else{
        draft.oldRegion.push(draft.region);
        draft.region = action.value;
      }
    },
    
    TITLE : (draft, action) => { draft.title = action.value; },

    ERR : (draft, action) => { draft.err = ({ 
        handled: false, 
        type : 'err', 
        message : action.value 
      });
    },
    WARNING : (draft, action) => { draft.err = { 
        handled: false, 
        type : 'warning', 
        message : action.value 
      }; 
    },
    ERR_HANDLED : (draft, action) => { draft.err = { 
      handled: true, 
    }; 
  },
    RESET : (draft, action) => { draft = initialState; },
    
    //LOADING : (state, action) => produce(state, draft => draft.loading = true)
  };
  

  const createReducer =(handlers)=>{
    return (state, action) => {
      console.log("reducer", action);
      if(action.type == "NAVIGATE"){
        const dst = produce(state, draft => handlers[action.type](draft, action));
        //const path = (new URL(document.location)).pathname;
        //localStorage.setItem('state', JSON.stringify(dst))
        //window.location.href = `${path}?Page=${dst.region}`;
        return dst;
      }else if (handlers.hasOwnProperty(action.type)) {
        //return handlers[action.type](state, action);
        return produce(state, draft => handlers[action.type](draft, action));
      } else {
        throw new Error('Err : createReducer');
        //return state;
        //return produce(state, draft => draft.ERR = 'Err : Reducer' );
      }
    }
  };

  const reducer = createReducer(reducers);
  return reducer;

});

/*
 
    TITLE : (state, action) => {
      document.title = action.value;
      return { ...state, title : action.value }
    },
    ASYNCLOGIN : (state, action) => {
      const nextState = { ...state };
      nextState.authName = action.value;
      nextState.loading = false;
      return nextState;
    },
    ASYNCSEARCHISSUE : (state, action) => {
      const nextState = { ...state };
      nextState.issuelist = action.value;
      nextState.loading = false;
      return nextState;
    },
    LOGOUT : (state, action) => {
      const nextState = { ...state };
      api.changeAuth(undefined);
      nextState.authName = undefined;
      return nextState;
    },

*/