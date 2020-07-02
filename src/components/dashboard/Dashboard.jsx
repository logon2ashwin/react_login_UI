import React, { useState, useEffect } from 'react';
import "./dashboard.scss"


const Dashboard = (props) => {
  const [ userData, setUserData ] = useState({
    firstName : '',
    lastName: '',
    token: '',
    userId: ''
  });

  useEffect(() => {
    if(localStorage.isLogged !=="1") {
      props.history.push("/login");
    }
    else {
      setUserData(prevState => {
        return {
          ...prevState,
          ...props.location.state
        }
      });
    }
  },[]);
  let signout = () => {
    localStorage.userId = null
    localStorage.token = null
    localStorage.userName = null
    localStorage.firstName = null
    localStorage.lastName = null
    localStorage.isLogged = 0
    props.history.push("/login");
  };

  return (
  <div className="app-dashboard">
    <p>Hi {`${userData.firstName} ${userData.lastName}`}</p>
    <p>Your Bearer Token is "{userData.token}"</p>
    <p>Your User ID is "{userData.userId}"</p>
    <button onClick={()=> signout()}>Sign Out</button>
  </div>
  );
}

export default Dashboard;
