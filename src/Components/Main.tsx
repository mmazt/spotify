import * as React from 'react';
import Dialog from 'react-toolbox/lib/dialog';

import { authorize, checkAuthorization } from './Request';
import Searchbar from './Search/Searchbar';
import SearchResults from './Search/SearchResults';

interface IState {
  actions: Array<{ label: string; onClick: () => void }>;
  authorized: boolean;
  open: boolean;
}

class MainPage extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      actions: [
        { label: 'Cancel', onClick: this.handleClose },
        { label: 'Agree', onClick: this.authorization }
      ],
      authorized: false,
      open: false
    };
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
          actions={this.state.actions}
          active={this.state.open}
          onEscKeyDown={this.handleClose}
          onOverlayClick={this.handleClose}
          title="Credentials Needed"
        >
          <p>
            {' '}
            To continue, it's necessary to authorize the use of your credentials
            in the Spotify app. After that, you will be redirected back here.
          </p>
        </Dialog>
        <Searchbar />
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
