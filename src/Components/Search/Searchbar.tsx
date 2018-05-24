import * as React from 'react';
import { Link } from 'react-router-dom';

import Autocomplete from 'react-toolbox/lib/autocomplete';
import { IconButton } from 'react-toolbox/lib/button';
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

export interface IProps {
  nav: any;
  dispatch: any;
  autocomplete: [string];
}

class Searchbar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { term: '', type: 'Album' };
  }

  public render() {
    return (
      <div className={style.searchContainer}>
        <Autocomplete
          label="Search"
          className={style.searchInput}
          floating={false}
          suggestionMatch="anywhere"
          direction="auto"
          multiple={false}
          value={this.state.term}
          onQueryChange={this.changeTerm}
          onChange={this.changeSelection}
          source={this.props.autocomplete}
          showSuggestionsWhenValueIsSet={true}
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
          <div className={style.searchMenuLabel}>{this.state.type}</div>{' '}
          <Link to="/fav">
            <IconButton className={style.searchButton} icon="favorite" />
          </Link>
        </div>
      </div>
    );
  }

  private handleSelect = (type: string) => {
    if (this.state.term) {
      if (type === 'Album') {
        this.props.dispatch(getAlbumsAction(this.state.term));
      }
      if (type === 'Artist') {
        this.props.dispatch(getArtistsAction(this.state.term));
      }
      if (type === 'Track') {
        this.props.dispatch(getTracksAction(this.state.term));
      }
      this.setState({ type });

      if (window.location.href.includes('/fav')) {
        this.props.nav.push('/');
      }
    }
  };

  private search = (e: any) => {
    if (this.state.type === 'Album') {
      this.props.dispatch(getAlbumsAction(this.state.term));
    }
    if (this.state.type === 'Artist') {
      this.props.dispatch(getArtistsAction(this.state.term));
    }
    if (this.state.type === 'Track') {
      this.props.dispatch(getTracksAction(this.state.term));
    }

    if (window.location.href.includes('/fav')) {
      this.props.nav.push('/');
    }
  };

  private changeTerm = (e: any) => {
    this.setState({ term: e });
    if (e.length > 3) {
      this.props.dispatch(autocompleteAction(e, this.state.type));
    }
  };
  private changeSelection = (e: any) => {
    this.setState({ term: e });
    this.search(this.state.type);
  };
}

function mapStateToProps(state: any) {
  return { autocomplete: state.autocompleteReducer };
}

export default connect(mapStateToProps)(Searchbar);
