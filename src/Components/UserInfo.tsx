import * as React from 'react';
import { connect } from 'react-redux';
import Avatar from 'react-toolbox/lib/avatar';
const style = require('../styles.css');

class UserInfo extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className={style.userContainer}>
        {this.props.image ? (
          <Avatar
            alt={this.props.name ? this.props.name : 'No Name'}
            image={this.props.image}
            cover={true}
            //   className={classes.avatar}
          />
        ) : (
          ''
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
