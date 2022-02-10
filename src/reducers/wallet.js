// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_LOCATION_SUCCESS, GET_LOCATION_FAIL, ADD_DESPESAS_TYPE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOCATION_SUCCESS:
    // console.log('chegou');
    return { ...state,
      currencies: action.payload,
    };
  case GET_LOCATION_FAIL:
    return {
      ...state,
      error: 'DEU RUIM NA API',
    };
  case ADD_DESPESAS_TYPE:
    return {
      ...state,
      expenses: [...state.expenses, action.obj],
    };
  default:
    return state;
  }
};

export default walletReducer;
