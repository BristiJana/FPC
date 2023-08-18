import {LOGGEDIN, LOGGEDOUT} from '../ReduxConstant';

const initialState = {
  loginState: false,
};

export const loginReducer = (state = initialState, actionObject) => {
  switch (actionObject.type) {
    case LOGGEDIN: {
      return {
        ...state,
        loginState: true,
      };
    }
    case LOGGEDOUT: {
      return {
        ...state,
        loginState: false,
      };
    }
    default:
      return state;
  }
};
