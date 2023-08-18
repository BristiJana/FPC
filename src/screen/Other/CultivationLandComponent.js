import {Text, View, StyleSheet, TextInput} from 'react-native';
import React, {Component} from 'react';
import * as Constant from '../../constant/Constant';
import {connect} from 'react-redux';

import * as constant from '../../constant/Constant';
import {EventRegister} from 'react-native-event-listeners';

export default class CultivationLandComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalLandH: props.storedValue.total_land_in_hector,
      totalLandR: props.storedValue.total_land_in_r,
      cultivationLandAceage: props.storedValue.cultivation_land_in_acreage,
      isTotalLandH: true,
      isTotalLandR: true,
    };
  }

  componentDidMount() {
    console.log('CultivationPropsssss------------->', this.props.storedValue);
    this.submitListener = EventRegister.addEventListener(
      constant.LAND_DETAILS_CONSTANT,
      () => {
        if (this.props.validation(this.state.totalLandH)) {
          this.setState({isTotalLandH: true});
        } else {
          this.setState({isTotalLandH: false});
        }
        if (this.props.validation(this.state.totalLandR)) {
          this.setState({isTotalLandR: true});
        } else {
          this.setState({isTotalLandR: false});
        }
        this.cultivationLandAceageFunction(true);

        // this.props.validation(this.state.totalLandH);
        // this.props.validation(this.state.totalLandR);
      },
    );
  }

  cultivationLandAceageFunction(istrue) {
    if (
      this.state.totalLandH != undefined &&
      this.state.totalLandR != undefined
    ) {
      if (this.state.totalLandH != '' && this.state.totalLandR != '') {
        let cc =
          (this.state.totalLandH + '.' + this.state.totalLandR) *
            (this.state.totalLandH + '.' + this.state.totalLandR) +
          '105';
        let pp = parseInt(cc).toFixed(4);
        console.log('firs========>', pp);
        this.setState({cultivationLandAceage: pp});
        let object = {
          // doc_sequence_no: 0,
          cultivation_land_in_acreage: pp,
          total_land_in_hector: this.state.totalLandH,
          cultivation_land_in_hector: this.state.totalLandH,
          total_land_in_r: this.state.totalLandR,
          cultivation_land_in_r: this.state.totalLandR,
        };

        if (istrue) {
          this.props.passedObjectToParent(object);
        }

        console.log('cultivationLandAceage', object);
      }
    }
  }

  render() {
    return (
      <>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={style.heading}>
              Total Land (Hector)
              {/* {this.props.isRequire && <Text style={{color: 'red'}}>*</Text>} */}
              <Text style={{color: 'red'}}>*</Text>
            </Text>

            <TextInput
              style={[
                style.textInputStyle,
                {
                  borderColor: this.state.isTotalLandH ? 'black' : 'red',
                },
              ]}
              value={this.state.totalLandH}
              keyboardType="numeric"
              onChangeText={input => {
                this.setState({isTotalLandH: true});
                this.setState({totalLandH: input});
                // setTimeout(() => {
                  this.cultivationLandAceageFunction(false);
                // }, 2000);
              }}
              placeholderTextColor={'grey'}
            />
          </View>
          <View style={{marginHorizontal: 5}}></View>
          <View style={{flex: 1}}>
            <Text style={style.heading}>
              Cultivation Land(Hector){/* {this.props.isRequire && <Text style={{color: 'red'}}>*</Text>} */}
              <Text style={{color: 'red'}}>*</Text>
            </Text>

            <TextInput
              style={[
                style.textInputStyle,
                {
                  borderColor: 'black',
                },
              ]}
              value={this.state.totalLandH}
              keyboardType="numeric"
              onChangeText={input => {
                this.setState({isValid: true});
                this.setState({totalLandH: input});
              }}
              placeholderTextColor={'grey'}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={style.heading}>
              Total Land (R)
              {/* {this.props.isRequire && <Text style={{color: 'red'}}>*</Text>} */}
              <Text style={{color: 'red'}}>*</Text>
            </Text>

            <TextInput
              style={[
                style.textInputStyle,
                {
                  borderColor: this.state.isTotalLandR ? 'black' : 'red',
                },
              ]}
              value={this.state.totalLandR}
              keyboardType="numeric"
              onChangeText={input => {
                this.setState({isTotalLandR: true});
                this.setState({totalLandR: input});
                // setTimeout(() => {
                  this.cultivationLandAceageFunction(false);
                // }, 2000);
              }}
              placeholderTextColor={'grey'}
            />
          </View>
          <View style={{marginHorizontal: 5}}></View>
          <View style={{flex: 1}}>
            <Text style={style.heading}>
              Cultivation Land (R)
              {/* {this.props.isRequire && <Text style={{color: 'red'}}>*</Text>} */}
              <Text style={{color: 'red'}}>*</Text>
            </Text>

            <TextInput
              style={[
                style.textInputStyle,
                {
                  borderColor: 'black',
                },
              ]}
              value={this.state.totalLandR}
              keyboardType="numeric"
              onChangeText={input => {
                this.setState({isValid: true});
                this.setState({totalLandR: input});
              }}
              placeholderTextColor={'grey'}
            />
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text style={style.heading}>
            Cultivation Land Acreage
            {/* {this.props.isRequire && <Text style={{color: 'red'}}>*</Text>} */}
            <Text style={{color: 'red'}}>*</Text>
          </Text>

          <TextInput
            style={[
              style.textInputStyle,
              {
                borderColor: 'black',
              },
            ]}
            value={this.state.cultivationLandAceage}
            keyboardType="numeric"
            editable={false}
            placeholderTextColor={'grey'}
          />
        </View>
      </>
    );
  }
}


const style = StyleSheet.create({
  textInputStyle: {
    // marginHorizontal: 5,
    // marginVertical: 5,
    marginBottom: 10,
    padding: 10,
    color: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  heading: {
    marginHorizontal: 5,
    marginVertical: 5,
    fontSize: (Constant.SCREEN_HEIGHT * 1.5) / 100,
    // margin: 5,
    color: 'black',
    fontWeight: '600',
  },
});
