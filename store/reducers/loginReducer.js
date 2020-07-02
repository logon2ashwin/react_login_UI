import { LOGIN_USER, SIGNOUT_USER } from "../actions";

const initialState = {
  token: "",
  userId: "",
  userName: "",
  firstName: "",
  lastName: "",
  isLogged: false
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      console.log('loginuser');
      return {
        ...state,
        ...action.payload,
        isLogged: true
      };
    case SIGNOUT_USER: 
      return {
        isLogged: false
      }
    default:
      return state;
  }
};

export default loginReducer;
