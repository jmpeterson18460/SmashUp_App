import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { triggerLogout } from '../../redux/actions/loginActions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
});

class NavBar extends Component {

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }


  render(){
    return(
        <div className="navbar">
          <div>
            <ul>
              <li>
                <Link to="/user">
                  User Home
                </Link>
              </li>
              <li>
                <Link to="/mystats">
                  MyStats
                </Link>
              </li>
              <li>
                <Link to="/mygamelog">
                  MyGameLog
                </Link>
              </li>
              <li onClick={this.logout}>
                <Link to="/home">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
  }

}



export default connect(mapStateToProps)(NavBar);
