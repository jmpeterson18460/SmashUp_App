import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BarGraph from '../MainGraph/MainGraph'

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import Button from 'material-ui/Button';

//allows us to get information from redux state
const mapStateToProps = state => ({
  user: state.user,
  state
});



class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          {/* Displays welcome message with user name */}
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }! 
          </h1>

          <BarGraph/>

          {/* When clicked, the user will be brought to the numberofplayers page */}
          <Button variant="raised" color="primary" >
          <Link to="/postagame/numberofplayers">Post a Game!</Link></Button>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

