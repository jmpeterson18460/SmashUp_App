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

      render(){
        let content = null;

        if (this.props.user.userName) {
          content = (
            <div>
                <h2 className="h2numofplayers">Please select number of players</h2>
              <form className="formnumofplayers">
                <div className="radio">
                    <label>
                        <input type="radio" value="option1" checked={this.state.selectedOption === 'option1'}
                        onClick={this.handleClick}/>
                        2
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" value="option2" checked={this.state.selectedOption === 'option2'} 
                        onClick={this.handleClick}/>
                        3
                    </label>
                    </div>
                    <div className="radio">
                    <label>
                        <input type="radio" value="option3" checked={this.state.selectedOption === 'option3'}
                        onClick={this.handleClick}/>
                        4
                    </label>
                </div>
            </form>
            <Button variant="raised" color="primary">
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