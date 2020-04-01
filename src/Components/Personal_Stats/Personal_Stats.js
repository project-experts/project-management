import React, { Component } from 'react'
import PersonalPieChart from '../Charts/PersonalPieChart'
import './Personal_Stats.css'
import {connect} from 'react-redux'
import { sidebarToggle } from '../../redux/reducers/sidebarReducer'
import axios from 'axios'


export class Personal_Stats extends Component {
   constructor(){
      super()

      this.state = {
         pieChartData:{
            labels:['to do', 'in progress', 'in review', 'complete'],
            datasets:[{
                label: 'Tasks',
                data:[],
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
   componentDidMount(){
      console.log(this.props.match.params.user_id)
      axios.get(`/api/countTodoTasks/${this.props.match.params.user_id}`).then(res => {
          console.log(res.data)
          let pieChartData = {...this.state.pieChartData}
          console.log(pieChartData)
          pieChartData.datasets[0].data.push(+res.data[0].count)
          this.setState({
              pieChartData: pieChartData
          })
          axios.get(`/api/countInProgressTasks/${this.props.match.params.user_id}`).then(res => {
              console.log(res.data)
              let pieChartData = {...this.state.pieChartData}
              console.log(pieChartData)
              pieChartData.datasets[0].data.push(+res.data[0].count)
              this.setState({
                  pieChartData: pieChartData
              })
              axios.get(`/api/countReviewTasks/${this.props.match.params.user_id}`).then(res => {
                  console.log(res.data)
                  let pieChartData = {...this.state.pieChartData}
                  console.log(pieChartData)
                  pieChartData.datasets[0].data.push(+res.data[0].count)
                  this.setState({
                      pieChartData: pieChartData
                  })
                  axios.get(`/api/countDoneTasks/${this.props.match.params.user_id}`).then(res => {
                      console.log(res.data)
                      let pieChartData = {...this.state.pieChartData}
                      console.log(pieChartData)
                      pieChartData.datasets[0].data.push(+res.data[0].count)
                      this.setState({
                          pieChartData: pieChartData
                      })
                   })
               })
           })
       })
      }
   render() {
       console.log(this.props)
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