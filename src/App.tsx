import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Authorize from './Components/Authorize';
import Header from './Components/Header';
import MainPage from './Components/Main';
import FavoritesList from './Components/Search/FavoritesList';

import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div>
        {/* Header */}
        <Switch>
          <Route path="/" render={Header} />
        </Switch>
        <Switch>
          {/* Main Page */}
          <Route exact={true} path="/" component={MainPage} />
          {/* Search Header */}
          <Route path="/fav" component={FavoritesList} />
          {/* Authentication */}
          <Route path="/callback/" component={Authorize} />
        </Switch>
      </div>
    );
  }
}

export default App;
