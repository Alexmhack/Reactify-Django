import React, { Component } from 'react';
import Posts from './posts/Posts'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
      	<BrowserRouter>
      		<Switch>
        		<Route component={Posts} />
        	</Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
