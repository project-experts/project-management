import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./Project_List.css";
import { FaPlus } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { sidebarToggle } from "../../redux/reducers/sidebarReducer";
import { IoIosPeople } from "react-icons/io";

export class Project_List extends Component {
      constructor(props){
         super(props); 

         this.state = {
            projects: [],
            project_id: 0
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
         let filteredProjects; 
         if (this.props.searchInput){
            filteredProjects = projects.filter(p => p.project_name.includes(this.props.searchInput) || p.project_description.includes(this.props.searchInput))
         }
         else {
            filteredProjects = projects; 
         }
         return (
               <div className={this.props.toggleSideBar ? 'projects' : 'projects open'}>
                  <div className='idea'><FaPlus onClick={() => this.props.history.push(`/newProject/${this.props.user.user_id}`)} size={80} style={{margin: 'auto', color: 'green'}}></FaPlus></div>
                     {filteredProjects.map(idea => 
                        <div className='idea' onClick={() => this.props.history.push(`/single/${idea.project_id}`)} >
                           <div key={idea.project_id} className='project-name'> {idea.project_name} </div>
                           <div className='lower-box' >
                              <div className='description'>{idea.project_description}</div>
                              <div className='project-deadline' > Deadline: {idea.deadline.slice(0, 10)} </div>
                              <div className='members-line' >
                                 <div> <IoIosPeople size={50} style={{margin: '10px', color: '#33adff'}} ></IoIosPeople> </div>
                                 <div> {idea.teammates.length<=4 ? 
                                       (idea.teammates.map(u => <img src={u.profile_image} width='40' style={{height: '40px', borderRadius: '50%'}} />)) 
                                       :
                                       <div style={{display: 'flex'}} >
                                       {idea.teammates.slice(0, 4).map(p => <img src={p.profile_image} width='40' style={{height: '40px', borderRadius: '50%'}} />)}
                                       <FiMoreHorizontal size={20} style={{marginTop: '25px'}} ></FiMoreHorizontal>  
                                       </div>}
                                 </div>   
                              </div>
                           </div>
                        </div>
                     )}   
               </div>
         )
      }
   }


function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    toggleSideBar: state.sidebarReducer.toggleSideBar,
    searchInput: state.searchReducer.searchInput
  };
}

export default connect(mapStateToProps, { sidebarToggle })(Project_List);
