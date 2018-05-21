import { TableCell, TableRow } from '@material-ui/core';
import * as React from 'react';
import { getArtistAlbumsAction } from '../../Actions/searchActions';
import * as Index from '../../index';

const ArtistCard = (props: {
  key: string;
  img: string;
  name: string;
  genres: [string];
  popularity: number;
  link: string;
}) => {
  return (
    <TableRow key={props.key} onClick={() => openModal(props.key)}>
      <TableCell component="th" scope="row">
        <img src={props.img} />
      </TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.genres}</TableCell>
      <TableCell>{translatePop(props.popularity)}</TableCell>
    </TableRow>
  );
};

const translatePop = (pop: number) => {
  if (pop >= 80) {
    return 'Hot';
  }
  if (pop >= 60) {
    return 'Cool';
  }
  if (pop >= 30) {
    return 'Regular';
  } else {
    return 'Underground';
  }
};

const openModal = (id: any) => {
  Index.store.dispatch(getArtistAlbumsAction(id));
};

export default ArtistCard;
