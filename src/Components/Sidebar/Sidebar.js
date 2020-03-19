import React, { Component } from 'react'
import { sidebarToggle } from '../../redux/reducers/sidebarReducer'
import {userLoggedIn, userLoggedOut} from '../../redux/reducers/userReducer'
import { connect } from 'react-redux'
import './Sidebar.css'
import { AiOutlineLogout } from 'react-icons/ai'
import {withRouter} from 'react-router-dom'
import Modal from 'react-modal'
import axios from 'axios'


const logoutStyle = {
   content : {
     width: '250px', 
     height: '250px', 
     margin: 'auto',
     display: 'flex', 
     flexDirection: 'column',
     justifyContent: 'space-around',
     alignItems: 'center',
     backgroundColor: '#fad0c4'
   }
 };


export class Sidebar extends Component {
   constructor(){
      super()

      this.state = {
         userFirst: '',
         userLast: '',
         userImg: '',
         isModelOpen: false
      }
   }

openModel = () => this.setState({isModelOpen: true}); 
closeModal = () => this.setState({isModelOpen: false}); 

componentDidUpdate(prev){
   if(prev !== this.props && this.props.user){
      this.setState({
         userFirst: this.props.user.first_name,
         userLast: this.props.user.last_name,
         userImg: this.props.user.profile_image
      })
   }
}

handleLogout = () => {
   this.closeModal(); 
   axios.post('/api/logout').then(res => {
      this.props.sidebarToggle(!this.props.toggleSideBar)
      this.props.userLoggedOut()
      this.props.history.push('/')
   })
}
    render() {
       const { isModelOpen } = this.state
      return (
            <div className={this.props.toggleSideBar ? 'show_side_bar' : 'hide_side_bar'}>
            <Modal
            isOpen={isModelOpen}
            style={logoutStyle}>
            <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%'}} >Are you sure ?</p>
            <div style={{width: '80%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}} >
               <button onClick={this.closeModal} >Cancel</button>
               <button onClick={()=>this.handleLogout()}>Logout</button>
            </div>
            </Modal>
               <div id='profile_img_container'> 
               <img id='profile_img' src={this.state.userImg}/> 
               </div>

               <div onClick={() => this.props.history.push('/dashboard')}className='sidebar_links'>Personal Dashboard</div>
               <div onClick={() => this.props.history.push('/charts')}className='sidebar_links'>Personal Stats Chart</div>
               <div onClick={() => this.props.history.push('/projects')}className='sidebar_links'>Projects List</div>
               <div id='logout_container'> <AiOutlineLogout id='logout'onClick={this.openModel}> </AiOutlineLogout></div>
            </div>
      )  
            
   }
}

function mapStateToProps(state) {
   return {
      toggleSideBar: state.sidebarReducer.toggleSideBar,
      user: state.userReducer.user
   }
}
export default withRouter(connect(mapStateToProps, { sidebarToggle, userLoggedIn, userLoggedOut })(Sidebar));
