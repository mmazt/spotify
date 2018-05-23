import * as React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';

import Searchbar from './Search/Searchbar';
import UserInfo from './UserInfo';

const style = require('../styles.css');

const Header = (props: { page: string }) => {
  return (
    <AppBar fixed={true} rightIcon={<UserInfo />}>
      <div className={style.headerContainer}>
        <h1 className={style.title}>Spotify Search</h1>
        <div className={style.searchItems}>
          <Searchbar />
        </div>
      </div>
    </AppBar>
  );
};

export default Header;
