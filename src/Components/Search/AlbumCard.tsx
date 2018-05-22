import * as React from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import { Table, TableCell, TableHead, TableRow } from 'react-toolbox/lib/table';
const style = require('../../styles.css');

const AlbumCard = (props: {
  open: boolean;
  tracks: any;
  data: { name: string; img: string; artist: string };
  handleToggle: any;
  convert: any;
  insertComma: any;
}) => {
  console.log(props.tracks);
  return (
    <Dialog
      actions={[{ label: 'Close', onClick: props.handleToggle }]}
      active={props.open}
      onEscKeyDown={props.handleToggle}
      onOverlayClick={props.handleToggle}
      title={props.data.name + ' - ' + props.data.artist}
      type="fullscreen"
    >
      <div className={style.albumContainer}>
        <img className={style.dialogImg} src={props.data.img} />
        <Table selectable={false}>
          <TableHead>
            <TableCell>Nome</TableCell>
            <TableCell>Artistas</TableCell>
            <TableCell>Duração</TableCell>
          </TableHead>
          {props.tracks.map((item: any) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{props.insertComma(item.artists, true)}</TableCell>
                <TableCell>{props.convert(item.duration_ms)}</TableCell>
              </TableRow>
            );
          })}
        </Table>
      </div>
    </Dialog>
  );
};

export default AlbumCard;
