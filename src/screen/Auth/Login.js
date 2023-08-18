import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  ENCRYPTIONIV,
  ENCRYPTIONKEY,
} from '../../constant/Constant';
import {connect} from 'react-redux';
import api from '../../services/api';
import React, {Component} from 'react';
import CryptoJS from 'react-native-crypto-js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loggedInSuccessfully,
  loggedOutSuccessfully,
} from '../../redux/ExportAction';

let _loadingDeg = new Animated.Value(0);
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      hidePassword: true,
      // username: '7385455311',
      // password: 'nwRfZMEf',
      // username: 'agdisolution@gmail.com',
      // password: 'agdi@2023',
      username: 'vasundharafaundation55@gmail.com',
      password: 'vasundhara@2023',
      // username: 'dinesh.mangiraj@vasundhara.life',
      // password: 'dinesh@2023',
      allowLogin: true,
      showError: false,
    };
  }

  componentDidMount() {}
  _animationLoadingDeg = () => {
    Animated.timing(_loadingDeg, {
      useNativeDriver: true,
      toValue: 1,
      duration: 1000,
    }).start(() => {
      _loadingDeg.setValue(0);
      if (this.state.loading) this._animationLoadingDeg();
    });
  };

  async aesDecryption(name, data) {
    var decrypted;

    (decrypted = CryptoJS.AES.decrypt(
      data,
      CryptoJS.enc.Utf8.parse(ENCRYPTIONKEY),
      {
        iv: CryptoJS.enc.Utf8.parse(ENCRYPTIONIV),
        mode: CryptoJS.mode.CBC,
      },
    ).toString(CryptoJS.enc.Utf8)),
      console.log('decrypted to string===', name + '-' + decrypted),
      await AsyncStorage.setItem(name, decrypted);
    // this.props.navigation.navigate('HomeTab');
  }

  async storeAccessToken(name, data) {
    return new Promise(async (resolve, reject) => {
      var decrypted;

      (decrypted = CryptoJS.AES.decrypt(
        data,
        CryptoJS.enc.Utf8.parse(ENCRYPTIONKEY),
        {
          iv: CryptoJS.enc.Utf8.parse(ENCRYPTIONIV),
          mode: CryptoJS.mode.CBC,
        },
      ).toString(CryptoJS.enc.Utf8)),
        await AsyncStorage.setItem(name, decrypted)
          .then(
            resolve('AccessTokenStroed'),
            console.log('000000000', name, decrypted),
          )
          .catch(reject('AccessTokenNotStored'));
    });
  }

  switchCase(variable, object) {
    // console.log('--->>' + object[variable]);
    switch (variable) {
      case 'ID':
        // console.log('ID--->>', object[variable]);
        return this.aesDecryption('userId', object[variable]);
      case 'access_token':
        return this.storeAccessToken('accessToken', object[variable])
          .then(res => {
            this.props.logIn();
            console.log('Access_Token-->' + res);
          })
          .catch(err => {
            console.log('Line Number 100-->' + err);
          });
      case 'email':
        return this.aesDecryption('emailId', object[variable]);
      case 'expires_in':
        return this.aesDecryption('expiresIn', object[variable]);
      case 'refresh_token':
        return this.aesDecryption('refreshToken', object[variable]);
      // case 'roles':
      //   return this.aesDecryption('roles', object[variable]);
      case 'username':
        return this.aesDecryption('userName', object[variable]);
      case 'tenant_id':
        return this.aesDecryption('tenantId', object[variable]);
    }
  }

  _AESDecryption = data => {
    let localArray = [];
    localArray.push(data);
    localArray.map(item => {
      let keys = Object.keys(item);
      keys.map(item => {
        this.switchCase(item, data);
      });
    });
  };

  _onLogin = async (userName, password) => {
    console.log('userName->' + userName + 'password->' + password);
    {
      this.state.allowLogin &&
        api
          .login(userName, password)
          .then(async res => {
            console.log('response', res.data);
            console.log('==================>', res.data);
            if (res.data.token == 'Incorrect Username or Password!!!') {
              this.setState({showError: true});
            } else {
              console.log('LoginResponse', JSON.stringify(res.data, null, 2));
              this._AESDecryption(res.data);
              await AsyncStorage.setItem('roles', res.data.roles[0].role_name);

              // if (
              //   res.data.roles[0].role_name === 'SLA Admin' ||
              //   res.data.roles[0].role_name === 'SLA Employee'
              // ) {
              //   Alert.alert(
              //     '401 Unauthorized',
              //     'Access Denied For SLA Admin & SLA Employee',
              //     [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              //   );
              // } else {
              //   console.log('LoginResponse', JSON.stringify(res.data, null, 2));
              //   this._AESDecryption(res.data);
              //   await AsyncStorage.setItem(
              //     'roles',
              //     res.data.roles[0].role_name,
              //   );
              // }
            }

            this.setState({loading: false});
            // this.props.navigation.navigate('HomeTab');
          })
          .catch(err => {
            this.setState({loading: false});
            if (err.response.status == 500) {
              Alert.alert('Server Error', 'Please try after some time', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
            }
            console.log('error---------------->', err);
          });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.loading && (
          <View style={styles.loadingWrapper}>
            <View style={styles.loading}>
              <Animated.Image
                onLayout={this._animationLoadingDeg}
                style={{
                  width: 30,
                  height: 30,
                  marginRight: 10,
                  transform: [
                    {
                      rotate: _loadingDeg.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                }}
                source={require('./../../assets/waiting.png')}
              />
              <Text
                style={{
                  fontWeight: '500',
                  color: '#333',
                }}>
                loading...
              </Text>
            </View>
          </View>
        )}
        {/* <View style={styles.languageChooser}>
          <TouchableOpacity style={styles.btnCurLanguage}>
            <Text style={styles.curLanguage}>Tieng Viet (Viet Nam)</Text>
            <Icon name="chevron-down" size={20} color="#333" />
          </TouchableOpacity>
        </View> */}
        <View style={styles.centerContainer}>
          <View style={styles.logoWrapper}>
            <Text style={{fontSize: 30, fontWeight: '900', color: '#000'}}>
              AGDI
            </Text>
            {/* <Image
              resizeMode="contain"
              style={styles.logo}
              source={require('../../assets/RhythmflowsLogo.png')}
            /> */}
          </View>
          <View style={styles.loginForm}>
            <View style={styles.textInputWrapper}>
              <TextInput
                placeholderTextColor={'gray'}
                color={'#000'}
                autoCapitalize="none"
                value={this.state.username}
                onChangeText={text => {
                  this.setState({username: text});
                  this.setState({showError: false});
                }}
                placeholder=" Email or phone number"
                style={styles.input}
              />
            </View>
            <View style={styles.textInputWrapper}>
              <TextInput
                value={this.state.password}
                onChangeText={text => {
                  this.setState({password: text});
                  this.setState({showError: false});
                  if (
                    this.state.username != undefined &&
                    text != undefined &&
                    text != ''
                  ) {
                    this.setState({allowLogin: true});
                  } else {
                    this.setState({allowLogin: false});
                  }
                }}
                color={'#000'}
                secureTextEntry={this.state.hidePassword}
                placeholder="Password"
                placeholderTextColor={'gray'}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.hidePasswordIcon}
                onPress={() => {
                  {
                    this.state.hidePassword
                      ? this.setState({hidePassword: false})
                      : this.setState({hidePassword: true});
                  }
                }}>
                {this.state.hidePassword ? (
                  <Icon name="eye-off-outline" size={20} color="#333" />
                ) : (
                  <Icon name="eye-outline" color="#318bfb" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {this.state.showError && (
              <View style={styles.otherOptionsWrapper}>
                <Text style={{fontSize: 12, color: 'red'}}>
                  Incorrect Username or Password!
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={() => {
                this.setState({loading: true});
                this._onLogin(this.state.username, this.state.password);
              }}
              disabled={!this.state.allowLogin}
              activeOpacity={0.6}
              style={{
                ...styles.btnLogin,
                opacity: this.state.allowLogin ? 1 : 0.6,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#fff',
                  fontWeight: '500',
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.otherOptionsWrapper}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ForgotPassword');
              }}
              style={styles.forgotPassword}
              activeOpacity={1}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#333',
                }}>
                <Text
                  style={{
                    fontWeight: '500',
                    color: '#333',
                  }}>
                  Did your forget your login information?
                </Text>{' '}
                Get helping to login.
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
        {/* <TouchableOpacity
          onPress={() => {
            console.log('register Page');
            this.props.navigation.navigate('Register');
          }}
          activeOpacity={1}
          style={styles.registerWrapper}>
          <Text
            style={{
              color: '#333',
              textAlign: 'center',
              fontSize: 12,
              fontWeight: '600',
            }}>
            <Text
              style={{
                fontWeight: '500',
                color: '#333',
              }}>
              Don't have account?
            </Text>{' '}
            Register now.
          </Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logIn: () => {
      dispatch(loggedInSuccessfully());
    },
    logOut: () => {
      dispatch(loggedOutSuccessfully());
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: SCREEN_HEIGHT,
  },
  languageChooser: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCurLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  curLanguage: {
    color: '#333',
  },
  centerContainer: {
    height: SCREEN_HEIGHT - 50 - 40 - 100,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    marginBottom: 20,
  },
  logo: {
    height: 64,
    overflow: 'hidden',
  },
  loginForm: {
    width: SCREEN_WIDTH * 0.9,
  },
  textInputWrapper: {
    position: 'relative',
    width: '100%',
    height: 44,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 7.5,
  },
  hidePasswordIcon: {
    position: 'absolute',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    right: 5,
    top: (44 - 30) / 2,
  },
  input: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
  },
  btnLogin: {
    marginTop: 7.5,
    width: '100%',
    height: 44,
    borderRadius: 5,
    backgroundColor: '#318bfb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherOptionsWrapper: {
    width: SCREEN_WIDTH * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    width: SCREEN_WIDTH * 0.8,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divideLine: {
    marginVertical: 10,
    position: 'relative',
    height: 2,
    width: '100%',
    backgroundColor: '#ddd',
  },
  ORtextWrapper: {
    width: 40,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    top: (2 - 20) / 2,
    left: (SCREEN_WIDTH * 0.9 - 40) / 2,
    position: 'absolute',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  btnLoginWithFacebook: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerWrapper: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  loadingWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 99,
  },
  loading: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
