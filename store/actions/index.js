// Login Component Actions
export const LOGIN_USER = "LOGIN_USER";
export const SIGNOUT_USER = "SIGNOUT_USER";


export const login = (data) => {
  return {
    type : LOGIN_USER,
    payload : data
  };
};

export const signout = () => {
  return {
    type : SIGNOUT_USER
  };
};



