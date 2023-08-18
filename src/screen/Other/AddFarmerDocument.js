/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {ScrollView} from 'react-native-virtualized-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {EventRegister} from 'react-native-event-listeners';
import {KYC_DETAILS_CONSTANT} from '../../constant/Constant';
import FarmerDocumentComponent from './FarmerDocumentComponent';
import {withNavigation} from 'react-navigation';

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {clearKycDetails} from '../../redux/Action/formAction';

let storedValue;
class AddFarmerDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentObjects: [],
      totalLandDetails: 0,
      totalValidCards: 0,
    };

    this.totalValidCardFunction = this.totalValidCardFunction.bind(this);
    this.emptyValidCardFunction = this.emptyValidCardFunction.bind(this);
    this.moveOnWithoutValidation = this.moveOnWithoutValidation.bind(this);
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      var array = [];
      this.props.storedKycDetailValues
        .map((item, index) => {
          console.log('indexxxxxxxxxxxxxxxxxxxxxxxx', index, item.length);
          // this.setState({totalValidCards:index});
          array.push(
            <FarmerDocumentComponent
              storeValuesRedux={item}
              totalValidCardFunction={this.totalValidCardFunction}
              emptyValidCardFunction={this.emptyValidCardFunction}
              moveOnWithoutValidation={this.moveOnWithoutValidation}
              key={index + 1}
              index={index + 1}
            />,
          );

          this.setState({
            componentObjects: array,
            totalLandDetails: index + 1,
          });
        })
        .reverse();
      // this.props.clearRedux();
    });

    // this._blurListener = this.props.navigation.addListener('blur', () => {
    //   console.log('Blurrred');
    //   this.setState({
    //     componentObjects: [],
    //     totalLandDetails: 0,
    //   });
    // });
  }

  componentWillUnmount() {
    this._unsubscribe();
    // this._blurListener();
  }

  moveOnWithoutValidation() {

     }

  totalValidCardFunction() {
    
    this.setState({totalValidCards: this.state.totalValidCards++});
    console.log(
      'Total Valid Farmer KYC Detials Cards-->' + this.state.totalValidCards,
    );

    if (this.state.totalLandDetails == this.state.totalValidCards) {
      console.log('All Documnts Valid');
      this.props.navigation.navigate('LandDetails');
    }

    console.log('Total Cards-->', this.state.totalLandDetails);
  }

  emptyValidCardFunction() {}

  addComponent() {
    var array = [...this.state.componentObjects];
    array.push(
      <FarmerDocumentComponent
        storeValuesRedux={''}
        totalValidCardFunction={this.totalValidCardFunction}
        emptyValidCardFunction={this.emptyValidCardFunction}
        moveOnWithoutValidation={this.moveOnWithoutValidation}
        key={this.state.componentObjects.length + 1}
        index={this.state.componentObjects.length + 1}
      />,
    );

    this.setState({
      componentObjects: array,
      totalLandDetails: this.state.componentObjects.length + 1,
    });
  }

  removeComponent() {
    this.props.clearRedux();
    var array = [...this.state.componentObjects];
    array.splice(array.length - 1, 1);
    this.setState({totalValidCards: --this.state.totalValidCards});
    this.setState({
      componentObjects: array,
      totalLandDetails: array.length,
    });
  }

  print() {
    console.log(
      'this.state.componentObjects-->' +
        JSON.stringify(this.state.componentObjects, null, 2),
    );
  }

  render() {
    return (
      <View style={{marginBottom: 50}}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              console.log('Add Pressed');
              this.addComponent();
            }}
            style={{
              flex: 1,
              padding: 10,
              elevation: 1,
              borderRadius: 20,
              alignItems: 'center',
              borderColor: 'black',
            }}>
            <Text style={{color: 'black'}}>Add</Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'black'}}>{this.state.totalLandDetails}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.removeComponent();
            }}
            style={{
              flex: 1,
              padding: 10,
              elevation: 1,
              borderRadius: 20,
              alignItems: 'center',
              borderColor: 'black',
            }}>
            <Text style={{color: 'black'}}>Remove</Text>
          </TouchableOpacity>
        </View>

        {this.state.componentObjects.length > 0 ? (
          <ScrollView>
            {this.state.componentObjects
              .map(item => {
                return item;
              })
              .reverse()}
          </ScrollView>
        ) : (
          <View style={{padding: 20}}>
            <Text style={{color: 'black'}}>
              Press Add to add Document Detials
            </Text>
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  // console.log('state', state.formReducer.kycDetailsState);
  return {
    storedKycDetailValues: state.formReducer.kycDetailsState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearRedux: () => {
      dispatch(clearKycDetails());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFarmerDocument);
