import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import MyStatsPage from './components/MyStatsPage/MyStatsPage';
import MyGameLog from './components/MyGameLogPage/MyGameLogPage';
import NumberOfPlayers from './components/PostAGamePage/NumberOfPlayers'
import GameInfo from './components/PostAGamePage/GameInfo';
import EditGameInfo from './components/EditGameInfo/EditGameInfo'

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Smash Up Stats" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register" // constant file
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/mystats"
          component={MyStatsPage}
        />
        <Route
          path="/mygamelog"
          component={MyGameLog}
        />
        <Route
          path="/postagame/numberofplayers"
          component={NumberOfPlayers}
        />
        <Route
          path="/postagame/gameinfo"
          component={GameInfo}
        />
        <Route
          path="/editgameinfo"
          component={EditGameInfo}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
