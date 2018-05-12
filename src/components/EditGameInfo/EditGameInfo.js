import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';


import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Option from '../OptionsForAutoComplete/OptionsForAutoComplete'

//this page is where the user will enter in all of the information about the game
//of Smash Up that he or she just played

//allows us to get information from redux state
const mapStateToProps = state => ({
    user: state.user,
    state
  });

//Brings in the component Option
<Option/>
  
  //this function will display the faction names in the autocomplete box and convert
  //the selected factions to chips. The user will also be able to delete a chip they
  //have selected
  function SelectWrapped(props) {
    const { classes, ...other } = props;
  
    return (
      <Select
        optionComponent={Option}
        noResultsText={<Typography>{'No results found'}</Typography>}
        arrowRenderer={arrowProps => {

          //brings in dropup and dropdown arrow icon
          return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
        }}
        clearRenderer={() => <ClearIcon />}
        valueComponent={valueProps => {
          const { value, children, onRemove } = valueProps;
  
          const onDelete = event => {
            event.preventDefault();
            event.stopPropagation();
            onRemove(value);
          };
  
          if (onRemove) {

            //deletes the chip if the user clicks on the 'x' in the chip icon
            //or if the user hits the delete button on their device
            return (
              <Chip
                tabIndex={-1}
                label={children}
                
                deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
                onDelete={onDelete}
              />
            );
          }
  
          return <div className="Select-value">{children}</div>;
        }}
        {...other}
      />
    );
  }

  class EditGameInfo extends Component {

    state = {
      multi: null,
      // numOfPlayers: this.props.state.faction.numOfPlayers,
      count: 1,
      newInput: {
        game_id: 0,
        playerName: this.props.user.userName,
        factionArray: [],
        points: '',
        rank: '',
        bases: '',
        comments: ''
      }
    };

    handleName = (event) => {
      
      //sets playerName in state to what the user entered
      this.setState({
        ...this.state,
        newInput: {
          ...this.state.newInput,
          playerName: event.target.value
        }
      })
    }

    handleFactions = name => value => {
      
      //value is a string; this string consists of the names of the factions selected by the user
      //from the autocomplete box. The ids are separated by a comma e.g. 'aliens,robots'

      //convert value into an array where the elements are the selected faction names; these
      //elements are of type string
      if(value.search(',') > 0){
        value = value.split(',');  
        
        //changes factionArray to an array of the faction names
        this.setState({
          ...this.state,
          [name]:value,
          newInput: {...this.state.newInput,
            factionArray: value
          }
        })
      }
      else{
        this.setState({
          [name]:value
        })
      }
    };

    handlePoints = (event) => {

      //sets the points in state to the points the user entered; points is 
      //of type integer
      this.setState({
        ...this.state,
        newInput: {
          ...this.state.newInput,
          points: parseInt(event.target.value, 10)
        }
      })
    }

    //sets the rank in state to the rank the user entered; rank is 
      //of type integer
    handleRank = (event) => {
      this.setState({
        ...this.state,
        newInput: {
          ...this.state.newInput,
          rank: event.target.value
        }
      })
    }

    //sets the bases in state to the text entered by the user
    handleBases = (event) => {
      this.setState({
        ...this.state,
        newInput: {
          ...this.state.newInput,
          bases: event.target.value
        }
      })
    }

    //sets the comments in state to the text entered by the user
    handleComments = (event) => {
      this.setState({
        ...this.state,
        newInput: {
          ...this.state.newInput,
          comments: event.target.value
        }
      })
    }

    //sends a dispatch to the postGameInfo generator function in the factionSaga
    //with action 'POST_GAME_INFO' and payload of the newInput object in state;
    //postGameInfo will then send a post request to the server with the newInput object;
    //clearAndSendState also clears the property values in the newInput object in state;
    //Once the user has created a game, this function will then send all subsequent dispatches
    //to the postGameInfoWGameId generator function in the factionSaga with action
    //'POST_GAME_INFO_W_GAME_ID' and payload of the newInput object in state; this will allow
    //the user to submit the information of the other players to the game the user just created; 
    //if this were not here, then when the user would enter in the information of the other players,
    //that information would create a new game for each player
    clearAndUpdateGame = () => {
      if(this.state.count < this.props.state.faction.singleGame.length){

        // this.props.dispatch({
        //   type: 'EDIT_GAME',
        //   payload: this.state.newInput
        // })

        this.setState({
          multi: null,
          count: this.state.count + 1,
          newInput: {
            game_id: this.props.state.faction.singleGame[this.state.count].game_id,
            playerName: this.props.state.faction.singleGame[this.state.count].player_name,
            factionArray: [],
            points: this.props.state.faction.singleGame[this.state.count].points,
            rank: '',
            bases: '',
            comments: ''
          }
        }) 
      } else{
        // this.props.dispatch({
        //   type: 'EDIT_GAME',
        //   payload: this.state.newInput
        // })
      }
    }

    componentDidMount() {
        this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
        this.props.dispatch({type: 'FETCH_FACTION'})
      }

      componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          newInput: {
            ...this.state.newInput,
            game_id: nextProps.state.faction.singleGame[0].game_id,
            playerName: nextProps.state.faction.singleGame[0].player_name,
            points: nextProps.state.faction.singleGame[0].points,
            bases: nextProps.state.faction.singleGame[0].bases,
            comments: nextProps.state.faction.singleGame[0].comments
          }
        })
      }
      
    
      componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('home');
        }
      }

      render(){

        const { classes } = this.props;
        let content = null;
        let nextButton;
        let bases;
        let comments;
        

        //factions is an array that contains all the entries from the faction table
        //in the database. Each entry is an object with the faction id and faction name
        const factions = this.props.state.faction.factionName.map(faction => ({
          value: faction.name,
          label: faction.name
        }));

        //once the user has entered in the information for each player, the submit
        //button will appear and take the user to the MyGameLogPage
        if(this.state.count < this.props.state.faction.singleGame.length){
          nextButton = <Button variant="raised" color="primary" onClick={this.clearAndUpdateGame}>NEXT</Button>
        } else{
          nextButton = <Button variant="raised" color="primary" onClick={this.clearAndUpdateGame}>
          <Link to="/mygamelog">SUBMIT</Link></Button>
        }

        if(this.state.count === 1){
          bases = <p>Bases:<textarea className="textarea" value={this.state.newInput.bases} 
          onChange={this.handleBases}/></p>

          comments = <p>Comments:<textarea className="textarea" value={this.state.newInput.comments} 
          onChange={this.handleComments}/></p>
        }
        
        
        //content will only be assigned if the user is still logged in
        if (this.props.user.userName) {
          content = (
            <div>
                <h2 className="h2numofplayers">Game Info</h2>

                {/* the first time this page is accessed, this input field will be 
                automatically filled with the user's user name; after the user clicks
                the next button, this input field will be empty */}
                <p>Player name:<input value={this.state.newInput.playerName} onChange={this.handleName}/></p>
                <div >

                  {/* this is the autocomplete box */}
                  <Input
                    fullWidth
                    inputComponent={SelectWrapped}
                    value={this.state.multi}
                    onChange={this.handleFactions('multi')}
                    placeholder="Please re-enter your factions"
                    name="react-select-chip"
                    inputProps={{
                      classes,
                      multi: true,
                      instanceId: 'react-select-chip',
                      id: 'react-select-chip',
                      simpleValue: true,
                      options: factions,
                    }}
                  />
                </div>

                {/* input field for the number of points scored; changes state when the 
                user types in the number of points */}
                <p>Number of points:<input value={this.state.newInput.points} onChange={this.handlePoints}/></p>
                <div>
                <p className="h2numofplayers">Placement</p>

                {/* form of radio buttons where the user will select what place
                that player ranked; changes state when the user selects an option */}
                  <form className="formnumofplayers">
                    <div className="radio">
                        <label>
                          {/* if checked is true, the radio button will be filled in */}
                            <input type="radio" value="1st" checked={this.state.newInput.rank === '1st'}
                            onClick={this.handleRank}/>
                            1st
                        </label>
                        </div>
                        <div className="radio">
                        <label>
                            <input type="radio" value="2nd" checked={this.state.newInput.rank === '2nd'} 
                            onClick={this.handleRank}/>
                            2nd
                        </label>
                        </div>
                        <div className="radio">
                        <label>
                            <input type="radio" value="3rd" checked={this.state.newInput.rank === '3rd'}
                            onClick={this.handleRank}/>
                            3rd
                        </label>
                        </div>
                        <div className="radio">
                        <label>
                            <input type="radio" value="4th" checked={this.state.newInput.rank === '4th'}
                            onClick={this.handleRank}/>
                            4th
                        </label>
                        </div>
                  </form>
                </div>

                <div>

                    {/* Here the user enters which bases were used for the game; changes
                    state when the user types in the bases that were used */}
                    {bases}

                    {/* Here the user can enter any comments they want to add about the game;
                    changes state when the user types in any comments */}
                    {comments}
                </div>
                <p>{nextButton}</p>
                
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

  //allows the class GameInfo to send dispatches to redux
  export default connect(mapStateToProps)(EditGameInfo);