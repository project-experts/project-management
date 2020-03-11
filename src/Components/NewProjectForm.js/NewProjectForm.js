import React, { Component } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Modal from 'react-modal'
import './NewProjectForm.css'
import axios from 'axios'


const customStyles = {
   content : {
     width: '250px', 
     height: '250px', 
     margin: 'auto',
     display: 'flex', 
     flexDirection: 'column',
     justifyContent: 'space-around',
     alignItems: 'center'
   }
 };

export class NewProjectForm extends Component {
   constructor(props){
      super(props); 

      this.state = {
         project_name: '', 
         project_description: '',
         startDate: new Date(), 
         deadline: '',
         users: [],
         teammates: [],
         searchBy: '',
         showUsers: false, 
         assignedMembers: [],
         modalIsOpen: false,
         selectedUser_id: '', 
         firstName: '', 
         lastName: ''
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
   handleDate = selectedDate => this.setState({startDate: selectedDate})

   openModal = (id, firstName, lastName) => {
      this.setState({modalIsOpen: true, selectedUser_id: id, firstName: firstName, lastName: lastName});
   }
   closeModal = () => this.setState({modalIsOpen: false})

   addUserToTeam = () => {
      this.closeModal(); 
      const { users, selectedUser_id } = this.state; 
      let user_id = selectedUser_id
      let user = users.filter(us => us.user_id === user_id)
      console.log(user)
      this.setState({assignedMembers: [...this.state.assignedMembers, user[0]]})
   }

   createProject = () => {
      const { project_name, project_description, startDate, assignedMembers } = this.state; 
      let dd = startDate.getDate(); 
      let mm = startDate.getMonth() + 1; 
      let yyyy = startDate.getFullYear(); 
      let formattedDate = mm + '/' + dd + '/' + yyyy; 
      var body = {
         user_id: this.props.match.params.user_id,
         project_name, 
         project_description, 
         deadline: formattedDate, 
         teammates: assignedMembers.map(member => member.user_id)
      }
      axios.post('/api/createProject', body)
      .then(res => {
         this.props.history.push('/projects')
      })
      .catch(err => console.log(err))
   }
   render() {
      const { project_name, startDate, project_description, users, searchBy, showUsers, assignedMembers, modalIsOpen, firstName, lastName } = this.state 
      let filteredUsers; 
      if (searchBy.length>=1){
         filteredUsers = users.filter(u => u.first_name.includes(searchBy) || u.last_name.includes(searchBy))
      }
      else {
         filteredUsers=users
      }
      var sorted = this.state.assignedMembers.filter(val => val = val.user_id)
      console.log(sorted)
      return (
         <div className='new-project'>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >
            <div style={{display: 'flex', justifyContent: 'center'}} >Are you sure you want to add  { firstName } { lastName } to this Project ?</div>
            <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}} >
               <button onClick={this.closeModal}>Cancel</button>
               <button onClick={this.addUserToTeam}>Add</button>
            </div>
            </Modal>
            <div className='project' >
               <p><input className='project-name-input' placeholder='Your Project Name' name='project_name' value={project_name} onChange={e => this.handleChange(e)}/></p>
               <p><input className='project-name-input' placeholder='Description' name='project_description' value={project_description} onChange={e => this.handleChange(e)} style={{fontSize: '30px'}} /></p>
               <p>Deadline: <DatePicker  selected={startDate} onChange={this.handleDate}/></p>
               <p className='btn_and_heads' > 
                  <div> <button className='project-button1' onClick={()=>this.setState({showUsers: !this.state.showUsers})} > Assign team</button> </div>
                  <div>
                  {assignedMembers.length > 0 ?
                     assignedMembers.map(u => 
                     <div className='assigned-members' key={u.user_id}> <img src={u.profile_image} width='40' style={{height: '40px', borderRadius: '50%'}}/> </div>
                     
                  ) : <div></div> } 
                  </div>
               </p>
               <p> <button className='project-button2' onClick={() => this.createProject()} >Submit</button> </p>
            </div>
            {showUsers && <div className='right-box' >
               <input className='search-box' placeholder='Search member' onChange={e=>this.setState({searchBy: e.target.value })} />
               {filteredUsers.map(user =>
                  <div key={user.user_id} className='each-row'> 
                     <p className='one-line' onClick={() => this.openModal(user.user_id, user.first_name, user.last_name)}>
                     <img src={user.profile_image} width='40' style={{height: '40px', borderRadius: '50%', marginRight: '10%'}} />
                    
                     <h2> {user.first_name} {user.last_name} </h2>
                     </p>
                  </div>)} 
            </div> }
            
         </div>
      )
   }
}

export default NewProjectForm

