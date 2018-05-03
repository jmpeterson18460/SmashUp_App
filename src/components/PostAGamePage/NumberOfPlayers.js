import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
  });

  class NumberOfPlayers extends Component {

    state = {
        selectedOption: ''
    }

    componentDidMount() {
        this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
      }
    
      componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('home');
        }
      }

      handleClick = (event) => {
        this.setState({
            selectedOption: event.target.value
        })
      }

      sendOption = () => {
        let selectedNumber = parseInt(this.state.selectedOption, 10)
        console.log('Selected Number: ', selectedNumber);
        
        
        // this.props.dispatch({
        //   type: 'POST_NUM_OF_PLAYERS',
        //   payload: selectedNumber
        // })
      }

      render(){
        let content = null;

        if (this.props.user.userName) {
          content = (
            <div>
                <h2 className="h2numofplayers">Please select number of players</h2>
              <form className="formnumofplayers">
                <div className="radio">
                    <label>
                        <input type="radio" value="1" checked={this.state.selectedOption === '1'}
                        onClick={this.handleClick}/>
                        2
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" value="2" checked={this.state.selectedOption === '2'} 
                        onClick={this.handleClick}/>
                        3
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" value="3" checked={this.state.selectedOption === '3'}
                        onClick={this.handleClick}/>
                        4
                    </label>
                </div>
            </form>
            <Button variant="raised" color="primary" onClick={this.sendOption}>
            <Link to="/postagame/gameinfo">NEXT</Link></Button>
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

  export default connect(mapStateToProps)(NumberOfPlayers);