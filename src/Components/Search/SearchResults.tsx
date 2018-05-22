import * as React from 'react';

import { connect } from 'react-redux';
import { Table, TableCell, TableHead, TableRow } from 'react-toolbox/lib/table';

import { getData } from '../Request';
import AlbumCard from './AlbumCard';
const style = require('../../styles.css');

export interface IProps {
  options: {
    limit: number;
    offset: number;
    searchMode: string;
    total: number;
  };
  results: {
    artists: [any];
    albums: [any];
    tracks: [any];
  };
  tracks: any;
  country: string;
  dispatch: any;
}

export interface IState {
  results: Array<{}>;
  open: boolean;
  albumData: { name: string; img: string; artist: string };
}

class SearchResults extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      albumData: { name: '', img: '', artist: '' },
      open: false,
      results: [
        <TableRow key="01">
          <TableCell />
          <TableCell>Pesquisa sem resultados</TableCell>
        </TableRow>
      ]
    };
  }

  public componentWillReceiveProps(props: IProps) {
    if (
      (props.results && props.results.artists.length > 0) ||
      (props.results && props.results.albums.length > 0) ||
      (props.results && props.results.tracks.length > 0)
    ) {
      this.setState({ results: this.dataCreator(props) });
    }
  }

  public tableHeader = () => {
    const mode = this.props.options.searchMode;
    if (mode === 'artists') {
      return (
        <TableHead className={style.tableHead}>
          <TableCell>{''}</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Genres</TableCell>
          <TableCell>Popularity</TableCell>
        </TableHead>
      );
    } else if (mode === 'albums') {
      return (
        <TableHead className={style.tableHead}>
          <TableCell>{''}</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Artist</TableCell>
          <TableCell>Availability</TableCell>
        </TableHead>
      );
    } else {
      return (
        <TableHead className={style.tableHead}>
          <TableCell>{''}</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Artist</TableCell>
          <TableCell>Album</TableCell>
          <TableCell>Duration</TableCell>
        </TableHead>
      );
    }
  };

  public insertComma(array: any, track?: boolean) {
    if (array && array.length > 0) {
      return array.map((item: any, i: number) => {
        if (i < array.length - 1) {
          return track ? item.name + ', ' : item + ', ';
        } else {
          return track ? item.name : item;
        }
      });
    } else {
      return '';
    }
  }

  public translatePop = (pop: number) => {
    if (pop >= 80) {
      return 'Hot';
    } else if (pop >= 60) {
      return 'Cool';
    } else if (pop >= 30) {
      return 'Regular';
    } else {
      return 'Underground';
    }
  };

  public convertToMin(ms: number) {
    const min = Math.floor(ms / 60000);
    const sec: string = ((ms % 60000) / 1000).toFixed(0);
    return parseInt(sec, 10) === 60
      ? min + 1 + ':00'
      : min + ':' + (parseInt(sec, 10) < 10 ? '0' : '') + sec;
  }

  public dataCreator(props: IProps) {
    const mode = props.options.searchMode;
    if (mode === 'artists') {
      return props.results.artists.map((item: any) => (
        <TableRow
          className={style.tableRow}
          key={item.id}
          onClick={() => this.openAlbum(item, 'artist')}
        >
          <TableCell>
            {item.images.length > 0 ? (
              <img className={style.thumbnail} src={item.images[0].url} />
            ) : (
              ''
            )}
          </TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{this.insertComma(item.genres)}</TableCell>
          <TableCell>{this.translatePop(item.popularity)}</TableCell>
        </TableRow>
      ));
    } else if (mode === 'albums') {
      return props.results.albums.map((item: any) => (
        <TableRow
          className={style.tableRow}
          key={item.id}
          onClick={() => this.openAlbum(item, 'album')}
        >
          <TableCell>
            {item.images.length > 0 ? (
              <img className={style.thumbnail} src={item.images[0].url} />
            ) : (
              ''
            )}
          </TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>
            {item.artists.length > 1 ? 'Various Artists' : item.artists[0].name}
          </TableCell>
          <TableCell>
            {item.available_markets.indexOf(this.props.country)
              ? 'Available in your country'
              : 'Not available in your country'}
          </TableCell>
        </TableRow>
      ));
    } else {
      return props.results.tracks.map((item: any) => (
        <TableRow className={style.tableRow} key={item.id}>
          <TableCell>
            {item.album.images.length > 0 ? (
              <img className={style.thumbnail} src={item.album.images[0].url} />
            ) : (
              ''
            )}
          </TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{this.insertComma(item.artists, true)}</TableCell>
          <TableCell>{item.album.name}</TableCell>
          <TableCell>{this.convertToMin(item.duration_ms)}</TableCell>
        </TableRow>
      ));
    }
  }
  public openAlbum: any = (item: any, type: string) => {
    getData(item.id, type).then(() => {
      if (type === 'album') {
        this.setState({
          albumData: {
            artist:
              item.artists.length > 1
                ? 'Various Artists'
                : item.artists[0].name,
            img: item.images.length > 0 ? item.images[0].url : '',
            name: item.name
          }
        });
      }
      setTimeout(() => this.setState({ open: true }), 100);
    });
  };

  public handleToggle: any = () => {
    this.setState({ open: !this.state.open });
  };

  public render() {
    const header =
      this.props.options && this.props.options.searchMode ? (
        this.tableHeader()
      ) : (
        <TableHead>
          <TableCell />
        </TableHead>
      );
    return (
      <div>
        <Table selectable={false}>
          {header}
          {this.state.results}
        </Table>

        <AlbumCard
          open={this.state.open}
          data={this.state.albumData}
          tracks={this.props && this.props.tracks ? this.props.tracks : []}
          handleToggle={this.handleToggle}
          convert={this.convertToMin}
          insertComma={this.insertComma}
        />
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  console.log(state);
  const result = {
    country: state.userDataReducer.country,
    options: state.searchOptionsReducer,
    results: state.searchReducer,
    tracks: state.albumReducer
  };
  return result;
}

export default connect(mapStateToProps)(SearchResults);
