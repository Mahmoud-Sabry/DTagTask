import {storeToken} from '..//../Helper';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';
const actions = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  USER: 'USER',
  PASSWORD: 'PASSWORD',
  ERROR: 'ERROR',

  user: username => dispatch => {
    dispatch({
      type: actions.USER,
      username: username,
    });
    console.log('username ', username);
  },
  pass: password => dispatch => {
    dispatch({
      type: actions.PASSWORD,
      password: password,
    });
    console.log('password ', password);
  },
  login: (email, password) => dispatch => {
    if (true) {
      //email != '' && password != ''
      console.log('Login Pressed ', email, password);
      axios
        .post('https://rn-task.dtagdev.com/api/login', {
          email,
          password,
        })
        .then(responseJson => {
          if (!responseJson.data.status) {
            console.log('response ', responseJson.data);
            dispatch({
              type: actions.ERROR,
              error: responseJson.data.errors.email
                ? responseJson.data.errors.email[0]
                : '',
              passerror: responseJson.data.errors.password
                ? responseJson.data.errors.password[0]
                : '',
              account: responseJson.data.errors.account
                ? responseJson.data.errors.account[0]
                : '',
            });
          } else {
            console.log('token:=>', responseJson.data.data.auth_data.token);
            dispatch({
              type: actions.LOGIN_SUCCESS,
              token: responseJson.data.data.auth_data.token,
            });
            storeToken(responseJson.data.data.auth_data.token);
            Actions.push('map');
          }
        })
        .catch(err => {
          // if (err.response.data.errors.username == undefined)
          //   alert(err.response.data.errors.password);
          // else alert(err.response.data.errors.username);
          console.log('Error Login ', err);
        });
    } else {
      alert('No UserName OR Password !!');
    }
  },
};

export default actions;
