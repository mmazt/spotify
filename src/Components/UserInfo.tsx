import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import * as React from 'react';
import { connect } from 'react-redux';

class UserInfo extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        {this.props.image ? (
          <Avatar
            alt={this.props.name ? this.props.name : 'No Name'}
            src={this.props.image}
            //   className={classes.avatar}
          />
        ) : (
          ''
        )}
        {this.props.name ? (
          <a href={this.props.url}>
            <Typography>{this.props.name}</Typography>
          </a>
        ) : (
          <p>Not logged in</p>
        )}
      </div>
    );
  }
}

export interface IMapState {
  userDataReducer: {
    name: string;
    image: string;
    url: string;
  };
}

function mapStateToProps(state: IMapState) {
  return state.userDataReducer;
}

export default connect(mapStateToProps)(UserInfo);
