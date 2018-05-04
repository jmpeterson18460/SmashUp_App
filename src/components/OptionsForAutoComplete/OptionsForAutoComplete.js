import React, { Component } from 'react';
import { MenuItem } from 'material-ui/Menu';

import 'react-select/dist/react-select.css';

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

export default Option  