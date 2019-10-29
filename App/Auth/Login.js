import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
var {height, width} = Dimensions.get('window');
import authActions from '../Redux/Auth/actions';
const {login, user, pass} = authActions;
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
export class Login extends Component {
  renderEmailErr() {
    const {emailError} = this.props;
    if (emailError != '') {
      return (
        <View style={{paddingTop: 5}}>
          <Text> {emailError} </Text>
        </View>
      );
    }
  }
  renderPassErr() {
    const {passError} = this.props;
    console.log('aaaa', passError);

    if (passError != '') {
      return (
        <View style={{paddingTop: 5}}>
          <Text> {passError} </Text>
        </View>
      );
    }
  }
  renderAccountErr() {
    const {accountError} = this.props;
    console.log('aaaa', accountError);

    if (accountError != '') {
      return (
        <View style={{paddingTop: 5}}>
          <Text> {accountError} </Text>
        </View>
      );
    }
  }
  render() {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#2190eb', '#21bae7']}
        style={{flex: 1}}>
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <View
            style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../Assets/Images/boy.png')}
              style={styles.img}
            />
          </View>
          <View style={{flex: 0.5, alignItems: 'center'}}>
            <TextInput
              style={styles.buttons}
              placeholder="الايميل"
              placeholderTextColor="#000000"
              onChangeText={text => this.props.user(text)}
            />
            {this.renderEmailErr()}
            <TextInput
              style={styles.buttons}
              secureTextEntry={true}
              placeholder="الرقم السري"
              placeholderTextColor="#000000"
              onChangeText={text => this.props.pass(text)}
            />
            {this.renderPassErr()}
            {this.renderAccountErr()}
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#20D7E3', '#20B3E7']}
              style={styles.login}>
              <Text
                onPress={_ =>
                  this.props.login(this.props.username, this.props.password)
                }
                style={styles.loginText}>
                دخول
              </Text>
            </LinearGradient>
            <Text
              onPress={_ => {
                Actions.push('signup');
              }}
              style={[styles.loginText, {fontSize: 12, marginTop: 10}]}>
              {' '}
              ليس لديك حساب ؟ قم بالتسجيل الان
            </Text>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.username,
    password: state.auth.password,
    emailError: state.auth.emailError,
    passError: state.auth.passError,
    accountError: state.auth.accountError,
    token: state.auth.token,
  };
}

export default connect(
  mapStateToProps,
  {login, user, pass},
)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: width / 2,
    height: width / 2,
    backgroundColor: 'white',
    borderRadius: width / 4,
  },
  buttons: {
    marginTop: 20,
    width: width - 50,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 15,
    textAlign: 'center',
    fontFamily: 'DroidArabic',
    fontSize: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  buttonsText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'DroidArabic',
  },
  login: {
    width: width / 3,
    height: 45,
    borderRadius: 15,
    marginTop: 80,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  loginText: {
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'DroidArabic',
    fontSize: 20,
  },
});
