import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Posts from './posts/Posts'
import PostDetail from './posts/PostDetail'
import PostCreate from './posts/PostCreate'

class App extends Component {
  render() {
    return (
      <div className="App">
      	<BrowserRouter>
      		<Switch>
        		<Route exact path='/posts/' component={Posts} />
            <Route exact path='/posts/create' component={PostCreate} />
        		<Route exact path='/posts/:slug/' component={PostDetail} />
        		<Route component={Posts} />
        	</Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
