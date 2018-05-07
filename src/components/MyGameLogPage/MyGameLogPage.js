import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

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

    let myGames = this.props.state.faction.myGames.map((game) => {
      return <tr key={game.id}><td>{game.player_name}</td><td>{game.faction1}/{game.faction2}
      </td><td>{game.points}</td><td>{game.rank}</td></tr>
    })

    if (this.props.user.userName) {
      content = (
        <div>
          <p>
            My Games
          </p>
          <table>
            <thead>
              <tr>
                <th>Players</th><th>Factions</th><th>Points</th><th>Rank</th>
              </tr>
            </thead>
            <tbody>
              {myGames}
            </tbody>
          </table>
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
