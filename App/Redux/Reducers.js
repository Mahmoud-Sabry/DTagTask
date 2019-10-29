import {combineReducers} from 'redux';
import AuthReducer from './Auth/reducer';
import SignUpReducer from './SignUp/reducer';
import MapReducer from './Map/reducer';
export default combineReducers({
  auth: AuthReducer,
  signup: SignUpReducer,
  map: MapReducer,
});
