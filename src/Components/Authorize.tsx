import * as React from 'react';
import { saveToken } from './Request';

class Authorize extends React.Component {
  constructor(props: any) {
    super(props);
    if (props.location && props.location.hash) {
      saveToken(props.location.hash).then(
        res => {
          props.history.push('/');
        },
        error => {
          props.history.push('/');
          throw error;
        }
      );
    }
  }

  public render() {
    return <div>Autenticação bem sucedida, retornando para a aplicação.</div>;
  }
}

export default Authorize;
