import { TableCell, TableRow } from '@material-ui/core';
import * as React from 'react';

const AlbumCard = (props: {
  artists: [any];
  availability: boolean;
  img: string;
  key: string;
  link: string;
  name: string;
  onClick: any;
}) => {
  return (
    <TableRow key={props.key} onClickCapture={props.onClick}>
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

export default AlbumCard;
