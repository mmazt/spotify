import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import * as React from 'react';
import { connect } from 'react-redux';
import { autocompleteAction } from '../../Actions/searchActions';
import {
  getAlbumsAction,
  getArtistsAction,
  getTracksAction
} from '../../Actions/searchActions';

export interface IState {
  type: string;
  term: string;
  element: any;
}

class Searchbar extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = { term: '', type: 'Album', element: null };
  }

  public render() {
    return (
      <div>
        <Menu
          id="simple-menu"
          anchorEl={this.state.element}
          open={Boolean(this.state.element)}
          onClose={() => this.handleClose()}
        >
          <MenuItem onClick={() => this.handleClose('Album')}>Album</MenuItem>
          <MenuItem onClick={() => this.handleClose('Artist')}>Artist</MenuItem>
          <MenuItem onClick={() => this.handleClose('Track')}>Track</MenuItem>
        </Menu>
        <TextField value={this.state.term} onChange={this.changeTerm} />
        <Button onClick={this.search}>Search</Button>
        <Button
          // aria-owns={this.state.element ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Search for: {this.state.type}
        </Button>
      </div>
    );
  }

  private handleClick = (e: any) => {
    this.setState({ element: e.currentTarget });
  };

  private handleClose = (type?: string) => {
    if (type) {
      this.setState({ element: null, type });
    } else {
      this.setState({ element: null });
    }
  };

  private search = () => {
    if (this.state.type === 'Album') {
      this.props.dispatch(getAlbumsAction(this.state.term));
    }
    if (this.state.type === 'Artist') {
      this.props.dispatch(getArtistsAction(this.state.term));
    }
    if (this.state.type === 'Track') {
      this.props.dispatch(getTracksAction(this.state.term));
    }
  };

  private changeTerm = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 3) {
      this.props.dispatch(
        autocompleteAction(e.currentTarget.value, this.state.type)
      );
    }
    this.setState({ term: e.currentTarget.value });
  };
}

export default connect()(Searchbar);
