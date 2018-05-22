import * as React from 'react';
import { TableCell, TableRow } from 'react-toolbox/lib/table';

const TrackCard = (props: {
  key: string;
  img: string;
  name: string;
  artists: [string];
  album: string;
  duration: string;
  link: string;
}) => {
  return (
    <TableRow key={props.key}>
      <TableCell>{/* <img src={props.img} /> */}</TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.artists}</TableCell>
      <TableCell>{props.album}</TableCell>
      <TableCell>{props.duration}</TableCell>
    </TableRow>
  );
};

export default TrackCard;
