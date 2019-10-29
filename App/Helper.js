import AsyncStorage from '@react-native-community/async-storage';

export const storeToken = async token => {
  try {
    console.log('storeToken');
    await AsyncStorage.setItem('auth_token', token);
    console.log('store value', token);
  } catch (e) {
    console.log('store error', e);
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('auth_token');
    if (value != null) {
      console.log('getToken value', value);
    }
  } catch (e) {
    console.log('get error', e);
  }
};
