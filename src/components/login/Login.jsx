import React, { Component, Fragment, createRef } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { login } from "store/actions";
import config from "../../../config";
import "./Login.scss";

const mapDispatchToProps = () =>  {
  return {
    login
  }
}

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      isLogin: true,
    };
    // this.getBodyData.bind(this);
    //  Refs for loginform
    this.loginUserName = createRef();
    this.loginpassword = createRef();
    //  Refs for signup Form
    this.signupUsername = createRef();
    this.signupFirstname = createRef();
    this.signupLastName = createRef();
    this.signupEmail = createRef();
    this.signupPassword = createRef();
    this.signupGender = createRef();
    this.signupCountry = createRef();
  }
  getLoginForm = () => {
    return (
      <Fragment>
        <div className="login-input-holder">
          <input className="login-input" ref={this.loginUserName} type="text" required />
          <label className="login-label" onClick={() => this.loginUserName.current.focus()} > Username </label>
        </div>
        <div className="login-input-holder">
          <input className="login-input" ref={this.loginpassword} type="password" required />
          <label className="login-label" onClick={() => this.loginpassword.current.focus()} > Password </label>
        </div>
      </Fragment>
    );
  };

  getSignupForm = () => {
    return (
      <Fragment>
        <div className="login-input-holder">
          <input className="login-input" ref={this.signupUsername} type="text" required />
          <label className="login-label" onClick={() => this.signupUsername.current.focus()}> Username </label>
        </div>
        <div className="login-input-holder">
          <input className="login-input" ref={this.signupFirstname} type="text" required />
          <label className="login-label" onClick={() => this.signupFirstname.current.focus()}> First Name </label>
        </div>
        <div className="login-input-holder">
          <input className="login-input" ref={this.signupLastName} type="text" required />
          <label className="login-label" onClick={() => this.signupLastName.current.focus()}> Last Name </label>
        </div>
        <div className="login-input-holder">
          <input className="login-input" ref={this.signupEmail} type="email" required />
          <label className="login-label" onClick={() => this.signupEmail.current.focus()}> Email </label>
        </div>
        <div className="login-input-holder">
          <input className="login-input" ref={this.signupPassword} type="password" required />
          <label className="login-label" onClick={() => this.signupPassword.current.focus()}> Password </label>
        </div>
        <div className="login-input-holder radio" ref={this.signupGender}>
          <label className="login-radio-head"> Gender </label>
          <div className="login-radio-buttons">
            <div className="login-radio">
                <input id="male" name="gender" type="radio" />
                <label htmlFor="male" className="login-radio-label">Male</label>
            </div>
            <div className="login-radio">
                <input id="female" name="gender" type="radio" />
                <label htmlFor="female" className="login-radio-label">Female</label>
            </div>
          </div>
        </div>
        <div className="login-input-holder select">
        <select className="login-select" ref={this.signupCountry} id="country" name="country" selected="Country">
          <option className="login-select-options" value="0">Country</option>
          <option className="login-select-options" value="india">India</option>
          <option className="login-select-options" value="china">China</option>
          <option className="login-select-options" value="usa">USA</option>
          <option className="login-select-options" value="russia">Russia</option>
        </select>
        </div>
      </Fragment>
    );
  };

  switchForm = (event) => {
    if(event) event.preventDefault();
    if(this.state.isLogin) {
      this.loginUserName.current.value = "";
      this.loginpassword.current.value = "";
    }else {
      this.signupUsername.current.value = "";
      this.signupFirstname.current.value = "";
      this.signupLastName.current.value = "";
      this.signupEmail.current.value = "";
      this.signupPassword.current.value = "";
      this.signupGender.current.children[1].children[0].firstElementChild.checked = false;
      this.signupGender.current.children[1].children[1].firstElementChild.checked = false;
      this.signupCountry.current.value = "0";
    }
    this.setState({
      isLogin: !this.state.isLogin,
    });
  };

  getBodyData() {
    if(this.state.isLogin) {
      return {
        userName: this.loginUserName.current.value,
        password: this.loginpassword.current.value
      }
    }
    else {
      let gender = '';
      let country = '';
      // Gender Check
      if(this.signupGender.current.children[1].children[0].firstElementChild.checked) {
        gender = 'male';
      }
      else if (this.signupGender.current.children[1].children[1].firstElementChild.checked){
        gender = 'female'
      }
      else {
        alert('Gender not selected');
      }
      // Country Check
      if(this.signupCountry.current.value!=="0") {
        country = this.signupCountry.current.value
      }
      else {
        alert('Country not selected');
      }
      return {
        userName: this.signupUsername.current.value,
        firstName: this.signupFirstname.current.value,
        lastName: this.signupLastName.current.value,
        email: this.signupEmail.current.value,
        password: this.signupPassword.current.value,
        gender,
        country
      }
    }
  };

  postData = (event) => {
    event.preventDefault()
    let url = `http://${config.host}:${config.port}/api/auth/${ this.state.isLogin ? "login" : "signup"}`;
    let data = this.getBodyData();
    let apiConfig = {
      method: this.state.isLogin ? "put" : "post",
      url,
      data,
    };
    let self = this;
    axios(apiConfig)
      .then(function (response) {
        if(self.state.isLogin) {
          self.props.login(response.data);
          self.props.history.push("/dashboard");
        }
        else {
          self.switchForm();
        }
      });
  };

  render() {
    return (
      <div className="login-page">
        <form className="login-form-container">
          {this.state.isLogin ? this.getLoginForm() : this.getSignupForm()}
          <div className="login-button-holder">
            <button onClick={event=> this.postData(event)}>{this.state.isLogin ? 'Login' : 'SignUp'}</button>
            <button onClick={event => this.switchForm(event)}> {this.state.isLogin ? "New User?" : "Existing User?"} </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null,mapDispatchToProps())(Login);
