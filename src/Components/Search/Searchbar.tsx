import * as React from 'react';

import { IconButton } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';

import { connect } from 'react-redux';
import { autocompleteAction } from '../../Actions/searchActions';
import {
  getAlbumsAction,
  getArtistsAction,
  getTracksAction
} from '../../Actions/searchActions';
const style = require('../../styles.css');

export interface IState {
  type: string;
  term: string;
}

class Searchbar extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = { term: '', type: 'Album' };
  }

  public render() {
    return (
      <div className={style.searchContainer}>
        <Input
          className={style.searchInput}
          type="text"
          label="Search"
          floating={false}
          value={this.state.term}
          onChange={this.changeTerm}
          onKeyPress={this.search}
        />
        <IconButton
          className={style.searchButton}
          icon="search"
          onClick={this.search}
        />
        <div className={style.searchMenu}>
          <IconMenu
            className={style.inputhMenu}
            icon="more_vert"
            position="topLeft"
            iconRipple={true}
          >
            <MenuItem
              caption="Album"
              onClick={() => this.handleSelect('Album')}
            />
            <MenuItem
              caption="Artist"
              onClick={() => this.handleSelect('Artist')}
            />
            <MenuItem
              caption="Track"
              onClick={() => this.handleSelect('Track')}
            />
          </IconMenu>
          <div className={style.searchMenuLabel}>{this.state.type}</div>
        </div>
      </div>
    );
  }

  private handleSelect = (type: string) => {
    this.setState({ type });
  };

  private search = (e: any) => {
    if (e.key && e.key !== 'Enter') {
      return;
    } else {
      if (this.state.type === 'Album') {
        this.props.dispatch(getAlbumsAction(this.state.term));
      }
      if (this.state.type === 'Artist') {
        this.props.dispatch(getArtistsAction(this.state.term));
      }
      if (this.state.type === 'Track') {
        this.props.dispatch(getTracksAction(this.state.term));
      }
    }
  };

  private changeTerm = (e: any) => {
    if (e.length > 3) {
      this.props.dispatch(autocompleteAction(e, this.state.type));
    }
    this.setState({ term: e });
  };
}

export default connect()(Searchbar);
