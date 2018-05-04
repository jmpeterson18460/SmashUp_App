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

  class NumberOfPlayers extends Component {

    state = {
        selectedOption: 0
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
        // this.props.dispatch({
        //   type: 'SET_NUM_OF_PLAYERS',
        //   payload: this.state.selectedOption
        // })
      }

      sendOption = () => {
        console.log('state: ', this.state.selectedOption);
        
        let selectedNumber = parseInt(this.state.selectedOption, 10)
        console.log('Selected Number: ', selectedNumber);
        
        this.props.dispatch({
          type: 'SET_NUM_OF_PLAYERS',
          payload: selectedNumber
        })
      }

      render(){
        this.sendOption();
        let content = null;
        console.log('state in render: ', this.state.selectedOption);
        
        console.log('Number of Players: ', this.props.state.faction.numOfPlayers);
        

        if (this.props.user.userName) {
          content = (
            <div>
                <h2 className="h2numofplayers">Please select number of players</h2>
              <form className="formnumofplayers">
                <div className="radio">
                    <label>
                        <input type="radio" value="2" checked={this.state.selectedOption === '2'}
                        onClick={this.handleClick}/>
                        2
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" value="3" checked={this.state.selectedOption === '3'} 
                        onClick={this.handleClick}/>
                        3
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" value="4" checked={this.state.selectedOption === '4'}
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