import { TableCell, TableRow } from '@material-ui/core';
import * as React from 'react';
import { getAlbumTracksAction } from '../../Actions/searchActions';
import * as Index from '../../index';

const AlbumCard = (props: {
  artists: [any];
  availability: boolean;
  img: string;
  key: string;
  link: string;
  name: string;
}) => {
  return (
    <TableRow key={props.key} onClick={() => openModal(props.key)}>
      <TableCell component="th" scope="row">
        <img src={props.img} />
      </TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>
        {props.artists.length > 1 ? 'Various Artists' : props.artists[0].name}
      </TableCell>
      <TableCell>
        {props.availability
          ? 'Available in your country'
          : 'Not available in your country'}
      </TableCell>
    </TableRow>
  );
};

const openModal = (id: any) => {
  Index.store.dispatch(getAlbumTracksAction(id));
};

export default AlbumCard;
