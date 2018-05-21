import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Authorize from './Components/Authorize';
import Header from './Components/Header';
import MainPage from './Components/Main';

import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div>
        {/* Header */}
        <Switch>
          <Route
            exact={true}
            path="/"
            render={props => <Header page="main" {...props} />}
          />
        </Switch>
        <Switch>
          {/* Main Page */}
          <Route exact={true} path="/" component={MainPage} />
          {/* Search Header */}
          <Route path="/search" />
          {/* Authentication */}
          <Route path="/callback/" component={Authorize} />
        </Switch>
      </div>
    );
  }
}

export default App;
