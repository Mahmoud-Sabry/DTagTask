import actions from './actions';

const initialState = {
  username: '',
  password: '',
  emailError: '',
  passError: '',
  accountError: '',
  token: 0,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        emailError: '',
        passError: '',
        accountError: '',
      };
    case actions.USER:
      return {...state, username: action.username};
    case actions.PASSWORD:
      return {...state, password: action.password};
    case actions.ERROR:
      return {
        ...state,
        emailError: action.error,
        passError: action.passerror,
        accountError: action.account,
      };
    default:
      return state;
  }
}
