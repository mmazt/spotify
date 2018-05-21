import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
import { connect } from 'react-redux';
import AlbumCard from './AlbumCard';
import ArtistCard from './ArtistCard';
import TrackCard from './TrackCard';

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
  country: string;
}

class SearchResults extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    console.log(props);
  }

  public tableHeader = () => {
    const mode = this.props.options.searchMode;
    if (mode === 'artists') {
      return (
        <TableRow>
          <TableCell />
          <TableCell>Name</TableCell>
          <TableCell>Genres</TableCell>
          <TableCell>Popularity</TableCell>
        </TableRow>
      );
    } else if (mode === 'albums') {
      return (
        <TableRow>
          <TableCell />
          <TableCell>Name</TableCell>
          <TableCell>Artist</TableCell>
          <TableCell>Availability</TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow>
          <TableCell />
          <TableCell>Name</TableCell>
          <TableCell>Artist</TableCell>
          <TableCell>Album</TableCell>
          <TableCell>Duration</TableCell>
        </TableRow>
      );
    }
  };
  public filterImage(imgArray: [any]) {
    if (imgArray.length > 0) {
      return imgArray.reduce((x: any, y: any) => {
        if (x.height < y.height) {
          return x.url;
        } else {
          return y.url;
        }
      });
    }
  }

  public insertComma(array: any) {
    if (array && array.length > 0) {
      return array.map((item: any, i: number) => {
        if (i < array.length - 1) {
          return item + ', ';
        } else {
          return item;
        }
      });
    }
  }

  public dataCreator() {
    const mode = this.props.options.searchMode;
    if (mode === 'artists') {
      return this.props.results.artists.map(item => (
        <ArtistCard
          key={item.id}
          name={item.name}
          img={this.filterImage(item.images)}
          genres={this.insertComma(item.genres)}
          popularity={item.popularity}
          link={item.href}
        />
      ));
    } else if (mode === 'albums') {
      return this.props.results.albums.map(item => (
        <AlbumCard
          key={item.id}
          name={item.name}
          img={this.filterImage(item.images)}
          artists={item.artists}
          availability={item.available_markets.indexOf(this.props.country) > -1}
          link={item.href}
        />
      ));
    } else {
      return this.props.results.tracks.map(item => (
        <TrackCard
          key={item.id}
          name={item.name}
          img={this.filterImage(item.album.images)}
          artists={this.insertComma(item.artist)}
          album={item.album.name}
          duration={item.duration}
          link={item.href}
        />
      ));
    }
  }

  public render() {
    const header =
      this.props.options && this.props.options.searchMode
        ? this.tableHeader()
        : [];
    const data =
      (this.props.results && this.props.results.artists.length > 0) ||
      (this.props.results && this.props.results.albums.length > 0) ||
      (this.props.results && this.props.results.tracks.length > 0)
        ? this.dataCreator()
        : [];
    console.log(data, header);
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>{header}</TableRow>
          </TableHead>
          <TableBody>{data}</TableBody>
        </Table>
      </Paper>
    );
  }
}

function mapStateToProps(state: any) {
  const result = {
    country: state.userDataReducer.country,
    options: state.searchOptionsReducer,
    results: state.searchReducer
  };
  return result;
}

export default connect(mapStateToProps)(SearchResults);
