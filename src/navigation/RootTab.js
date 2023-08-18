import HomeTab from './HomeTab';
import {connect} from 'react-redux';
import AuthStack from './AuthStack';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';

import {
  loggedInSuccessfully,
  loggedOutSuccessfully,
} from '../redux/ExportAction';
import api from '../services/api';

const Stack = createStackNavigator();
const navigationOptions = {
  headerShown: false,
};

const RootTab = props => {
  const navigation = createNavigationContainerRef();

  useEffect(() => {
    // checkUserIsLoginorNot();
    gender();
  }, []);

  const gender = async () => {
    api
      .Gender()
      .then(res => {
        checkUserIsLoginorNot();
        console.log('auth Token Not Expire');
      })
      .catch(async err => {
        console.log("e",err.response.status)
        if ((err.response.status = 401)) {
          props.logOut();
          console.log('auth Token Expire', err);
        }
      });
  };

  const checkUserIsLoginorNot = async () => {
    console.log(
      '1111111111111111111111',
      await AsyncStorage.getItem('accessToken'),
    );
    if ((await AsyncStorage.getItem('accessToken')) != null) {
      props.logIn();
    } else {
      props.logOut();
    }
  };

  return (
    <NavigationContainer ref={navigation}>
      <Stack.Navigator
        initialRouteName={props.isLoggedin ? 'HomeTab' : 'AuthStack'}
        screenOptions={navigationOptions}>
        {!props.isLoggedin && (
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            navigation={navigation}
          />
        )}
        {props.isLoggedin && (
          <Stack.Screen
            name="HomeTab"
            component={HomeTab}
            navigation={navigation}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  console.log(
    '------------------->MMMxxxxxxxxxxxxxxxxxxxxxx' +
      JSON.stringify(state.formReducer, null, 2),
  );
  return {
    isLoggedin: state.loginReducer.loginState,
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(RootTab);
