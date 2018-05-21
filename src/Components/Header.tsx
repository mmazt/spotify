import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import Searchbar from './Search/Searchbar';
import UserInfo from './UserInfo';

const Header = (props: { page: string }) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Spotify Search App
        </Typography>
        <Searchbar />
        <UserInfo />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
