// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { ADD_EMAIL_TYPE } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  //   case ADD_EMAIL_TYPE:
  //     // console.log('chegou');
  //     return { ...state,
  //       email: action.payload,
  //     };
  default:
    return state;
  }
};

export default walletReducer;
