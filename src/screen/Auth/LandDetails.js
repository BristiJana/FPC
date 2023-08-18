import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import * as constant from '../../constant/Constant';
import AddLandDetials from '../Other/AddLandDetails';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {EventRegister} from 'react-native-event-listeners';

class LandDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              this.props.navigation.navigate("FarmerDocumentDetails")
              // this.backAction();
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
            <Text style={style.farmerRegistrationText}>Land Details</Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <AddLandDetials navigation={this.props.navigation} />
        </View>

        <TouchableOpacity
          style={[style.fab]}
          onPress={() => {
            EventRegister.emit(constant.LAND_DETAILS_CONSTANT);
            this.props.navigation.navigate('SubmitForm');
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // marginHorizontal:10
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
const mapStateToProps = state => {
  return {
    
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(LandDetails);

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
  textInputStyle: {
    // marginHorizontal: 5,
    // marginVertical: 5,
    marginBottom: 10,
    padding: 10,
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
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
