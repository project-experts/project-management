import React, { Component } from "react";
import "./Single_Project_Dashboard.css";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import { sidebarToggle } from "../../redux/reducers/sidebarReducer";
import { IoMdTime } from "react-icons/io";
import { MdLowPriority } from "react-icons/md";
import { AiOutlineBarChart } from "react-icons/ai";
import { TiMessage } from "react-icons/ti";
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
      currentProject: []
    };
  }

  componentDidMount() {
    if (this.props.match.params.project_id) {
      this.getTeamMates();
      this.getAllTasks();
      this.getCurrentProject();
    }
  }

  getCurrentProject() {
    axios
      .get(`/api/getSingleProject/${this.props.match.params.project_id}`)
      .then(res => this.setState({ currentProject: res.data }))
      .catch(err => console.log(err));
  }

  getTeamMates() {
    axios
      .get(`/api/getAllTeammates/${this.props.match.params.project_id}`)
      .then(res =>
        this.setState({
          teammates: [
            {
              user_id: "jdf30u0r33j03ur3fj",
              first_name: "Select",
              last_name: "team"
            },
            ...res.data
          ]
        })
      )
      .catch(err => console.log(err));
  }
  getAllTasks() {
    axios
      .get(
        `/api/getALlTasksSingleProject/${this.props.match.params.project_id}`
      )
      .then(res => this.setState({ alltasks: res.data }));
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
  closeModal = () =>
    this.setState({ isModalOpen: false, name: "", task_description: "" });

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
    axios
      .put(`/api/updateTaskToInProgress/${task_id}`)
      .then(res => this.getAllTasks())
      .catch(err => console.log(err));
  };
  pushToCompleted = task_id => {
    axios
      .put(`/api/updateTaskToDone/${task_id}`)
      .then(res => this.getAllTasks())
      .catch(err => console.log(err));
  };

  render() {
    const {
      name,
      task_description,
      alltasks,
      teammates,
      startDate,
      isModalOpen,
      priority,
      currentProject
    } = this.state;
    const todos = alltasks.filter(
      t =>
        t.status === "to do" &&
        (t.task_name.includes(this.props.searchInput) ||
          t.task_description.includes(this.props.searchInput))
    );
    const inprogress = alltasks.filter(
      t =>
        t.status === "in progress" &&
        (t.task_name.includes(this.props.searchInput) ||
          t.task_description.includes(this.props.searchInput))
    );
    const review = alltasks.filter(
      t =>
        t.status === "review" &&
        (t.task_name.includes(this.props.searchInput) ||
          t.task_description.includes(this.props.searchInput))
    );
    const completed = alltasks.filter(
      t =>
        t.status === "done" &&
        (t.task_name.includes(this.props.searchInput) ||
          t.task_description.includes(this.props.searchInput))
    );

    console.log("teammates", teammates);

    return (
      <div
        className={
          this.props.toggleSideBar
            ? "personal_dashboard"
            : "personal_dashboard open"
        }
      >
        <Modal
          isOpen={isModalOpen}
          style={todoStyle}
          contentLabel="Example Modal"
        >
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "80%"
            }}
          >
            {" "}
            Create new task{" "}
          </p>
          <input
            className="input"
            placeholder="Task name"
            name="name"
            value={name}
            onChange={e => this.handleEvent(e)}
          />
          <textarea
            className="input"
            placeholder="Task description"
            name="task_description"
            value={task_description}
            onChange={e => this.handleEvent(e)}
            style={{ height: "10vh" }}
          />
          <label>
            Priority:
            <select value={priority} onChange={this.handlePriority}>
              <option value="">Select Priority </option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <p>
            Deadline:{" "}
            <DatePicker selected={startDate} onChange={this.handleDate} />
          </p>
          <label>
            Assign:
            <select onChange={e => this.selectUserId(e.target.value)}>
              {teammates.length > 0 &&
                teammates.map(teammate => (
                  <option value={teammate.user_id} key={teammate.user_id}>
                    {" "}
                    {teammate.first_name} {teammate.last_name}{" "}
                  </option>
                ))}
            </select>
          </label>
          <button className="btn" onClick={this.closeModal}>
            Cancel
          </button>
          <button className="btn" onClick={this.submitTask}>
            Submit
          </button>
          <div></div>
          <div></div>
        </Modal>
        <div className="bigBox">
          <div className="task_filler">
            <div className="upper-container-1">
              <div className="project_info">
                <div className="project_name">
                  {" "}
                  {currentProject.length > 0 && currentProject[0].project_name}
                  <AiOutlineBarChart
                    className="chart_button"
                    onClick={() =>
                      this.props.history.push(
                        `/SingleProjectStats/${this.props.match.params.project_id}`
                      )
                    }
                  />
                </div>
                <div className="project_description">
                  {" "}
                  {currentProject.length > 0 &&
                    currentProject[0].project_description}{" "}
                </div>
              </div>
              {/* <div className="single-project-teams-1">
              {" "}
              {teammates.length > 0 &&
                teammates.map(mate => (
                  <div className="single-mate-1" key={mate.id}>
                    <img
                      src={mate.profile_image}
                      width="40"
                      style={{
                        height: "40px",
                        borderRadius: "50%",
                        padding: "0",
                        margin: "auto"
                      }}
                    />
                    <TiMessage
                      size={100}
                      style={{ cursor: "pointer" }}
                    ></TiMessage>
                    <h4 style={{ margin: 0 }}>
                      {" "}
                      {mate.first_name} {mate.last_name.slice(0, 1)}{" "}
                    </h4>
                  </div>
                ))}
            </div> */}
            </div>
          </div>
          <div className="task_container">
            <div className="tasks">
              <div id="task_status1">To Do</div>
              <div className="task_holder">
                <div
                  className="task"
                  onClick={() => this.openModal()}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "80px"
                  }}
                >
                  {" "}
                  +
                </div>
                {todos.length > 0 &&
                  todos.map(task => (
                    <div className="task" key={task.task_id}>
                      <div className="task-name1">{task.task_name}</div>
                      <div className="task-lower-box">
                        <div className="task-description1">
                          {task.task_description}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            width: "100%"
                          }}
                        >
                          <div
                            style={{
                              minWidth: "60%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start"
                            }}
                          >
                            <div className="task-deadline-2">
                              <IoMdTime size={20}></IoMdTime>
                              <div className="task-deadline1">
                                {" "}
                                {task.deadline.slice(0, 10)}
                              </div>
                            </div>
                            <div className="task-deadline-2">
                              <MdLowPriority size={20}></MdLowPriority>
                              <div
                                className={
                                  task.priority === "high"
                                    ? "high1"
                                    : task.priority === "medium"
                                    ? "medium1"
                                    : "low1"
                                }
                              >
                                {task.priority}
                              </div>
                            </div>
                          </div>
                          <img
                            src={task.profile_image}
                            width="40"
                            style={{
                              height: "40px",
                              borderRadius: "50%",
                              padding: "0",
                              margin: "auto",
                              marginLeft: "-1vw",
                              marginRight: "0.5vw"
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-around",
                              alignItems: "flex-end"
                            }}
                          >
                            <button className="task-btn1">Edit</button>
                            <button className="task-btn1">Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="tasks">
              <div id="task_status1">In Progress</div>
              <div className="task_holder">
                {inprogress.length > 0 &&
                  inprogress.map(task => (
                    <div className="task" key={task.task_id}>
                      <div className="task-name1">{task.task_name}</div>
                      <div className="task-lower-box">
                        <div className="task-description1">
                          {task.task_description}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            width: "100%"
                          }}
                        >
                          <div
                            style={{
                              minWidth: "60%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start"
                            }}
                          >
                            <div className="task-deadline-2">
                              <IoMdTime size={20}></IoMdTime>
                              <div className="task-deadline1">
                                {" "}
                                {task.deadline.slice(0, 10)}
                              </div>
                            </div>
                            <div className="task-deadline-2">
                              <MdLowPriority size={20}></MdLowPriority>
                              <div
                                className={
                                  task.priority === "high"
                                    ? "high1"
                                    : task.priority === "medium"
                                    ? "medium1"
                                    : "low1"
                                }
                              >
                                {task.priority}
                              </div>
                            </div>
                          </div>
                          <img
                            src={task.profile_image}
                            width="40"
                            style={{
                              height: "40px",
                              borderRadius: "50%",
                              padding: "0",
                              margin: "auto"
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="tasks">
              <div id="task_status1">In Review</div>
              <div className="task_holder">
                {review.length > 0 &&
                  review.map(task => (
                    <div className="task" key={task.task_id}>
                      <div className="task-name1">{task.task_name}</div>
                      <div className="task-lower-box">
                        <div className="task-description1">
                          {task.task_description}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            width: "100%"
                          }}
                        >
                          <div
                            style={{
                              minWidth: "60%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start"
                            }}
                          >
                            <div className="task-deadline-2">
                              <IoMdTime size={20}></IoMdTime>
                              <div className="task-deadline1">
                                {" "}
                                {task.deadline.slice(0, 10)}
                              </div>
                            </div>
                            <div className="task-deadline-2">
                              <MdLowPriority size={20}></MdLowPriority>
                              <div
                                className={
                                  task.priority === "high"
                                    ? "high1"
                                    : task.priority === "medium"
                                    ? "medium1"
                                    : "low1"
                                }
                              >
                                {task.priority}
                              </div>
                            </div>
                          </div>
                          <img
                            src={task.profile_image}
                            width="40"
                            style={{
                              height: "40px",
                              borderRadius: "50%",
                              padding: "0",
                              margin: "auto"
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-around",
                              alignItems: "flex-end"
                            }}
                          >
                            <button
                              className="task-btn1"
                              onClick={() => this.pushToProgress(task.task_id)}
                            >
                              Fail
                            </button>
                            <button
                              className="task-btn1"
                              onClick={() => this.pushToCompleted(task.task_id)}
                            >
                              Pass
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="tasks">
              <div id="task_status1">Done</div>
              <div className="task_holder">
                {completed.length > 0 &&
                  completed.map(task => (
                    <div className="task" key={task.task_id}>
                      <div className="task-name1">{task.task_name}</div>
                      <div className="task-lower-box">
                        <div className="task-description1">
                          {task.task_description}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            width: "100%"
                          }}
                        >
                          <div
                            style={{
                              minWidth: "60%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start"
                            }}
                          >
                            <div className="task-deadline-2">
                              <IoMdTime size={20}></IoMdTime>
                              <div className="task-deadline1">
                                {" "}
                                {task.deadline.slice(0, 10)}
                              </div>
                            </div>
                            <div className="task-deadline-2">
                              <MdLowPriority size={20}></MdLowPriority>
                              <div
                                className={
                                  task.priority === "high"
                                    ? "high1"
                                    : task.priority === "medium"
                                    ? "medium1"
                                    : "low1"
                                }
                              >
                                {task.priority}
                              </div>
                            </div>
                          </div>
                          <img
                            src={task.profile_image}
                            width="40"
                            style={{
                              height: "40px",
                              borderRadius: "50%",
                              padding: "0",
                              margin: "auto"
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
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
    userReducer: state.userReducer.user,
    searchInput: state.searchReducer.searchInput
  };
}
export default connect(mapStateToProps, { sidebarToggle })(Single_Project);
