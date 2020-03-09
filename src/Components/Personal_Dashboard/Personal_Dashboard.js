import React, { Component } from 'react'
import './Personal_Dashboard.css'

export class Personal_Dashboard extends Component {
   constructor(){
      super()

      this.state = {
         toggleSideBar: 'sidebar'
      }
   }
   render() {
      return (
         <div className='personal_dashboard'>
             
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

export default Personal_Dashboard
