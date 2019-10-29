import React from 'react';
import {Scene, Router, ActionConst, Drawer} from 'react-native-router-flux';
//////Pages//////
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Map from './Main/Map';
//
const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="Auth" hideNavBar initial>
          <Scene key="login" component={Login} initial />
          <Scene key="signup" component={SignUp} />
          <Scene key="map" component={Map} />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
