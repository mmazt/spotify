import * as React from 'react';
import { connect } from 'react-redux';
import Dialog from 'react-toolbox/lib/dialog';

import { authorize, checkAuthorization, getAllFavorites } from './Request';
import SearchResults from './Search/SearchResults';
const style = require('../styles.css');

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
        getAllFavorites();
      } else {
        this.setState({ authorized: false, open: true });
      }
    });
  }

  public render() {
    return (
      <div className={style.main}>
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
        {this.props.search ? (
          <SearchResults />
        ) : (
          <div className={style.notFound}>Item não encontrado</div>
        )}
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

function mapStateToProps(state: any) {
  const results = state.searchReducer;
  if (
    (results && results.artists.length > 0) ||
    (results && results.albums.length > 0) ||
    (results && results.tracks.length > 0)
  ) {
    return { search: true };
  } else {
    return { search: false };
  }
}

export default connect(mapStateToProps)(MainPage);
