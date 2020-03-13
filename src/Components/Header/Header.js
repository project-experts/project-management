import React, { Component } from "react";
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loginClicked } from '../../redux/reducers/loginReducer'
import { registerClicked } from '../../redux/reducers/registerReducer'
import { sidebarToggle } from '../../redux/reducers/sidebarReducer'
import { IoMdLogIn } from 'react-icons/io'
import { FiUserCheck } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'
import logo from './logo.png'
import "./Header.css";
import {userLoggedIn} from '../../redux/reducers/userReducer'


class Header extends Component {
   constructor(props){
     super(props)

     this.state = {
       
     }
   }

     
   render(){
      console.log(this.props)
   return (
      <div>
      {!this.props.user.first_name  ?  (
         <div className="header">
         <div></div>
         <img src={logo} style={{width: '30px', height: '30px', cursor: 'pointer'}} onClick={() => this.props.history.push('/')} />
         <div class="input-field col s6">
            <input placeholder="Search" id="first_name" type="text" class="validate"/>
         </div>
         <StyledNav  >
         <span>Contact us</span>
         <span>Meet with the team</span>
         <div><IoMdLogIn size={20} onClick={() => this.props.loginClicked(true)} ></IoMdLogIn></div>
         <div><FiUserCheck size={20} onClick={() => this.props.registerClicked(true)} ></FiUserCheck></div>
         </StyledNav>
         </div>
         
      
      ) : ( 
         <div className="header">
         <GiHamburgerMenu size={17} style={{color: 'black'}}  onClick={() => this.props.sidebarToggle(!this.props.toggleSideBar)}></GiHamburgerMenu>
         <img src={logo} style={{width: '30px', height: '30px', cursor: 'pointer'}} onClick={() => this.props.history.push('/')} />
         <div class="input-field col s6">
            <input placeholder="Search" id="first_name" type="text" class="validate"/>
         </div>
         <StyledNav  >
         <span>Contact us</span>
         <span>Meet with the team</span>
         <div><IoMdLogIn size={20} onClick={() => this.props.loginClicked(true)} ></IoMdLogIn></div>
         <div><FiUserCheck size={20} onClick={() => this.props.registerClicked(true)} ></FiUserCheck></div>
         </StyledNav>
         </div>
      )}
      </div>
   ) 
  }
}

function mapStateToProps(state) {
   return {
      toggleSideBar: state.sidebarReducer.toggleSideBar,
      isLoginClicked: state.loginReducer.isLoginClicked,
      isRegClicked: state.registerReducer.isRegClicked,
      user: state.userReducer.user
   }
}
export default connect(mapStateToProps, { loginClicked, registerClicked, sidebarToggle, userLoggedIn })(withRouter(Header));

const StyledNav = styled.nav`
   width: 50%;
   display: flex; 
   justify-content: space-between;
`; 