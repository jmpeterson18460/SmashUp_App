import React, {Component} from 'react';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import Dialogbox from '../DeleteDialogBox/DeleteDialogBox'

const mapStateToProps = state => ({
    user: state.user,
    state
  });

  class MyGames extends Component{

    // state = {
    //     open: false,
    //     game: 0
    //   };
    
    //   handleClickOpen = (gameId) => {
    //     this.setState({ open: true, game: gameId });
    //   };
    
    //   handleClose = () => {
    //     this.setState({ open: false, gameId: 0});
    //   };

    //   delTableBeta = () => {
    //       this.props.dispatch({
    //           type: 'DEL_GAME',
    //           payload: this.state.game
    //       })
    //   }

    //delTable deletes the table clicked on by the user
    delTable = (gameId) => {

        //sends action 'DEL_GAME' and payload of game id to generator function delGame;
        this.props.dispatch({
            type:'DEL_GAME',
            payload: gameId
        })
        
    }

    getGame = (game) => {

        this.props.dispatch({
            type: 'FETCH_GAME',
            payload: game
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
                        </td><td>{game.points}</td><td>{game.rank}</td>
                        <td><IconButton aria-label="Edit"><Link className="edit" to="/editgameinfo"><EditIcon onClick={()=>{this.getGame(game)}}/></Link>
                        </IconButton><IconButton aria-label="Delete">
                        <DeleteIcon value={game.game_id} onClick={()=>{this.delTable(game.game_id)}}/></IconButton></td>
                        </tr>)
            })

            //puts myGame into gameTable
            gameTable.push(myGame)
        }

        //finalTable is an array of tables; these tables contain the player information of
        //each player as rows from a given game
        let finalTable = gameTable.map((table) => {

            //gameTable is an array whose elements are arrays; inside those arrays are table rows
            return(<div><table><thead><tr><th>Players</th><th>Factions</th><th>Points</th><th>Rank</th>
                    <th>Edit/Delete</th></tr></thead><tbody>{table}</tbody></table></div>)
        })

        return (
            <div className = 'organizeTable'>
                {finalTable}
            </div>
            
            

        )
    }

  }


  export default connect(mapStateToProps)(MyGames);