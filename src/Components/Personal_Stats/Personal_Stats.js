import React, { Component } from 'react'
import PersonalPieChart from '../Charts/PersonalPieChart'
import './Personal_Stats.css'
import {connect} from 'react-redux'
import { sidebarToggle } from '../../redux/reducers/sidebarReducer'


export class Personal_Stats extends Component {
   constructor(){
      super()

      this.state = {
         pieChartData:{
            labels:['to do', 'in progress', 'in review', 'complete'],
            datasets:[{
                label: 'Tasks',
                data:[5,10,2,3],
                backgroundColor: [
                'rgb(153,227,225)',
                'rgb(168,134,255)',
                'rgb(255,229,128)',
                'rgb(255,138,99)',
            ]
             }
            ]
        }
      }
   }
   render() {
      return (
         <div className={this.props.toggleSideBar ? 'Personal_Stats' : 'Personal_Stats open'}>
            <div className='chart_container'> 
                    <div className='chart_box'>
                        {this.state.pieChartData.datasets[0].data.length > 3 && 
                        <PersonalPieChart pieChartData={this.state.pieChartData}/>
                        }
                    </div>
                </div>
         </div>
      )
   }
}

function mapStateToProps(state) {
   return {
      toggleSideBar: state.sidebarReducer.toggleSideBar,
   }
}
export default connect(mapStateToProps, { sidebarToggle })(Personal_Stats);