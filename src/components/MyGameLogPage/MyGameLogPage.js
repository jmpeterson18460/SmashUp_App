import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import MyGames from '../MyGamesTable/MyGamesTable'

const mapStateToProps = state => ({
  user: state.user,
  state
});

class MyGameLogPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});

    this.props.dispatch({
      type: 'FETCH_MY_GAMES'
    })
  }

  componentDidUpdate() {

    //checks to see if the user is still logged in
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <p>
            My Games
          </p>
          <MyGames/>
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
export default connect(mapStateToProps)(MyGameLogPage);
