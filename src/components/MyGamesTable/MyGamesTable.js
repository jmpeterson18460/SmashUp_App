import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.user,
    state
  });

  

  export default connect(mapStateToProps)(myGames);