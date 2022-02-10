import coinAPI from '../services/coinApi';

export const ADD_EMAIL_TYPE = 'ADD_EMAIL';
export const GET_LOCATION = 'GET_LOCATION';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';
export const GET_LOCATION_FAIL = 'GET_LOCATION_FAIL';
export const ADD_DESPESAS_TYPE = 'ADD_DESPESAS_TYPE';

// Action Creator
export const getLocation = () => ({
  type: GET_LOCATION,
});

export const getCoinSuccess = (payload) => ({
  type: GET_LOCATION_SUCCESS,
  payload,
});

export const getLocationFail = () => ({
  type: GET_LOCATION_FAIL,
});

export const getCoinThunk = () => async (dispatch) => {
  try {
    const location = await coinAPI();
    // console.log(location);
    dispatch(getCoinSuccess(location));
  } catch (error) {
    console.log('Erro');
    dispatch(getLocationFail());
  }
};

export const addEmail = (payload) => ({
  type: ADD_EMAIL_TYPE,
  payload,

});

export const addDespesas = (obj) => ({
  type: ADD_DESPESAS_TYPE,
  obj,
});
