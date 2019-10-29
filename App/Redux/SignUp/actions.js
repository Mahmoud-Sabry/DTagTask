import axios from 'axios';
import {Actions} from 'react-native-router-flux';
import {Toast} from 'native-base';
const actions = {
  SIGNUPERROR: 'SIGNUPERROR',
  NAME: 'NAME',
  PASS: 'PASS',
  PASSCONFIRM: 'PASSCONFIRM',
  EMAIL: 'EMAIL',
  RESET: 'RESET',
  reset: () => dispatch => {
    dispatch({
      type: actions.RESET,
    });
    Actions.pop();
  },
  ///////////////////////////////////////////////////////////////////////////////////////////////
  user: username => dispatch => {
    dispatch({
      type: actions.NAME,
      username: username,
    });
    console.log('username ', username);
  },
  mail: email => dispatch => {
    dispatch({
      type: actions.EMAIL,
      email: email,
    });
    console.log('email ', email);
  },
  passconfig: passconf => dispatch => {
    dispatch({
      type: actions.PASSCONFIRM,
      passconf: passconf,
    });
    console.log('passconf ', passconf);
  },
  pass: password => dispatch => {
    dispatch({
      type: actions.PASS,
      password: password,
    });
    console.log('password ', password);
  },
  signup: (name, email, password, password_confirmation) => dispatch => {
    console.log(
      'signup Pressed ',
      name,
      email,
      password,
      password_confirmation,
    );
    axios
      .post('https://rn-task.dtagdev.com/api/register', {
        name,
        email,
        password,
        password_confirmation,
      })
      .then(responseJson => {
        console.log('response sign up', responseJson.data);
        if (!responseJson.data.status) {
          console.log('response ', responseJson.data);
          dispatch({
            type: actions.SIGNUPERROR,
            emailerror: responseJson.data.errors.email
              ? responseJson.data.errors.email[0]
              : '',
            passerror: responseJson.data.errors.password
              ? responseJson.data.errors.password[0]
              : '',
            nameerror: responseJson.data.errors.name
              ? responseJson.data.errors.name[0]
              : '',
          });
        } else {
          Toast.show({
            text: responseJson.data.message,
            position: 'bottom',
            duration: 10000,
            type: 'success',
            textStyle: {textAlign: 'center'},
          });
          dispatch({
            type: actions.RESET,
          });
        }
      })
      .catch(err => {
        console.log('Error Sign UP ', err);
      });
  },
};

export default actions;
