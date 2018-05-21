import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as React from 'react';

import { authorize, checkAuthorization } from './Request';
import SearchResults from './Search/SearchResults';

interface IState {
  authorized: boolean;
  open: boolean;
}

class MainPage extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = { authorized: false, open: false };
  }
  public componentWillMount() {
    checkAuthorization().then(response => {
      if (response) {
        this.setState({ authorized: true });
      } else {
        this.setState({ authorized: false, open: true });
      }
    });
  }
  public render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Credentials Needed'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              To continue, it's necessary to authorize the use of your
              credentials in the Spotify app. After that, you will be redirected
              back here.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button
              onClick={this.authorization}
              color="primary"
              autoFocus={true}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <SearchResults />
      </div>
    );
  }
  private authorization = () => {
    window.location.href = authorize();
  };

  private handleClose = () => {
    this.setState({ open: false });
  };
}

export default MainPage;
