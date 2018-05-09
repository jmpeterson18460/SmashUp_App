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

        //gameArray is an array whose elements are arrays; these array elements 
        //contain games logged by the user
        let gameArray = this.props.state.faction.gameId.map((gameId) => {
            const gameIdTest = (item => item.game_id === gameId.id)
            let newArray = this.props.state.faction.myGames.filter(gameIdTest)
            return newArray
        })
        console.log('gameArray: ', gameArray);

        let gameTable = [];

        for(let games of gameArray){
            let myGame = games.map((game) => {
                return (<tr key={game.id}><td>{game.player_name}</td><td>{game.faction1} / {game.faction2}
                        </td><td>{game.points}</td><td>{game.rank}</td></tr>)
            })
            gameTable.push(myGame)
        }

        let finalTable = gameTable.map((table) => {
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