import * as React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';

import Searchbar from './Search/Searchbar';
import UserInfo from './UserInfo';

const style = require('../styles.css');

const Header = (props: any) => {
  return (
    <AppBar
      leftIcon={
        <img height="100%" style={{ marginRight: '5px' }} src="logo.svg" />
      }
      fixed={true}
      rightIcon={<UserInfo />}
    >
      <div className={style.headerContainer}>
        <div className={style.searchItems}>
          <Searchbar nav={props.history} />
        </div>
      </div>
    </AppBar>
  );
};

export default Header;
