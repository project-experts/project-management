import React, { Component } from "react";
import "./Single_Project_Dashboard.css";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import { sidebarToggle } from "../../redux/reducers/sidebarReducer";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";

const todoStyle = {
  content: {
    width: "450px",
    height: "450px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  }
};

export class Single_Project extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      task_description: "",
      deadline: "",
      priority: "",
      owner: 0,
      isModalOpen: false,
      startDate: new Date(),
      alltasks: [],  
      teammates: [],
    };
  }

  componentDidMount() {
    if (this.props.match.params.project_id) {
      this.getTeamMates();
      this.getAllTasks();
    }
  }

  getTeamMates() {
    axios.get(`/api/getAllTeammates/${this.props.match.params.project_id}`)
         .then(res => this.setState({ teammates: res.data }))
         .catch(err => console.log(err));
  }
  getAllTasks() {
    axios.get(`/api/getALlTasksSingleProject/${this.props.match.params.project_id}`)
         .then(res => this.setState({teammates: res.data }))
      }
  handleEvent = e => this.setState({ [e.target.name]: e.target.value });
  handleDate = selectedDate => this.setState({ startDate: selectedDate });
  handlePriority = e => this.setState({ priority: e.target.value });
  selectUserId = userID => this.setState({ owner: userID });

  openModal = (id, firstName, lastName) =>
    this.setState({
      isModalOpen: true,
      selectedUser_id: id,
      firstName: firstName,
      lastName: lastName
    });
  closeModal = () => this.setState({ isModalOpen: false, name: "", task_description: "" });
 
  submitTask = () => {
    this.closeModal();
    const { name, task_description, startDate, owner, priority } = this.state;
    let dd = startDate.getDate();
    let mm = startDate.getMonth() + 1;
    let yyyy = startDate.getFullYear();
    let formattedDate = mm + "/" + dd + "/" + yyyy;
    const body = {
      project_id: this.props.match.params.project_id,
      user_id: this.props.userReducer.user_id,
      task_name: name,
      task_description,
      deadline: formattedDate,
      priority,
      status: "to do",
      owner: owner
    };
    axios.post("/api/createTask", body).then(res => {
      this.getAllTasks();
      this.setState({
        name: "",
        task_description: "",
        deadline: "",
        priority: "",
        owner: 0
      });
    });
  };

  pushToProgress = task_id => {
   axios.put(`/api/updateTaskToInProgress/${task_id}`)
   .then(res => this.getAllTasks())
   .catch(err => console.log(err))
  }
  pushToCompleted = task_id => {
   axios.put(`/api/updateTaskToDone/${task_id}`)
   .then(res => this.getAllTasks())
   .catch(err => console.log(err))
  }
  
 
   render() {
      const { name, task_description, teammates, startDate, isModalOpen, priority } = this.state;
      const todos = teammates.filter(t => t.status === 'to do'); 
      const inprogress = teammates.filter(t => t.status === 'in progress'); 
      const review = teammates.filter(t => t.status === 'review'); 
      const completed = teammates.filter(t => t.status === 'done'); 

      return (
         <div className={this.props.toggleSideBar ? 'personal_dashboard' : 'personal_dashboard open'}>
            <Modal
            isOpen={isModalOpen}
            style={todoStyle}
            contentLabel="Example Modal">
            <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%'}} > Create new task </p>
            <input className='input' placeholder='Task name' name='name' value={name} onChange={e => this.handleEvent(e)} />
            <textarea className='input' placeholder='Task description' name='task_description' value={task_description} onChange={e => this.handleEvent(e)} style={{height: '10vh'}} />
            <label>Priority: 
               <select value={priority} onChange={this.handlePriority} >
                  <option value=''>Select Priority </option>
                  <option value='High'>High</option>
                  <option value='Medium'>Medium</option>
                  <option value='Low'>Low</option>
               </select>
            </label>
            <p>Deadline: <DatePicker selected={startDate} onChange={this.handleDate}/></p>
            <label>Assign: 
               <select  onChange={e => this.selectUserId(e.target.value)}  >
                  {teammates.map(teammate => (
                     <option value={teammate.user_id} key={teammate.user_id}> {teammate.first_name} {teammate.last_name} </option>
                  ))}
               </select>
            </label>
            <div style={{display: 'flex'}} >
               <button className='btn' onClick={this.closeModal} >Cancel</button>
               <button className='btn' onClick={this.submitTask} >Submit</button>
            </div>
            <div></div>
            <div></div>
            </Modal>
            <div className='task_filler'>
               <div className='task_container'>
                  <div className='tasks'>
                  <div id='task_name'>To Do</div>
                  <div> <IoMdAdd onClick={() => this.openModal()} size={50} className='plus-sign'></IoMdAdd></div>
                     <div className='task_holder'>
                     {todos.length>0 && todos.map(task => (
                        <div className='task' key={task.task_id} >
                           <div>{task.task_name}</div>
                           <div>{task.task_description}</div>
                           <div>{task.deadline.slice(0, 10)}</div>
                           <div>{task.priority}</div>
                           <div>{task.status}</div>
                        </div>
                     ))}
                     </div>
                  </div>
                  <div className='tasks'>
                     <div id='task_name'>In Progress</div>
                     {inprogress.length>0 && inprogress.map(task => (
                        <div className='task' key={task.task_id} >
                           <div>{task.task_name}</div>
                           <div>{task.task_description}</div>
                           <div>{task.deadline.slice(0, 10)}</div>
                           <div>{task.priority}</div>
                           <div>{task.status}</div>
                        </div>
                     ))}
                  </div> 
                  <div className='tasks'>
                     <div id='task_name'>In Review</div>
                     {review.length>0 && review.map(task => (
                        <div className='task' key={task.task_id} >
                           <div>{task.task_name}</div>
                           <div>{task.task_description}</div>
                           <div>{task.deadline.slice(0, 10)}</div>
                           <div>{task.priority}</div>
                           <div>{task.status}</div>
                           <div> 
                              <button onClick={() => this.pushToProgress(task.task_id)} >Did not pass</button> 
                              <button onClick={() => this.pushToCompleted(task.task_id)} >Did not pass</button> 
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className='tasks'>
                     <div id='task_name'>Complete</div>
                     {completed.length>0 && completed.map(task => (
                        <div className='task' key={task.task_id} >
                           <div>{task.task_name}</div>
                           <div>{task.task_description}</div>
                           <div>{task.deadline.slice(0, 10)}</div>
                           <div>{task.priority}</div>
                           <div>{task.status}</div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    toggleSideBar: state.sidebarReducer.toggleSideBar,
    userReducer: state.userReducer.user
  };
}
export default connect(mapStateToProps, { sidebarToggle })(Single_Project);
