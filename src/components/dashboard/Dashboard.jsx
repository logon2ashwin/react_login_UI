import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {signout as signoutAction} from "store/actions";
import "./dashboard.scss"


const Dashboard = (props) => {
  const { firstName, lastName, token, userId, isLogged } = useSelector(state => state.userdata);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!isLogged) {
      props.history.push("/login");
    }
  },[]);
  let signout = () => {
    dispatch(signoutAction());
    props.history.push("/login");
  };

  return (
  <div className="app-dashboard">
    <p>Hi {`${firstName} ${lastName}`}</p>
    <p>Your Bearer Token is "{token}"</p>
    <p>Your User ID is "{userId}"</p>
    <button onClick={()=> signout()}>Sign Out</button>
  </div>
  );
}

export default Dashboard;
