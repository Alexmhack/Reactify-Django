import React, { Component } from 'react';
import Posts from './posts/Posts'
import PostDetail from './posts/PostDetail'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
      	<BrowserRouter>
      		<Switch>
        		<Route exact path='/posts/' component={Posts} />
        		<Route exact path='/posts/:slug/' component={PostDetail} />
        		<Route component={Posts} />
        	</Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
