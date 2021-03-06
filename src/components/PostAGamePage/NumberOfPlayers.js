import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

//this page will allow the user to select the number of people that played

//allows us to get information from redux state
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

        //changes selectedOption in state to the value of the radio button 
        //clicked on by the user
        this.setState({
            selectedOption: event.target.value
        })
      }

      sendOption = () => {

        //changes the value of the radio button from a string to an integer
        let selectedNumber = parseInt(this.state.selectedOption, 10)
        console.log('Selected Number: ', selectedNumber);

        //sets state of numOfPlayers reducer to value of the selected radio button
        this.props.dispatch({
          type: 'SET_NUM_OF_PLAYERS',
          payload: selectedNumber
        })
        
      }

      render(){
        
        this.sendOption();
        let content = null;
        

        if (this.props.user.userName) {
          content = (
            <div>
                <h2 className="h2numofplayers">Please select number of players</h2>
                
                {/* form of radio buttons where the user will select the number of players
                that played the game */}
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
                      
                      {/* if checked is true, the radio button will be filled in */}
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
            {/* When the button is clicked, it triggers the function sendOption and 
            takes the user to the gameinfo page */}
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
//allows the class NumberOfPlayers to send dispatches to redux
  export default connect(mapStateToProps)(NumberOfPlayers);