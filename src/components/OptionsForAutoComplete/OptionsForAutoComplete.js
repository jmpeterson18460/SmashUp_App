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

  