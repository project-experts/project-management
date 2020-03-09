import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import routes from "./routes";
import Sidebar from './Components/Sidebar/Sidebar'


function App() {
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

export default App;
