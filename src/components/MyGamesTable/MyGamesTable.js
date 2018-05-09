import React, {Component} from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.user,
    state
  });

  class MyGames extends Component{

    componentDidMount() {
        this.props.dispatch({
            type:'FETCH_GAME_ID'
        })

        this.props.dispatch({
            type: 'FETCH_MY_GAMES'
          })
    }
      
    render(){

        //gameArray is an array whose elements are arrays; the elements of those arrays 
        //contain the game information of each player from a given game
        let gameArray = this.props.state.faction.gameId.map((gameId) => {
            //this.props.state.faction.gameId.map maps over an array of game
            //ids from the database

            //gameIdTest is the conditional that compares the game id from the array
            //of game ids to the game id of a game from the database
            const gameIdTest = (item => item.game_id === gameId.id)

            //newArray is an array of game information of each player from
            //the same game
            let newArray = this.props.state.faction.myGames.filter(gameIdTest)
            return newArray
        })

        let gameTable = [];

        //the result of this for loop will be the array gameTable whose elements are arrays;
        //inside those arrays are table rows
        for(let games of gameArray){

            //myGame is an array of table rows
            let myGame = games.map((game) => {

            //games is an array from gameArray whose elements are the game information of each
            //player that played that game
                return (<tr key={game.id}><td>{game.player_name}</td><td>{game.faction1} / {game.faction2}
                        </td><td>{game.points}</td><td>{game.rank}</td></tr>)
            })

            //puts myGame into gameTable
            gameTable.push(myGame)
        }

        //finalTable is an array of tables; these tables contain the player information of
        //each player as rows from a given game
        let finalTable = gameTable.map((table) => {

            //gameTable is an array whose elements are arrays; inside those arrays are table rows
            return(<table><thead><tr><th>Players</th><th>Factions</th><th>Points</th><th>Rank</th>
                    </tr></thead><tbody>{table}</tbody></table>)
        })

        return (
            <div>
                {finalTable}
            </div>
        )
    }

  }


  export default connect(mapStateToProps)(MyGames);