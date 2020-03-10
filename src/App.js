import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import routes from "./routes";
import Sidebar from './Components/Sidebar/Sidebar'
import {connect} from 'react-redux'
import {userLoggedIn} from './redux/reducers/userReducer'



const App = props => {
  console.log(props)
  return (
    <div className="App">
      <Header/>
      <div className='body'> 
        <Sidebar/>
        {routes}
      
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
     user:state.userReducer.userLoggedIn,
     
  }
}
export default connect(mapStateToProps, { userLoggedIn })(App);