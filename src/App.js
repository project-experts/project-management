import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import routes from "./routes";
import Sidebar from './Components/Sidebar/Sidebar'


function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar/>
      {routes}
    </div>
  );
}

export default App;
