import actions from './actions';
const initialState = {
  latitude: 30.78825,
  longitude: 30.78825,
  area: '',
  address: '',
  areaError: '',
  addressError: '',
  toast: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.AREA:
      return {...state, area: action.area};
    case actions.ADDRESS:
      return {...state, address: action.address};
    case actions.POSTLOCATION:
      return {...state, areaError: '', addressError: ''};
    case actions.LOCATIONCORD:
      return {
        ...state,
        latitude: action.location.latitude,
        longitude: action.location.longitude,
        toast: true,
      };
    case actions.TOASTRESET:
      return {...state, toast: false};
    case actions.LOCATIONERROR:
      return {
        ...state,
        areaError: action.areaError,
        addressError: action.addressError,
      };
    default:
      return state;
  }
}
