import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {Root, Toast} from 'native-base';
import signupActons from '../Redux/SignUp/actions';
import {connect} from 'react-redux';
const {signup, pass, passconfig, user, mail, reset} = signupActons;
var {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';

export class SignUp extends Component {
  renderEmailError() {
    const {emailError} = this.props;
    console.log('aaaa', emailError);

    if (emailError != '') {
      return (
        <View style={{paddingTop: 5}}>
          <Text style={{textAlign: 'center'}}> {emailError} </Text>
        </View>
      );
    }
  }

  renderNameError() {
    const {nameError} = this.props;
    console.log('aaaa', nameError);

    if (nameError != '') {
      return (
        <View style={{paddingTop: 5}}>
          <Text style={{textAlign: 'center'}}> {nameError} </Text>
        </View>
      );
    }
  }

  renderPassError() {
    const {passwordError} = this.props;
    console.log('aaaa', passwordError);

    if (passwordError != '') {
      return (
        <View style={{paddingTop: 5}}>
          <Text style={{textAlign: 'center'}}> {passwordError} </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <Root>
        <View style={{flex: 1}}>
          <StatusBar hidden={true} />
          <View style={styles.Header}>
            <ImageBackground
              style={{flex: 1, flexDirection: 'row'}}
              source={require('../Assets/Images/1.jpg')}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={_ => {
                    this.props.reset();
                  }}
                  style={{alignSelf: 'flex-end', padding: 10}}>
                  <Image
                    style={{width: 30, height: 30}}
                    source={require('../Assets/Images/left-arrow.png')}
                  />
                </TouchableOpacity>
                <View style={{alignSelf: 'flex-end', padding: 10}}>
                  <Text
                    style={[styles.texts, {color: '#ffffff', fontSize: 25}]}>
                    تسجيل البيانات كمستخدم
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <ScrollView>
            <View style={styles.TextInputs}>
              <Text style={styles.texts}>الاسم</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={text => this.props.user(text)}
              />
            </View>
            {this.renderNameError()}
            <View style={styles.TextInputs}>
              <Text style={styles.texts}>الايميل</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={text => this.props.mail(text)}
              />
            </View>
            {this.renderEmailError()}
            <View style={styles.TextInputs}>
              <Text style={styles.texts}>الباسورد</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={text => this.props.pass(text)}
              />
            </View>
            {this.renderPassError()}
            <View style={styles.TextInputs}>
              <Text style={styles.texts}>تأكيد الباسورد</Text>
              <TextInput
                style={styles.inputStyle}
                onChangeText={text => this.props.passconfig(text)}
              />
            </View>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#20D7E3', '#20B3E7']}
              style={styles.login}>
              <Text
                onPress={_ =>
                  this.props.signup(
                    this.props.username,
                    this.props.email,
                    this.props.password,
                    this.props.passconf,
                  )
                }
                style={styles.loginText}>
                تسجيل
              </Text>
            </LinearGradient>
            <View>
              <Text>{}</Text>
            </View>
          </ScrollView>
        </View>
      </Root>
    );
  }
}

function mapStateToProps({signup}) {
  return {
    username: signup.username,
    password: signup.password,
    email: signup.email,
    passconf: signup.passconf,
    passwordError: signup.passwordError,
    nameError: signup.nameError,
    emailError: signup.emailError,
  };
}

export default connect(
  mapStateToProps,
  {signup, pass, passconfig, user, mail, reset},
)(SignUp);

const styles = StyleSheet.create({
  Header: {
    height: height / 6,
    // backgroundColor: 'transparent',
  },
  TextInputs: {
    marginTop: 40,
    height: 80,
    alignItems: 'center',
  },
  texts: {
    fontSize: 20,
    fontFamily: 'DroidArabic',
    color: '#2079EE',
  },
  inputStyle: {
    color: '#2079EE',
    width: width - 50,
    fontSize: 18,
    // lineHeight: 100,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2079EE',
    fontFamily: 'DroidArabic',
  },
  login: {
    width: width / 3,
    height: 45,
    borderRadius: 15,
    alignSelf: 'center',
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
