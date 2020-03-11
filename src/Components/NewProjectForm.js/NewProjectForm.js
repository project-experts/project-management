import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './NewProjectForm.css'
import axios from 'axios';

export class NewProjectForm extends Component {
   constructor(props){
      super(props); 

      this.state = {
         project_name: '', 
         project_description: '',
         startDate: new Date(), 
         deadline: '',
         users: [],
         teammates: []
      }
   }

   componentDidMount(){
      this.getUsers(); 
   }

   getUsers = () => {
      axios.get('/api/getAllUsers')
      .then(res => this.setState({users: res.data}))
      .catch(err => console.log('err is on New Project', err))  
   }

   handleChange = e => this.setState({[e.target.name]: e.target.value })
   handleDate = selectedDate => {
         let dd = selectedDate.getDate(); 
         let mm = selectedDate.getMonth() + 1; 
         let yyyy = selectedDate.getFullYear(); 
         let formattedDate = mm + '/' + dd + '/' + yyyy; 
         this.setState({deadline: formattedDate})
   }

   createProject = () => {
      const { project_name, project_description, deadline } = this.state; 
   }
   render() {
      const { project_name, startDate, project_description, teammates } = this.state 
      console.log(this.state.users, project_description)
      return (
         <div className='new_porject' >
            <p>Project Name<input placeholder='Your Project Name' name='project_name' value={project_name} onChange={e => this.handleChange(e)}/></p>
            <p>Project Description<textarea  placeholder='Description' name='project_description' value={project_description} onChange={e => this.handleChange(e)}/></p>
            <p>Your Project Deadline <DatePicker selected={startDate} onChange={this.handleDate}/></p>
            <p>Add new Team {teammates.map(member => (
               <img src={member.profile_image} width='40px' />
            ))} <input/> </p>
            <p> <button onClick={() => this.createProject()} >Submit</button> </p>
         </div>
      )
   }
}

export default NewProjectForm
