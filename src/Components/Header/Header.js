import React, { Component } from "react";
import styled from 'styled-components'
import { connect } from 'react-redux'
import { loginClicked } from '../../redux/reducers/loginReducer'
import { sidebarToggle } from '../../redux/reducers/sidebarReducer'
import { IoMdLogIn } from 'react-icons/io'
import { FiUserCheck } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'
import logo from './logo.png'
import "./Header.css";

class Header extends Component {
   constructor(){
     super()

     this.state = {
       
     }
   }

     
   render(){
   return (
      <div className="header">
         <GiHamburgerMenu size={17} style={{color: 'black'}}  onClick={() => this.props.sidebarToggle(!this.props.toggleSideBar)}></GiHamburgerMenu>
         <img src={logo} style={{width: '30px', height: '30px'}} />
         <StyledNav  >
         <span>Contact us</span>
         <span>Meet with the team</span>
            <IoMdLogIn size={20} onClick={() => this.props.loginClicked(true)} ></IoMdLogIn>
            <FiUserCheck size={20} ></FiUserCheck>
         </StyledNav>
   </div>
   ) 
  }
}

function mapStateToProps(state) {
   return {
      isLoginClicked: state.loginReducer.isLoginClicked,
      toggleSideBar: state.sidebarReducer.toggleSideBar
   }
}
export default connect(mapStateToProps, { loginClicked, sidebarToggle })(Header);

const StyledNav = styled.nav`
   width: 50%;
   display: flex; 
   justify-content: space-between;
`; 