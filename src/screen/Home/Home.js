import {Text, View} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContents from '../../Drawer/DrawerContent';
import RegisterDScreen from '../../Drawer/DrawerScreen/RegisterDScreen';
import Register from '../Auth/Register';

const Drawer = createDrawerNavigator();

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.getData();
  }

  async getData() {
    await AsyncStorage.getAllKeys().then(keys => console.log(keys));

    console.log(
      'AccessToken-------->',
      await AsyncStorage.getItem('accessToken'),
    );
  }

  render() {
    return (
      <Drawer.Navigator
        drawerContent={() => (
          <DrawerContents navigation={this.props.navigation} />
        )}>
        <Drawer.Screen
          name="RegisterDScreen"
          navigation={this.props.navigation}
          component={RegisterDScreen}
        />

        {/* <Drawer.Screen name="Article" component={Article} /> */}
      </Drawer.Navigator>
    );
  }
}
{
  /* <RegisterDScreen navigation={this.props.navigation} /> */
}
