import React, { Component } from 'react'
import { sidebarToggle } from '../../redux/reducers/sidebarReducer'
import {userLoggedIn} from '../../redux/reducers/userReducer'
import { connect } from 'react-redux'
import './Sidebar.css'
import { AiOutlineLogout } from 'react-icons/ai'
import {withRouter} from 'react-router-dom'
import axios from 'axios'



export class Sidebar extends Component {
   constructor(){
      super()

      this.state = {
         userFirst: '',
         userLast: '',
      }
   }
componentDidUpdate(prev){
   if(prev !== this.props && this.props.user){
      this.setState({
         userFirst: this.props.user.first_name,
         userLast: this.props.user.last_name
      })
   }
}

handleLogout = () => {
   axios.post('/api/logout').then(res => {
      this.props.sidebarToggle(!this.props.toggleSideBar)
      this.props.history.push('/')
   })
}
    render() {
      return (
            <div className={this.props.toggleSideBar ? 'show_side_bar' : 'hide_side_bar'}>
               <div id='profile_img_container'> 
               <div id='profile_img'>{this.state.userFirst} </div> 
               </div>

               <div onClick={() => this.props.history.push('/dashboard')}className='sidebar_links'>Personal Dashboard</div>
               <div onClick={() => this.props.history.push('/charts')}className='sidebar_links'>Personal Stats Chart</div>
               <div onClick={() => this.props.history.push('/projects')}className='sidebar_links'>Projects List</div>
               <div id='logout_container'> <AiOutlineLogout id='logout'onClick={() => this.handleLogout()}> </AiOutlineLogout></div>
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
export default withRouter(connect(mapStateToProps, {sidebarToggle, userLoggedIn})(Sidebar));
