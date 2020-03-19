import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginClicked } from "../../redux/reducers/loginReducer";
import { registerClicked } from "../../redux/reducers/registerReducer";
import { sidebarToggle } from "../../redux/reducers/sidebarReducer";
import { filterState } from "../../redux/reducers/searchReducer";
import { IoMdLogIn } from "react-icons/io";
import { FiUserCheck } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "./logo.svg";
import "./Header.css";
import { userLoggedIn } from "../../redux/reducers/userReducer";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSearch = v => this.props.filterState(v);

  render() {
    console.log(this.props);
    return (
      <div>
        {!this.props.user.first_name ? (
          <div className="header">
            <div></div>
            <img
              src={logo}
              style={{
                width: "110px",
                height: "55px",
                cursor: "pointer",
                marginLeft: "-120px"
              }}
              onClick={() => this.props.history.push("/")}
            />
            <div class="input-field col s6">
              <input
                placeholder="Search"
                id="first_name"
                type="text"
                class="validate"
                onChange={e => this.handleSearch(e.target.value)}
              />
            </div>
            <StyledNav>
              <span>CONTACT US</span>
              <span>MEET WITH THE TEAM</span>
              <div>
                <IoMdLogIn
                  size={25}
                  onClick={() => this.props.loginClicked(true)}
                ></IoMdLogIn>
              </div>
              <div>
                <FiUserCheck
                  size={25}
                  onClick={() => this.props.registerClicked(true)}
                ></FiUserCheck>
              </div>
            </StyledNav>
          </div>
        ) : (
          <div className="header2">
            <GiHamburgerMenu
              size={17}
              style={{ color: "black" }}
              onClick={() =>
                this.props.sidebarToggle(!this.props.toggleSideBar)
              }
            ></GiHamburgerMenu>
            <img
              src={logo}
              style={{
                width: "110px",
                height: "55px",
                cursor: "pointer",
                marginLeft: "-120px"
              }}
              onClick={() => this.props.history.push("/")}
            />
            <div class="input-field col s6">
              <input
                placeholder="Search"
                id="first_name"
                type="text"
                class="validate"
                onChange={e => this.handleSearch(e.target.value)}
              />
            </div>
            <StyledNav>
              <span>CONTACT US</span>
              <span>MEET WITH THE TEAM</span>
              <div>
                <IoMdLogIn
                  size={25}
                  onClick={() => this.props.loginClicked(true)}
                ></IoMdLogIn>
              </div>
              <div>
                <FiUserCheck
                  size={25}
                  onClick={() => this.props.registerClicked(true)}
                ></FiUserCheck>
              </div>
            </StyledNav>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    toggleSideBar: state.sidebarReducer.toggleSideBar,
    isLoginClicked: state.loginReducer.isLoginClicked,
    isRegClicked: state.registerReducer.isRegClicked,
    user: state.userReducer.user
  };
}
export default connect(mapStateToProps, {
  loginClicked,
  registerClicked,
  sidebarToggle,
  userLoggedIn,
  filterState
})(withRouter(Header));

const StyledNav = styled.nav`
  width: 50%;
  display: flex;
  justify-content: space-around;
`;
