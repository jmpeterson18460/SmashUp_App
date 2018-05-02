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
import compose from 'recompose/compose';

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
      single: null,
      multi: null,
      multiLabel: null,
    };

    handleChange = name => value => {
      this.setState({
        [name]: value,
      });
    };

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
        
        const { classes } = this.props;
        let content = null;

        console.log('Suggestions: ', suggestions);
        

        const factions = this.props.state.faction.factionName.map(faction => ({
          value: faction.name,
          label: faction.name
        }));
        console.log('Factions: ', factions);
        

        if (this.props.user.userName) {
          content = (
            <div>
                <h2 className="h2numofplayers">Game Info</h2>
                <p>Player name:<input value={this.props.user.userName}/></p>
                <div >
                  <Input
                    fullWidth
                    inputComponent={SelectWrapped}
                    value={this.state.multi}
                    onChange={this.handleChange('multi')}
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