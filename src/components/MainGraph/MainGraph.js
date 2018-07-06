import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2';
import { connect } from 'react-redux';



  const mapStateToProps = state => ({
    user: state.user,
    state
  });
  
  class MainBarGraph extends Component{

    componentDidMount(){
      this.props.dispatch({
        type:'FETCH_FACTION_RANK'
      })
    }

    
    
  
    render() {

      let topFactions = this.props.state.faction.factionRank

      const data = {
        labels: [topFactions[0] && topFactions[0].name, topFactions[1] && topFactions[1].name, topFactions[2] && topFactions[2].name, topFactions[3] && topFactions[3].name, topFactions[4] && topFactions[4].name],
        datasets: [
          {
            label: 'Winning percentage',
            backgroundColor: 'rgba(255,99,132,1)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,1)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [topFactions[0] && topFactions[0].wins, topFactions[1] && topFactions[1].wins, topFactions[2] && topFactions[2].wins, topFactions[3] && topFactions[3].wins, topFactions[4] && topFactions[4].wins]
          }
        ]
      };
      
      return (
        <div>
          <h2>Current Top Factions</h2>
          <Bar
            data={data}
            width={10}
            height={400}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>
      );
    }
  };
  export default connect(mapStateToProps)(MainBarGraph);