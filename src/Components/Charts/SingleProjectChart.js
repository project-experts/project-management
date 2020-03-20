import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2'
import './SingleProjectChart.css'

class SingleProjectChart extends Component{
    constructor(props){
        super(props)


    }
    render(){
        return(
            <div className='bar_container'>
                <Bar
                    data={this.props.chartData}
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
            </div>
        )
    }
}
export default SingleProjectChart