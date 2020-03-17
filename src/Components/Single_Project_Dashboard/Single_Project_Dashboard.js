import React, { Component } from 'react'
import './Single_Project_Dashboard.css'
import {connect} from 'react-redux'
import DatePicker from "react-datepicker"
import Modal from 'react-modal'
import { sidebarToggle } from '../../redux/reducers/sidebarReducer'
import { IoMdAdd } from 'react-icons/io'
import axios from 'axios'


const todoStyle = {
   content : {
     width: '450px', 
     height: '450px', 
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
         priority: 'High',
         owner: 'df',
         isModalOpen: false,
         startDate: new Date(), 
         teammates: [],
      }
   }

   componentDidMount(){
      if (this.props.match.params.project_id){
         this.getTeamMates(); 
      }
   }
   getTeamMates(){
      axios.get(`/api/getAllTeammates/${this.props.match.params.project_id}`)
      .then(res => this.setState({teammates: res.data }))
      .catch(err => console.log(err))
   }
   handleEvent = e => this.setState({[e.target.name]: e.target.value })
   handleDate = selectedDate => this.setState({startDate: selectedDate})
   selectUserId = userID => this.setState({owner: userID})
   openModal = (id, firstName, lastName) => {
      this.setState({isModalOpen: true, selectedUser_id: id, firstName: firstName, lastName: lastName});
   }
   closeModal = () => this.setState({isModalOpen: false, name: '', task_description: ''})
   
   submitTask = () => {
      this.closeModal(); 
      const { name, task_description, startDate, owner } = this.state; 
      let dd = startDate.getDate(); 
      let mm = startDate.getMonth() + 1; 
      let yyyy = startDate.getFullYear(); 
      let formattedDate = mm + '/' + dd + '/' + yyyy; 
      const body = {
         project_id: this.props.match.params.project_id,
         user_id: this.props.userReducer.user_id,
         task_name: name, 
         task_description, 
         deadline: formattedDate,
         owner: owner
      }
      console.log('Line 70: ', body)
   }
 
   render() {
      const { name, task_description, teammates, startDate, isModalOpen, owner } = this.state; 
      return (
         <div className={this.props.toggleSideBar ? 'personal_dashboard' : 'personal_dashboard open'}>
            <Modal
            isOpen={isModalOpen}
            style={todoStyle}
            contentLabel="Example Modal">
            <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%'}} > Create new task </p>
            <input className='input' placeholder='Task name' name='name' value={name} onChange={e => this.handleEvent(e)} />
            <textarea className='input' placeholder='Task description' name='task_description' value={task_description} onChange={e => this.handleEvent(e)} style={{height: '10vh'}} />
            {/* <select onClick={} >
               <option value='High' >High</option>
               <option value='Medium' >Medium</option>
               <option value='Low' >Low</option>
            </select> */}
            <p>Deadline: <DatePicker  selected={startDate} onChange={this.handleDate}/></p>
            <select  onChange={e => this.selectUserId(e.target.value)}  >
               {teammates.map(teammate => (
                  <option value={teammate.user_id} key={teammate.user_id}> {teammate.first_name} {teammate.last_name} </option>
               ))}
            </select>
            <div style={{display: 'flex'}} >
               <button className='btn' onClick={this.closeModal} >Cancel</button>
               <button className='btn' onClick={this.submitTask} >Submit</button>
            </div>
            </Modal>
            <div className='task_filler'>
               <div className='task_container'>
                  <div  className='tasks'>
                     <div id='task_name'>To Do</div>
                     <IoMdAdd onClick={() => this.openModal()} size={50} style={{cursor: 'pointer'}} ></IoMdAdd>
                     <div className='task'>hello</div>
                     <div className='task'>hello</div>  
                     <div className='task'>hello</div>  
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
      userReducer: state.userReducer.user
   }
}
export default connect(mapStateToProps, { sidebarToggle })(Single_Project);
