import React, { Component } from 'react'
import './Single_Project_Dashboard.css'
import {connect} from 'react-redux'
import DatePicker from "react-datepicker"
import Modal from 'react-modal'
import { sidebarToggle } from '../../redux/reducers/sidebarReducer'


const todoStyle = {
   content : {
     width: '350px', 
     height: '350px', 
     margin: 'auto',
     display: 'flex', 
     flexDirection: 'column',
     justifyContent: 'space-around',
     alignItems: 'center'
   }
 };

export class Single_Project extends Component {
   constructor(){
      super()

      this.state = {
         name: '',
         task_description: '',
         deadline: '',
         priority: '',
         owner: '',
         isModalOpen: false,
         startDate: new Date(), 
      }
   }

   openModal = (id, firstName, lastName) => {
      this.setState({isModalOpen: true, selectedUser_id: id, firstName: firstName, lastName: lastName});
   }
   closeModal = () => this.setState({isModalOpen: false, name: '', task_description: ''})
   
 
   render() {
      const { name, task_description, deadline, priority, owner, startDate, isModalOpen } = this.state; 
      console.log(this.props)
      return (
         <div className={this.props.toggleSideBar ? 'personal_dashboard' : 'personal_dashboard open'}>
            <Modal
            isOpen={isModalOpen}
            style={todoStyle}
            contentLabel="Example Modal">
            <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%'}} > Create new task </p>
            <input className='input' placeholder='Task name' name='first_name' value={name} onChange={e => this.handleEvent(e)} />
            <input className='input' placeholder='Task description' name='last_name' value={task_description} onChange={e => this.handleEvent(e)} />
            <DatePicker  selected={startDate} onChange={this.handleDate}/>
            <button className='btn' onClick={this.closeModal} >Cancel</button>
            <button className='btn' onClick={this.submitTask} >Submit</button>
            </Modal>
            <div className='task_filler'>
               <div className='task_container'>
                  <div  className='tasks'>
                     <div id='task_name'>To Do</div>
                     <button onClick={() => this.openModal()} >add</button>
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
export default connect(mapStateToProps, { sidebarToggle })(Single_Project);
