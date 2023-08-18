import React from 'react';
import Register from '../screen/Auth/Register';
import BankDetails from '../screen/Auth/BankDetails';
import LandDetails from '../screen/Auth/LandDetails';

import DrawerContents from '../Drawer/DrawerContent';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FarmerDocumentDetails from '../screen/Auth/FarmerDocumentDetails';
import SubmitForm from '../screen/SubmitForm/SubmitForm';
import Drawstack from './Drawstack'
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer({navigation}) {
  return (
    <Drawer.Navigator
      drawerContent={() => <DrawerContents navigation={navigation} />}
      options={{headerShown: false}}>
      {/* <Drawer.Screen name="Register" component={Register} /> */}
      <Drawer.Screen
        component={Drawstack}
        options={{
          unmountOnBlur: true,
          navigation: {navigation},
          title: 'Home',
        }}
        name="Home"
      />
      <Drawer.Screen
        component={Register}
        options={{
          unmountOnBlur: true,
          navigation: {navigation},
          title: 'Personal Details',
        }}
        name="Register"
      />
      <Drawer.Screen
        // unmountOnBlur={true}
        component={BankDetails}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          title: 'Bank Details',
        }}
        name="BankDetails"
      />

      <Drawer.Screen
        component={FarmerDocumentDetails}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          title: 'FarmerDocumentDetails',
        }}
        name="FarmerDocumentDetails"
      />
      <Drawer.Screen
        component={LandDetails}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          title: 'Land Details',
        }}
        name="LandDetails"
      />
      <Drawer.Screen
        component={SubmitForm}
        navigation={navigation}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          title: '',
        }}
        name="SubmitForm"
      />
      {/* <Drawer.Screen name="DrawerContents" component={DrawerContents} /> */}
    </Drawer.Navigator>
  );
}

const HomeTab = ({navigation}) => {
  const navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen
        component={MyDrawer}
        name="Drawer"
        navigation={navigation}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        component={Register}
        unmountOnBlur={true}
        options={{
          unmountOnBlur: true,
          navigation: {navigation},
          title: 'Personal Details',
        }}
        name="Register"
      /> */}
      {/*
      <Stack.Screen
        unmountOnBlur={true}
        component={BankDetails}
        options={{
          title: 'Bank Details',
        }}
        name="BankDetails"
      />
      <Stack.Screen
        component={LandDetails}
        options={{
          title: 'Land Details',
        }}
        name="LandDetails"
      />
      <Stack.Screen
        component={FarmerDocumentDetails}
        options={{
          title: 'FarmerDocumentDetails',
        }}
        name="FarmerDocumentDetails"
      />
      <Stack.Screen
        component={SubmitForm}
        navigation={navigation}
        options={{
          title: '',
        }}
        name="SubmitForm"
      /> */}
    </Stack.Navigator>
  );
};

export default HomeTab;

// headerBackground: () => (
//   <LinearGradient
//     colors={['#318bfb', '#318bfb']}
//     style={{flex: 1}}
//     start={{x: 0.8, y: 1.0}}
//     end={{x: 0.0, y: 1.0}}
//   />
// ),
