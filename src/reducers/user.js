// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_EMAIL_TYPE } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL_TYPE:
    // console.log('chegou');
    return { ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
