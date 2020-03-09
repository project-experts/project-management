import React, { Component } from 'react'
import './Landing.css'

export class Landing extends Component {
   constructor(){
      super(); 

      this.state = {
         username: '', 
         password: ''
      }
   }
   render() {
      return (
         <div className='landing' >
            some
         </div>
      )
   }
}

export default Landing
