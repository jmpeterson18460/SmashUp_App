import React, { Component } from 'react';
import { connect } from 'react-redux';
import BarGraph from '../MyGraph/MyGraph'
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class MyStatsPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
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
            My Stats
          </p>
          <BarGraph/>
          <Button variant="raised" color="primary" className='buttonstyle'>
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
export default connect(mapStateToProps)(MyStatsPage);
