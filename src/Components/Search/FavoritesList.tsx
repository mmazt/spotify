import * as React from 'react';

import { connect } from 'react-redux';
import { Table, TableCell, TableHead, TableRow } from 'react-toolbox/lib/table';
import { getAllFavorites } from '../Request';

const style = require('../../styles.css');

export interface IProps {
  favorites: {
    tracks: [string];
    albums: [string];
    artists: [string];
    ids: any;
  };
}

class FavoritesList extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    getAllFavorites();
  }

  public render() {
    const artists =
      this.props.favorites &&
      this.props.favorites.artists &&
      this.props.favorites.artists.length > 0
        ? this.props.favorites.artists.map((item: any) => {
            return (
              <TableRow key={item.id}>
                <TableCell>
                  {item.images.length > 0 ? (
                    <img className={style.thumbnail} src={item.images[0].url} />
                  ) : (
                    ''
                  )}
                </TableCell>
                <TableCell>Artist</TableCell>

                <TableCell>{item.name}</TableCell>
              </TableRow>
            );
          })
        : [];
    const tracks =
      this.props.favorites &&
      this.props.favorites.tracks &&
      this.props.favorites.tracks.length > 0
        ? this.props.favorites.tracks.map((item: any) => {
            return (
              <TableRow key={item.id}>
                <TableCell>
                  {item.album.images.length > 0 ? (
                    <img
                      className={style.thumbnail}
                      src={item.album.images[0].url}
                    />
                  ) : (
                    ''
                  )}
                </TableCell>
                <TableCell>Track</TableCell>

                <TableCell>{item.name}</TableCell>
              </TableRow>
            );
          })
        : [];

    const albums =
      this.props.favorites &&
      this.props.favorites.albums &&
      this.props.favorites.albums.length > 0
        ? this.props.favorites.albums.map((item: any) => {
            return (
              <TableRow key={item.id}>
                <TableCell>
                  {item.images.length > 0 ? (
                    <img className={style.thumbnail} src={item.images[0].url} />
                  ) : (
                    ''
                  )}
                </TableCell>
                <TableCell>Album</TableCell>
                <TableCell>{item.name}</TableCell>
              </TableRow>
            );
          })
        : [];

    return (
      <div className={style.main}>
        <div className={style.searchResults}>
          <h2>Favorites:</h2>
          <Table selectable={false}>
            <TableHead>
              <TableCell>{''}</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Name</TableCell>
            </TableHead>
            {artists} {albums}
            {tracks}
          </Table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  const result = {
    favorites: state.favoriteReducer
  };
  return result;
}

export default connect(mapStateToProps)(FavoritesList);
