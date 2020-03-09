import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLoggedIn } from '../../redux/reducers/userReducer'
import { loginClicked } from '../../redux/reducers/loginReducer'
import Modal from 'react-modal'
import axios from 'axios'
import './Landing.css'
import { FaEye } from 'react-icons/fa'

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

export class Landing extends Component {
   constructor(){
      super(); 

      this.state = {
         email: '', 
         password: '',
         isPassword: false,
      }
   }

   handleEvent = e => {
      this.setState({[e.target.name]: e.target.value})
   }

   login = () => {
      const { email, password } = this.state; 
      this.props.loginClicked(false); 
      axios.get('/api/login', { email, password })
      .then(res => this.userLoggedIn(res.data))
      .catch(err => console.log(err)); 
   }
   render() {
      const { email, password, isPassword } = this.state; 
      console.log(email, password)
      return (
         <div className='landing' >
            <Modal
            isOpen={this.props.isLoginClicked}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal">
            <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%'}} >Please sign in </p>
            <input className='input' onClick={this.closeModal} placeholder='Enter your email' name='email' value={email} onChange={e => this.handleEvent(e)} />
            <div className='input-div' > <input type={isPassword ? 'password' : 'text'} 
                                                className='input'
                                                placeholder='Enter your password' name='password' 
                                                value={password} 
                                                onChange={e => this.handleEvent(e)}/>
                                                <FaEye className='font' onClick={() => this.setState({isPassword: !this.state.isPassword})} ></FaEye> 
                                                </div>
            <button className='btn' onClick={this.login} >Sign in</button>
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

export default connect(mapStateToProps, { userLoggedIn, loginClicked })(Landing)
