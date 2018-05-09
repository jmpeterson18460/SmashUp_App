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

    //     for(let gameId of this.props.state.faction.gameId){
    //         this.props.dispatch({
    //             type:'FETCH_MY_GAMES',
    //             payload: gameId
    //         })
    //     }
    // }

    // getGamesWithId = (gameId) => {
    //     this.props.dispatch({
    //         type: 'FETCH_MY_GAMES',
    //         payload: gameId
    //     })
    // }
      
    render(){
        

        // let myGames = this.props.state.faction.gameId.map((gameId) => {
        //     console.log('gameId: ', gameId);
            
        //     this.getGamesWithId(gameId);
        //     console.log('games: ', this.props.state.faction.myGames);
            
            
        //     return this.props.state.faction.myGames
        // })

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
        
        
        //     for(let games of gameArray){
        //         myGame = games.map((game) => {
        //             return(<table><thead><tr><th>Players</th><th>Factions</th><th>Points</th><th>Rank</th></tr>
        //             </thead><tbody><tr key={game.id}><td>{game.player_name}</td><td>{game.faction1}/{game.faction2}
        //                 </td><td>{game.points}</td><td>{game.rank}</td></tr>)
        //         })
        //     }
        //     // myGame = gameArray.map((game) => {
        //         return (<tr key={game[i].id}><td>{game[i].player_name}</td><td>{game[i].faction1}/{game[i].faction2}
        //             </td><td>{game[i].points}</td><td>{game[i].rank}</td></tr>)
        //     })

        // let myGames = gameArray.map((game) => {
        //     return <tr key={game.id}><td>{game.player_name}</td><td>{game.faction1}/{game.faction2}
        //     </td><td>{game.points}</td><td>{game.rank}</td></tr>
        //   })

        return (
            <div>
                {finalTable}
            </div>
        )
    }

  }


  export default connect(mapStateToProps)(MyGames);