import api from '../services/api';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {loggedOutSuccessfully } from '../redux/ExportAction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

class DrawerContents extends Component {
  constructor(props) {
    super(props);
    this.namefunct();
    this.state = {
      name: undefined,
      witchUser: undefined,
    };
  }

  async namefunct() {
    this.setState({name: await AsyncStorage.getItem('userName')});
    this.setState({witchUser: await AsyncStorage.getItem('roles')});
  }

  async logOut() {
    api
      .logout(await AsyncStorage.getItem('accessToken'))
      .then(async res => {
        console.log('response', res.data);
        await AsyncStorage.getAllKeys()
          .then(keys => AsyncStorage.multiRemove(keys))
          .then(() => {
            console.log('removeAllAsyncData')
            this.props.logOut();
          });
        // this.props.navigation.navigate('Login');
      })
      .catch(err => {
        console.log('err', err);
      });
  }
  render() {
    return (
      <View style={{margin: 10, flex: 1, flexDirection: 'column'}}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="account-circle" color="gray" size={100} />
          <Text
            style={{
              color: '#000',
              fontSize: 15,
            }}>{`( ${this.state.witchUser})`}</Text>
          <Text style={{color: '#000', fontSize: 20,padding:10}}>{this.state.name}</Text>
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 100,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.logOut();
            }}>
            <Text style={{color: 'black', textAlign: 'center', fontSize: 20}}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    logOut:()=>{
      dispatch(loggedOutSuccessfully())
    }
  }
}

export default connect(undefined,mapDispatchToProps)(DrawerContents)