import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './Project_List.css'
import { FaPlus } from 'react-icons/fa'

export class Project_List extends Component {
      constructor(props){
         super(props); 

         this.state = {
            projects: []
         }
   }
      componentDidMount(){
         console.log(this.props.user.user_id)
         this.getProjects(); 
      }
      getProjects = () => {
         if (this.props.user.user_id){
             axios.get(`/api/getProjects/${this.props.user.user_id}`)
             .then(res => this.setState({projects: res.data }))
             .catch(err => console.log('err on project_list front end', err))
         }
      }
      render() {
         const { projects } = this.state; 
         return (
                  <div className='projects'>
                     <div className='idea'><FaPlus onClick={() => this.props.history.push(`/newProject/${this.props.user.user_id}`)} size={80} style={{margin: 'auto', color: 'green'}}></FaPlus></div>
                        {projects.map(idea => 
                           <div className='idea'>
                              <div key={idea.id}> Project:{idea.projectName} </div>
                              <div > {idea.description} </div>
                              <div > Deadline: {idea.deadline} </div>
                              <div > Teams: {idea.teams} </div>
                           </div>
                        )}   
                  </div>
         )
      }
   }


function mapStateToProps(state) {
   return {
      user: state.userReducer.user
   }
}

export default connect(mapStateToProps)(Project_List);

