import React, {Component} from 'react';
import * as constant from '../../constant/Constant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {EventRegister} from 'react-native-event-listeners';
import AddFarmerDocument from '../Other/AddFarmerDocument';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

class FarmerDocumentDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              // this.props.navigation.goBack(null);
              this.props.navigation.navigate("BankDetails")
            }}>
            <Ionicons
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
              }}
              name="arrow-back"
              size={25}
              color={'#555'}
            />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={style.farmerRegistrationText}>
              Farmer Document Details
            </Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <AddFarmerDocument navigation={this.props.navigation} />
        </View>
        <TouchableOpacity
          style={[style.fab]}
          onPress={() => {
            this.props.navigation.navigate('LandDetails');
            EventRegister.emit(constant.KYC_DETAILS_CONSTANT);
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, color: 'white'}}>Next</Text>
            <Ionicons
              name="md-arrow-redo-outline"
              size={30}
              color={'#fff'}></Ionicons>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}

export default FarmerDocumentDetails;

const style = StyleSheet.create({
  mainView: {
    elevation: 1,
    marginVertical: 10,
    // marginBottom:30,
    marginHorizontal: 13,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  heading: {
    marginHorizontal: 5,
    marginVertical: 5,
    fontSize: (constant.SCREEN_HEIGHT * 1.5) / 100,
    // margin: 5,
    color: 'black',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    padding: 10,
    backgroundColor: '#000',
    // backgroundColor: '#228B22',
    borderRadius: 25,
  },
  farmerRegistrationText: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#000',
    padding: 10,
  },
});
