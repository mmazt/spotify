import * as React from 'react';
import { TableCell, TableRow } from 'react-toolbox/lib/table';

const ArtistCard = (props: {
  key: string;
  img: string;
  name: string;
  genres: [string];
  popularity: number;
  link: string;
}) => {
  return (
    <TableRow key={props.key}>
      <TableCell>{/* <img src={props.img} /> */}</TableCell>
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

export default ArtistCard;
