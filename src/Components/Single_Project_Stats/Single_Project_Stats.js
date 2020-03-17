import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2'
import { sidebarToggle } from '../../redux/reducers/sidebarReducer'
import {connect} from 'react-redux'
import './Single_Project_Stats.css'


class Single_Project_Stats extends Component{
    constructor(){
        super()

        this.state = {
            chartData:{
                labels:['to do', 'in progress', 'in review', 'complete'],
                datasets:[{
                    label: 'Completion Rate',
                    data:[ 11, 3, 6, 10, 15],
                    backgroundColor: [
                    'rgba(100, 0, 0, 0.4)',
                    'rgba(100, 100, 0, 0.5)',
                    'rgba(233, 0, 0, 0.6)',
                    'rgba(233, 0, 0, 0.7)',
                ]
                 }
                ]
            }
        }
    }
    render(){
        return(
            <div className={this.props.toggleSideBar ? 'Single_Project_Stats' : 'Single_Project_Stats open'}>
               <div className='chart_container'> 
                    <div className='chart_box'>
                    <Bar
                        data={this.state.chartData}
                        height={100}
                        width={100}
                        options={{   
                        }}
                        />
                    </div>
                </div>
                <div className='chart_container'> 
                    <div className='chart_box'>
                    <Bar
                        data={this.state.chartData}
                        height={100}
                        width={100}
                        options={{   
                        }}
                        />
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
 export default connect(mapStateToProps, { sidebarToggle })(Single_Project_Stats);