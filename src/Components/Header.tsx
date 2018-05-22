import * as React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';

import Searchbar from './Search/Searchbar';
import UserInfo from './UserInfo';

const style = require('../styles.css');

const Header = (props: { page: string }) => {
  return (
    <AppBar title="Spotify Search App" fixed={true} rightIcon={<UserInfo />}>
      <div className={style.headerSearch}>
        <Searchbar />
      </div>
    </AppBar>
  );
};

export default Header;
