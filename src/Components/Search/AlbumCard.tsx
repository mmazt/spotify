import * as React from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import { Table, TableCell, TableRow } from 'react-toolbox/lib/table';
const style = require('../../styles.css');

const AlbumCard = (props: {
  open: boolean;
  tracks: any;
  data: { name: string; img: string; artist: string };
  handleToggle: any;
  convert: any;
  insertComma: any;
}) => {
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
          <h2>
            {props.data.name} - {props.data.artist}
          </h2>
          <img className={style.dialogImg} src={props.data.img} />
        </div>
        <div className={style.tableContainer}>
          <div className={style.dialogTable}>
            <Table selectable={false}>
              {props.tracks.map((item: any) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {props.insertComma(item.artists, true)}
                    </TableCell>
                    <TableCell>{props.convert(item.duration_ms)}</TableCell>
                  </TableRow>
                );
              })}
            </Table>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AlbumCard;
