import React, { Component, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { userLoggedIn } from "../../redux/reducers/userReducer";
import { loginClicked } from "../../redux/reducers/loginReducer";
import { registerClicked } from "../../redux/reducers/registerReducer";
import Modal from "react-modal";
import axios from "axios";
import "./Landing.css";
import { FaEye } from "react-icons/fa";
import { TweenMax, Power3 } from "gsap";
import growth from "./iconfinder_growth.png";
import megaphone from "./iconfinder_megaphone.png";
import network from "./iconfinder_network.png";

const loginStyle = {
  content: {
    width: "250px",
    height: "250px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  }
};

const regStyle = {
  content: {
    width: "350px",
    height: "350px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  }
};

export class Landing extends Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      profile_image: "",
      isPassword: true,
      isMissionRender: false
    };
  }

  handleEvent = e => this.setState({ [e.target.name]: e.target.value });

  closeLoginModal = () => this.props.loginClicked(false);
  closeRegisterModal = () => this.props.registerClicked(false);

  handleClick = e =>
    this.setState({ isMissionRender: !this.state.isMissionRender });

  register = () => {
    this.closeRegisterModal();
    const {
      first_name,
      last_name,
      email,
      password,
      profile_image
    } = this.state;
    axios
      .post("/api/register", {
        first_name,
        last_name,
        email,
        password,
        profile_image
      })
      .then(res => this.props.userLoggedIn(res.data))
      .catch(err => console.log(err));
  };

   login = () => {
      const { email, password } = this.state; 
      if (email.length<1 && password.length<1){
         window.alert('Please Enter valid email and password! ')
      }
      else if (email.length<1 && password.length>=1){
         window.alert('Please Enter valid email!')
      }
      else if (email.length>=1 && password.length<1){
         window.alert('Please Enter valid password! ')
      }
      else {
      this.closeLoginModal(); 
      axios.post('/api/login', { email, password })
      .then(res => {
         this.props.userLoggedIn(res.data);
         this.props.history.push("/dashboard");
      })
      .catch(err =>{
         window.alert('Email or password you entered is not correct! Please try again')
         console.log(err)
      }) 
  }
}


   //AWS S3 
   getSignedRequest = ([file]) => {
      this.setState({ isUploading: true });
  
      const fileName = `${file.name.replace(/\s/g, "-")}`;
  
      axios.get(`/sign-s3?file-name=${fileName}&file-type=${file.type}`);
  
      axios
        .get("/sign-s3", {
          params: {
            "file-name": fileName,
            "file-type": file.type
          }
        })
        .then(response => {
          const { signedRequest, url } = response.data;
          this.setState({
            profileImg: url
          });
          this.uploadFile(file, signedRequest, url);
        })
        .catch(err => {});
    };
    uploadFile = (file, signedRequest, url) => {
      const options = {
        headers: {
          "Content-Type": file.type
        }
      };
  
      axios
        .put(signedRequest, file, options)
        .then(response => {
          this.setState({ isUploading: false, url });
          // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
        })
        .catch(err => {
          this.setState({
            isUploading: false
          });
          if (err.response.status === 403) {
            alert(
              `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${err.stack}`
            );
          } else {
            alert(`ERROR: ${err.status}\n ${err.stack}`);
          }
        });
    };

  render() {
    const {
      first_name,
      last_name,
      email,
      password,
      profile_image,
      isPassword,
      isMissionRender
    } = this.state;

    console.log("isMissionRender :", isMissionRender);

    const missionStatements = () => {
      if (isMissionRender === true) {
        return "renderTrue";
      } else {
        return "renderFalse";
      }
    };

    return (
      <div className="landing">
        <Modal
          isOpen={this.props.isLoginClicked}
          style={loginStyle}
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
            Please sign in{" "}
          </p>
          <input
            className="input"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={e => this.handleEvent(e)}
          />
          <div className="input-div">
            {" "}
            <input
              type={isPassword ? "password" : "text"}
              className="input"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={e => this.handleEvent(e)}
            />
            <FaEye
              className="font"
              onClick={() =>
                this.setState({ isPassword: !this.state.isPassword })
              }
            ></FaEye>
          </div>
          <button className="btn" onClick={this.login}>
            Sign in
          </button>
        </Modal>

        <Modal
          isOpen={this.props.isRegClicked}
          style={regStyle}
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
            Please register{" "}
          </p>
          <input
            className="input"
            placeholder="Enter your first name"
            name="first_name"
            value={first_name}
            onChange={e => this.handleEvent(e)}
          />
          <input
            className="input"
            placeholder="Enter your last name"
            name="last_name"
            value={last_name}
            onChange={e => this.handleEvent(e)}
          />
          <input
            className="input"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={e => this.handleEvent(e)}
          />
          <button className="btn">Validate your email </button>
          <input
            className="input"
            placeholder="Choose your password"
            name="password"
            value={password}
            onChange={e => this.handleEvent(e)}
          />
          <input
            className="input"
            type="file"
            placeholder="Upload photo"
            name="profile_image"
            value={profile_image}
            onChange={e => this.getSignedRequest(e.target.files)}
          />
          <button className="btn" onClick={this.register}>
            Register
          </button>
        </Modal>
        <div>
          <div className="ourMission">OUR MISSION</div>
          <div className="statement">
            Project Experts is the easy, free, flexible, and visual
          </div>
          <div className="statement">
            way to manage your projects and organize anything!
          </div>
          <button
            data-testid="button"
            className="moreDetails"
            onClick={e => this.handleClick(e)}
          >
            more details
          </button>
        </div>
        <div className={missionStatements()}>
          <div className="popDetail">
            <img src={megaphone} className="icon"></img>
            <div className="details">Create transparency</div>
          </div>
          <div className="popDetail">
            <img src={growth} className="icon"></img>
            <div className="details">Promote productivity</div>
          </div>
          <div className="popDetail">
            <img src={network} className="icon"></img>
            <div className="details">Improve relationships</div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoginClicked: state.loginReducer.isLoginClicked,
    isRegClicked: state.registerReducer.isRegClicked
  };
}

export default connect(mapStateToProps, {
  userLoggedIn,
  loginClicked,
  registerClicked
})(Landing);

//Creating a workplace environment of transparency, ownership, and accountability, to make teamwork click.
//Create transparency
//Promote productivity
//Improve relationships
