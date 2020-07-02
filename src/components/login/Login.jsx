import React, { Component, Fragment, createRef } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import config from "../../../config";
import "./Login.scss";

class Login extends Component {
  constructor() {
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
    this.sugnupEmail = createRef();
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
          <input className="login-input" ref={this.sugnupEmail} type="email" required />
          <label className="login-label" onClick={() => this.sugnupEmail.current.focus()}> Email </label>
        </div>
        <div className="login-input-holder">
          <input className="login-input" ref={this.signupPassword} type="password" required />
          <label className="login-label" onClick={() => this.signupPassword.current.focus()}> Password </label>
        </div>
        <div className="login-input-holder">
          <input className="login-input" ref={this.signupGender} type="text" required />
          <label className="login-label" onClick={() => this.signupGender.current.focus()}> Gender </label>
        </div>
        <div className="login-input-holder">
          <input className="login-input" ref={this.signupCountry} type="text" required />
          <label className="login-label" onClick={() => this.signupCountry.current.focus()}> Country </label>
        </div>
      </Fragment>
    );
  };

  switchForm = (event) => {
    event.preventDefault();
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
      return {
        userName: this.signupUsername.current.value,
        firstName: this.signupFirstname.current.value,
        lastName: this.signupLastName.current.value,
        email: this.sugnupEmail.current.value,
        password: this.signupPassword.current.value,
        gender: this.signupGender.current.value,
        country: this.signupCountry.current.value
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
    console.log(apiConfig);
    axios(apiConfig)
      .then(function (response) {
        console.log(response.data);
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

export default Login;
