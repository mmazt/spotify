import * as React from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import { Table, TableCell, TableRow } from 'react-toolbox/lib/table';
const style = require('../../styles.css');

const AlbumCard = (props: {
  open: boolean;
  albums: any;
  data: { name: string; img: string; genres: [string]; popularity: string };
  handleToggle: any;
  country: any;
}) => {
  let albums = props.albums.sort((item1: any, item2: any) => {
    if (new Date(item1.release_date) > new Date(item2.release_date)) {
      return 1;
    } else if (new Date(item1.release_date) < new Date(item2.release_date)) {
      return -1;
    } else {
      return;
    }
  });
  console.log(albums);
  albums = albums.map((item: any) => {
    return (
      <TableRow key={item.id}>
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
          {item.available_markets.indexOf(props.country)
            ? 'Available in your country'
            : 'Not available in your country'}
        </TableCell>
      </TableRow>
    );
  });
  console.log(albums);
  albums = albums.filter((item: any, i: number): any => {
    if (i < 5) {
      return item;
    } else {
      return;
    }
  });
  console.log(albums);
  return (
    <Dialog
      actions={[{ label: 'Close', onClick: props.handleToggle }]}
      active={props.open}
      onEscKeyDown={props.handleToggle}
      onOverlayClick={props.handleToggle}
      type="fullscreen"
    >
      <div className={style.albumContainer}>
        <div className={style.dialogImgContainer}>
          <h2>{props.data.name}</h2>
          <img className={style.dialogImg} src={props.data.img} />
        </div>
        <div className={style.tableContainer}>
          <div className={style.dialogTable}>
            <Table selectable={false}>{albums}</Table>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AlbumCard;
