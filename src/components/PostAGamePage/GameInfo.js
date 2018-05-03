import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';

import { MenuItem } from 'material-ui/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
    state
  });

  class Option extends React.Component {
    handleClick = event => {
      this.props.onSelect(this.props.option, event);
    };
  
    render() {
      const { children, isFocused, isSelected, onFocus } = this.props;
  
      return (
        <MenuItem
          onFocus={onFocus}
          selected={isFocused}
          onClick={this.handleClick}
          component="div"
          style={{
            fontWeight: isSelected ? 500 : 400,
          }}
        >
          {children}
        </MenuItem>
      );
    }
  }
  
  function SelectWrapped(props) {
    const { classes, ...other } = props;
  
    return (
      <Select
        optionComponent={Option}
        noResultsText={<Typography>{'No results found'}</Typography>}
        arrowRenderer={arrowProps => {
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

  class GameInfo extends Component {

    state = {
      multi: null,
      newInput: {
        playerName: this.props.user.userName,
        factionArray: [],
        points: '',
        rank: '',
        bases: '',
        comments: ''
      }
    };

    handleFactions = name => value => {
      
      if(value.search(',') > 0){
        value = value.split(',');   
        console.log('value: ', value);
        
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
      this.setState({
        newInput: {
          ...this.state.newInput,
          points: parseInt(event.target.value, 10)
        }
      })
    }

    handleRank = (event) => {
      this.setState({
        newInput: {
          ...this.state.newInput,
          selectedOption: parseInt(event.target.value, 10)
        }
      })
    }

    handleBases = (event) => {
      this.setState({
        newInput: {
          ...this.state.newInput,
          bases: event.target.value
        }
      })
    }

    handleComments = (event) => {
      this.setState({
        newInput: {
          ...this.state.newInput,
          comments: event.target.value
        }
      })
    }

    clearAndSendState = () => {
      console.log('Clearing fields and sending state!');

    }

    componentDidMount() {
        this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
        this.props.dispatch({type: 'FETCH_FACTION'})
      }
      
    
      componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('home');
        }
      }

      render(){
        console.log(this.state)
        const { classes } = this.props;
        let content = null;

        const factions = this.props.state.faction.factionName.map(faction => ({
          value: faction.name,
          label: faction.name
        }));
        

        if (this.props.user.userName) {
          content = (
            <div>
                <h2 className="h2numofplayers">Game Info</h2>
                <p>Player name:<input value={this.state.newInput.playerName}/></p>
                <div >
                  <Input
                    fullWidth
                    inputComponent={SelectWrapped}
                    value={this.state.multi}
                    onChange={this.handleFactions('multi')}
                    placeholder="Select 2 factions"
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
                <p>Number of points:<input onChange={this.handlePoints}/></p>
                <div>
                {/* <p className="h2numofplayers">Placement</p>
                  <form className="formnumofplayers">
                    <div className="radio">
                        <label>
                            <input type="radio" value="1" checked={this.state.newInput.rank === '1'}
                            onClick={this.handleRank}/>
                            1st
                        </label>
                        </div>
                        <div className="radio">
                        <label>
                            <input type="radio" value="2" checked={this.state.newInput.rank === '2'} 
                            onClick={this.handleRank}/>
                            2nd
                        </label>
                        </div>
                        <div className="radio">
                        <label>
                            <input type="radio" value="3" checked={this.state.newInput.rank === '3'}
                            onClick={this.handleRank}/>
                            3rd
                        </label>
                        </div>
                        <div className="radio">
                        <label>
                            <input type="radio" value="4" checked={this.state.newInput.rank === '4'}
                            onClick={this.handleRank}/>
                            4th
                        </label>
                        </div>
                  </form> */}
                </div>
                <p>Bases:<textarea className="textarea"/></p>
                <p>Comments:<textarea className="textarea"/></p>
                <Button variant="raised" color="primary" onClick={this.clearAndSendState}/>
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

  export default connect(mapStateToProps)(GameInfo);