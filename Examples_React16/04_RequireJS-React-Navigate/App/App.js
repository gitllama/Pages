'use strict';

define(
  [
    'react', 
    'react-dom',
    'jsx!App/Provider',
    'jsx!App/Components/Loading',
    'jsx!App/Components/Selector',
    'jsx!App/Components/Test',
  ],
  (
    React,
    ReactDOM, 
    Provider,

    Loading,
    Selector,
    {A, B, C}
  )=>{


  //getParams('region', 'A'),
  
  const App = () => (
    <Provider>
      <Loading>
        <Selector defultRegion='A'>
          {{
            ["A"] : (<A/>),
            ["B"] : (<B/>),
            ["C"] : (<C/>),
            ["D"] : (<div>under construction</div>),
          }}
        </Selector>
      </Loading>
    </Provider>
  );

  ReactDOM.render(<App />, document.getElementById('root'));

});