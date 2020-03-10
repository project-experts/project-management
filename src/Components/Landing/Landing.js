import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLoggedIn } from '../../redux/reducers/userReducer'
import { loginClicked } from '../../redux/reducers/loginReducer'
import { registerClicked } from '../../redux/reducers/registerReducer'
import Modal from 'react-modal'
import axios from 'axios'
import './Landing.css'
import { FaEye } from 'react-icons/fa'

const loginStyle = {
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

const regStyle = {
   content : {
     width: '350px', 
     height: '350px', 
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
         first_name: '', 
         last_name: '',
         email: '', 
         password: '',
         profile_image: '',
         isPassword: false,
      }
   }

   handleEvent = e => this.setState({[e.target.name]: e.target.value})

   closeLoginModal = () => this.props.loginClicked(false); 
   closeRegisterModal = () => this.props.registerClicked(false); 

   register = () => {
      this.closeRegisterModal(); 
      const { first_name, last_name, email, password, profile_image } = this.state; 
      axios.post('/api/register', { first_name, last_name, email, password, profile_image })
      .then(res => this.props.userLoggedIn(res.data))
      .catch(err => console.log(err)); 
   }


   login = () => {
      const { email, password } = this.state; 
      this.closeLoginModal(); 
      axios.get('/api/login', { email, password })
      .then(res => this.userLoggedIn(res.data))
      .catch(err => console.log(err)); 
   }
   render() {
      const { first_name, last_name, email, password, profile_image, isPassword } = this.state; 
      console.log(this.state)
      return (
         <div className='landing' >
            <Modal
            isOpen={this.props.isLoginClicked}
            style={loginStyle}
            contentLabel="Example Modal">
            <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%'}} >Please sign in </p>
            <input className='input' placeholder='Enter your email' name='email' value={email} onChange={e => this.handleEvent(e)} />
            <div className='input-div' > <input type={isPassword ? 'password' : 'text'} 
                                                className='input'
                                                placeholder='Enter your password' name='password' 
                                                value={password} 
                                                onChange={e => this.handleEvent(e)}/>
                                                <FaEye className='font' onClick={() => this.setState({isPassword: !this.state.isPassword})} ></FaEye> 
                                                </div>
            <button className='btn' onClick={this.login} >Sign in</button>
            </Modal>

            <Modal
            isOpen={this.props.isRegClicked}
            style={regStyle}
            contentLabel="Example Modal">
            <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%'}} >Please register </p>
            <input className='input' placeholder='Enter your first name' name='first_name' value={first_name} onChange={e => this.handleEvent(e)} />
            <input className='input' placeholder='Enter your last name' name='last_name' value={last_name} onChange={e => this.handleEvent(e)} />
            <input className='input' placeholder='Enter your email' name='email' value={email} onChange={e => this.handleEvent(e)} />
            <button className='btn' >Validate your email </button>
            <input className='input' placeholder='Choose your password' name='password' value={password} onChange={e => this.handleEvent(e)} />
            <input className='input' type='file' placeholder='Upload photo' name='profile_image' value={profile_image} onChange={e => this.handleEvent(e)} />
            <button className='btn' onClick={this.register} >Register</button>
            </Modal>
         </div>
      )
   }
}


function mapStateToProps(state) {
   return {
      isLoginClicked: state.loginReducer.isLoginClicked,
      isRegClicked: state.registerReducer.isRegClicked
   }
}

export default connect(mapStateToProps, { userLoggedIn, loginClicked, registerClicked })(Landing)
