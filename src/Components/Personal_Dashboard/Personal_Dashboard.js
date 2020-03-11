import React, { Component } from 'react'
import './Personal_Dashboard.css'
import {connect} from 'react-redux'
import { sidebarToggle } from '../../redux/reducers/sidebarReducer'


export class Personal_Dashboard extends Component {
   constructor(){
      super()

      this.state = {
         toggle: 'personal_dashboard open'
      }
   }

   componentDidUpdate(prev){
      if(prev !== this.props){
            this.toggle()
      }
   }

toggle = () => {
   if(this.state.toggle === 'personal_dashboard open'){
      this.setState({
         toggle: 'personal_dashboard'
      })
   } else {
      this.setState({
         toggle: 'personal_dashboard open'
      })
   }
}
   render() {
      console.log(this.props)
      return (
         <div className={this.state.toggle}>
            <div className='task_filler'>
               <div className='task_container'>
                  <div  className='tasks'>
                     <div id='task_name'>To Do</div>
                  </div>
                  <div className='tasks'>
                     <div id='task_name'>In Progress</div>
                  </div>
                  <div className='tasks'>
                     <div id='task_name'>In Review</div>
                  </div>
                  <div className='tasks'>
                     <div id='task_name'>Complete</div>
                  </div>
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
export default connect(mapStateToProps, { sidebarToggle })(Personal_Dashboard);