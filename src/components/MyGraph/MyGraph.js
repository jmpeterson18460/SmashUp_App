import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2';

const data = {
    labels: ['Pirates', 'Mythic Horses', 'Dragons', 'Wizards', 'Aliens'],
    datasets: [
      {
        label: 'Winning percentage',
        backgroundColor: 'rgba(255,99,132,1)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [81, 76, 50, 38, 22]
      }
    ]
  };
  
  class MainBarGraph extends Component{
    
  
    render() {
      return (
        <div>
          <h2>Current Top Factions From My Games</h2>
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
  export default MainBarGraph