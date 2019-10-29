import axios from 'axios';
import {Toast} from 'native-base';
const actions = {
  ADDRESS: 'ADDRESS',
  AREA: 'AREA',
  POSTLOCATION: 'POSTLOCATION',
  LOCATIONERROR: 'LOCATIONERROR',
  LOCATIONCORD: 'LOCATIONCORD',
  locationchange: location => dispatch => {
    console.log('locationchange', location);

    dispatch({
      type: actions.LOCATIONCORD,
      location: location,
    });
    console.log('location ', location);
  },

  areachange: area => dispatch => {
    dispatch({
      type: actions.AREA,
      area: area,
    });
    console.log('area ', area);
  },
  addresschange: address => dispatch => {
    dispatch({
      type: actions.ADDRESS,
      address: address,
    });
    console.log('address ', address);
  },
  postLocation: (latitude, longitude, area, address) => dispatch => {
    console.log('Locaton Posted ', latitude, longitude, area, address);
    axios
      .post('https://rn-task.dtagdev.com/api/post/location', {
        latitude,
        longitude,
        area,
        address,
      })
      .then(responseJson => {
        if (!responseJson.data.status) {
          console.log('response ', responseJson.data);
          dispatch({
            type: actions.LOCATIONERROR,
            areaError: responseJson.data.errors.area
              ? responseJson.data.errors.area[0]
              : '',
            addressError: responseJson.data.errors.address
              ? responseJson.data.errors.address[0]
              : '',
          });
        } else {
          dispatch({type: actions.POSTLOCATION});
          console.log('response ', responseJson.data);
          return Toast.show({
            text: responseJson.data.message,
            position: 'bottom',
            duration: 10000,
            type: 'success',
            textStyle: {textAlign: 'center'},
          });
        }
      })
      .catch(err => {
        console.log('Error Login ', err);
      });
  },
};

export default actions;
