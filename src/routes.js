import React from 'react'; 
import { Switch, Route } from 'react-router-dom'
import Landing from './Components/Landing/Landing';
import Personal_Dashboard from './Components/Personal_Dashboard/Personal_Dashboard';
import Personal_Stats from './Components/Personal_Stats/Personal_Stats';
import Project_List from './Components/Project_List/Project_List';
import Single_Project from './Components/Single_Project_Dashboard/Single_Project_Dashboard';


export default(
   <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/dashboard/:user_id' component={Personal_Dashboard} />
      <Route path='./personal_state' component={Personal_Stats} />
      <Route path='./projects' component={Project_List} />
      <Route path='./single' component={Single_Project} />
   </Switch>
)