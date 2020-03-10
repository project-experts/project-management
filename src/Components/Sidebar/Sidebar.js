import React, { Component } from 'react'
import { sidebarToggle } from '../../redux/reducers/sidebarReducer'
import {userLoggedIn} from '../../redux/reducers/userReducer'
import { connect } from 'react-redux'
import './Sidebar.css'
import { AiOutlineLogout } from 'react-icons/ai'



export class Sidebar extends Component {
   constructor(){
      super()

      this.state = {
         userFirst: [],
         userLast: []
      }
   }

   // const user = {
   //    firstName: 'Rico',
   //    lastName: 'Hancock'
   // }

   // let firstInit = user.firstName[0]
   // let firstInit2 = user.firstName.split('').splice(0, 1).join('')

    render() {
      
      this.setState({
        userFirst : [this.props.user.first_name]  
      })

      return (
         
            <div className={this.props.toggleSideBar ? 'show_side_bar' : 'hide_side_bar'}>
               <div id='profile_img'>{this.state.userFirst[0][0]} </div>
               <div className='sidebar_links'>Personal Dashboard</div>
               <div className='sidebar_links'>Personal Stats Chart</div>
               <div className='sidebar_links'>Projects List</div>
               <AiOutlineLogout> </AiOutlineLogout>
            </div>
         
      )
   }
}

function mapStateToProps(state) {
   return {
      toggleSideBar: state.sidebarReducer.toggleSideBar,
      user:state.userReducer.userLoggedIn
   }
}
export default connect(mapStateToProps, {sidebarToggle, userLoggedIn})(Sidebar);
