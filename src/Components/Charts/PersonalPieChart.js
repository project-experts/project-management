import React, {Component} from 'react'
import {Pie} from 'react-chartjs-2'
import axios from 'axios'


class PersonalPieChart extends Component{
    constructor(){
        super()

        this.state = {

        }
    }

    render(){
        return(
            <Pie
                data={this.props.pieChartData}
                height={20}
                width={20}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                    stepSize: 2
                                }
                            }]
                        }
                    }}
                />
        )
    }
}
export default PersonalPieChart