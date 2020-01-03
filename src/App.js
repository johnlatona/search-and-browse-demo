import React from 'react';
import SearchBar from './components/SearchBar';
import Product from './components/Product';
import Results from './components/Results';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import store from './store/store';
import { history } from './store/history';

const App = (props) => {
  return (
    <Provider store={store}>
      <div>
        <h1>Search and Browse</h1>
        <Router history={history}>
          <SearchBar props={props}/>
          <Switch>
            <Route exact path="/products" component={Results}/>
            <Route 
              path="/products/:id" 
              render={({match}) => (
                <Product match={match}/>
              )}/>
          </Switch>
        </Router>
      </div>
    </Provider>
  )
}

export default App;
