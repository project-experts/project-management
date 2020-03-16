// import React, { Component } from "react";
// import "./Personal_Dashboard.css";
// import { connect } from "react-redux";
// import { sidebarToggle } from "../../redux/reducers/sidebarReducer";
// import axios from "axios";
// import ReactDOM from "react-dom";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// export class Personal_Dashboard extends Component {
//   constructor() {
//     super();

//     this.state = {
//       tasks: []
//     };
//   }

//   componentDidMount() {
//     console.log(this.props.user.user_id);
//     axios.get(`/api/getToDoTasks/${this.props.user.user_id}`).then(res => {
//       console.log(res.data);
//       this.setState({
//         tasks: res.data
//       });
//     });
//   }

//   render() {
//     console.log(this.state.tasks);
//     console.log(this.props);

//     return (
//       <div
//         className={
//           this.props.toggleSideBar
//             ? "personal_dashboard"
//             : "personal_dashboard open"
//         }
//       >
//         <div className="task_filler">
//           <div className="task_container">
//             <div className="tasks">
//               <div id="task_name">To Do</div>
//               <div className="task_holder">
//                 {this.state.tasks.map((e, i) => (
//                   <div className="task">{e.task_name}</div>
//                 ))}
//               </div>
//             </div>
//             <div className="tasks">
//               <div id="task_name">In Progress</div>
//             </div>
//             <div className="tasks">
//               <div id="task_name">In Review</div>
//             </div>
//             <div className="tasks">
//               <div id="task_name">Complete</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     toggleSideBar: state.sidebarReducer.toggleSideBar,
//     user: state.userReducer.user
//   };
// }
// export default connect(mapStateToProps, { sidebarToggle })(Personal_Dashboard);
