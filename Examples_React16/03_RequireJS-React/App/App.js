'use strict';

define(['react', 'jsx!App/Another'],(React, Another)=>{
  
  const App = () => (
    <div>
	    <h1>App component</h1>
	    <Another text="A child component" />
    </div>
  );

	return App;
});