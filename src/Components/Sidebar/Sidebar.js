import React, { Component } from 'react'
import { sidebarToggle } from '../../redux/reducers/sidebarReducer'
import { connect } from 'react-redux'
import './Sidebar.css'

export class Sidebar extends Component {
    render() {
      console.log(this.props.toggleSideBar)

      return (
         <div>
            <div className={this.props.toggleSideBar ? 'show_side_bar' : 'hide_side_bar'}></div>
         </div>
      )
   }
}

function mapStateToProps(state) {
   return {
      toggleSideBar: state.sidebarReducer.toggleSideBar
   }
}
export default connect(mapStateToProps, { sidebarToggle })(Sidebar);
