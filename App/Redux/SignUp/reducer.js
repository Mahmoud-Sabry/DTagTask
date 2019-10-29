import actions from './actions';

const initialState = {
  username: '',
  email: '',
  password: '',
  passconf: '',
  passwordError: '',
  nameError: '',
  emailError: '',
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.NAME:
      return {...state, username: action.username};
    case actions.PASS:
      return {...state, password: action.password};
    case actions.EMAIL:
      return {...state, email: action.email};
    case actions.PASSCONFIRM:
      return {...state, passconf: action.passconf};
    case actions.SIGNUPERROR:
      return {
        ...state,
        passwordError: action.passerror,
        nameError: action.nameerror,
        emailError: action.emailerror,
      };
    case actions.RESET:
      return {
        username: '',
        email: '',
        password: '',
        passconf: '',
        passwordError: '',
        nameError: '',
        emailError: '',
      };
    default:
      return state;
  }
}
