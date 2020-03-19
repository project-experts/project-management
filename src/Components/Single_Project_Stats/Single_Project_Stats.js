import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2'
import { sidebarToggle } from '../../redux/reducers/sidebarReducer'
import {connect} from 'react-redux'
import './Single_Project_Stats.css'
import axios from 'axios'


class Single_Project_Stats extends Component{
    constructor(){
        super()

        this.state = {
            chartData:{
                labels:['to do', 'in progress', 'in review', 'complete'],
                datasets:[{
                    label: 'Completion Rate',
                    data:[],
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
    componentDidMount(){
        console.log(this.props.match.params.project_id)
        axios.get(`/api/countTodoTask/${this.props.match.params.project_id}`).then(res => {
            console.log(res.data[0].count)
            let chartData = {...this.state.chartData}
            console.log(chartData)
            chartData.datasets[0].data.push(+res.data[0].count)
            this.setState({
                chartData: chartData
            })
            axios.get(`/api/countInProgressTask/${this.props.match.params.project_id}`).then(res => {
                console.log(res.data)
                let chartData = {...this.state.chartData}
                console.log(chartData)
                chartData.datasets[0].data.push(+res.data[0].count)
                this.setState({
                    chartData: chartData
                })
                axios.get(`/api/countReviewTask/${this.props.match.params.project_id}`).then(res => {
                    console.log(res.data)
                    let chartData = {...this.state.chartData}
                    console.log(chartData)
                    chartData.datasets[0].data.push(+res.data[0].count)
                    this.setState({
                        chartData: chartData
                    })
                    axios.get(`/api/countDoneTask/${this.props.match.params.project_id}`).then(res => {
                        console.log(res.data)
                        let chartData = {...this.state.chartData}
                        console.log(chartData)
                        chartData.datasets[0].data.push(+res.data[0].count)
                        this.setState({
                            chartData: chartData
                        })
                     })
                 })
             })
         })
         
       
        // console.log("this is data", this.state.chartData.datasets[0].data)
    }
    render(){
        console.log(this.state)
        return(
            <div className={this.props.toggleSideBar ? 'Single_Project_Stats' : 'Single_Project_Stats open'}>
               <div className='chart_container'> 
                    <div className='chart_box'>
                    <Bar
                        data={this.state.chartData}
                        height={100}
                        width={100}
                        options={{
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        max: 26,
                                        min: 0,
                                        stepSize: 2
                                    }
                                }]
                            }
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