import {
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import ForgotPassword from '../screen/Auth/ForgotPassword';
import Register from '../screen/Auth/Register';
import Login from '../screen/Auth/Login';
import BankDetails from '../screen/Auth/BankDetails';
import LandDetails from '../screen/Auth/LandDetails';
import FarmerDocumentDetails from '../screen/Auth/FarmerDocumentDetails';
import SubmitForm from '../screen/SubmitForm/SubmitForm';

const Stack = createStackNavigator();
const AuthStack = ({navigation}) => {
  const navigationOptions = {
    headerShown: true,
    gestureEnabled: false,
  };
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen
        component={Login}
        name="Login"
        options={{headerShown: false}}
        navigation={navigation}
      />
      <Stack.Screen
        component={Register}
        options={{
          navigation: {navigation},
          title: 'Personal Details',
        }}
        name="Register"
      />
      <Stack.Screen
        component={BankDetails}
        options={{
          title: 'Bank Details',
          headerShown: false,
        }}
        name="BankDetails"
      />
      <Stack.Screen
        component={LandDetails}
        options={{
          title: 'Land Details',
          headerShown: false,
        }}
        name="LandDetails"
      />
      <Stack.Screen
        component={SubmitForm}
        options={{
          title: "",
          headerShown: false,
        }}
        name="SubmitForm"
      />
      <Stack.Screen
        component={FarmerDocumentDetails}
        options={{
          title: 'FarmerDocumentDetails',
          headerShown: false,
        }}
        name="FarmerDocumentDetails"
      />
      <Stack.Screen
        component={ForgotPassword}
        options={{headerShown: false}}
        name="ForgotPassword"
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

// headerBackground: () => (
//   <LinearGradient
//     colors={['#318bfb', '#318bfb']}
//     style={{flex: 1}}
//     start={{x: 0.8, y: 1.0}}
//     end={{x: 0.0, y: 1.0}}
//   />
// ),
