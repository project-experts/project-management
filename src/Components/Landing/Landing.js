import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import './Landing.css'

const customStyles = {
   content : {
     width: '250px', 
     height: '250px', 
     margin: 'auto',
     display: 'flex', 
     flexDirection: 'column',
     justifyContent: 'space-around'
   }
 };

export class Landing extends Component {
   constructor(){
      super(); 

      this.state = {
         username: '', 
         password: '',
         modalIsOpen: false,
      }
   }
   render() {
      console.log(this.props.isLoginClicked)
      return (
         <div className='landing' >
            <Modal
            isOpen={this.props.isLoginClicked}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal">
            <div style={{display: 'flex', justifyContent: 'center'}} >Please sign in </div>
            <input onClick={this.closeModal} placeholder='Enter your email' />
            <input onClick={this.logout} placeholder='Enter your password' />
            <button>Sign in</button>
            </Modal>
         </div>
      )
   }
}


function mapStateToProps(state) {
   return {
      isLoginClicked: state.loginReducer.isLoginClicked
   }
}

export default connect(mapStateToProps)(Landing)
