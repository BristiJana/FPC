import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import React, {Component} from 'react';
import * as constant from '../../constant/Constant';
import UploadDocumentComponent from '../Other/UploadDocumentComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../services/api';
import {connect} from 'react-redux';
import TextInputComponent from '../Other/TextInputComponent';
import TextInputNumberComponent from '../Other/TextInputNumberComponent';
import DropdownComponent from '../Other/DropdownComponent';
import DateOfBirthComponent from '../Other/DateOfBirthComponent';
import {EventRegister} from 'react-native-event-listeners';
import {clearRedux} from '../../redux/Action/formAction';
import SelectCountrytoVillage from '../Other/SelectCountrytoVillage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/FontAwesome5';

var validCount = 0;
var totalValues = 0;
class Register extends Component {
  backHandler;

  constructor(props) {
    super(props);
    this.state = {
      token: null,
      genderItems: [],
      categoryItems: [],
      showDrawer: false,
      renderXX: true,
    };
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  componentDidMount() {
    console.log("Pratikkkkkkkkkkkkkkkk callllllllllllllllllll")
    this.castCategory();
    this.gender();
    this.getAsyncToken();
  }

  async getAsyncToken() {
    console.log('Role------>', await AsyncStorage.getItem('roles'));
    this.setState({token: await AsyncStorage.getItem('accessToken')});
  }

  backAction = () => {
    console.log('BackHandler Added');
    Alert.alert('Alert', 'are you sure you want to go back. ', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          setTimeout(() => {
            this.props.navigation.goBack(null);
            // this.props.clearRedux();
          }, 2000);
        },
      },
    ]);
    return true;
  };

  async gender() {
    api
      .Gender()
      .then(res => {
        let localArrary = [];

        res.data.map(item => {
          localArrary.push({value: item.master_key, key: item.id});
        });

        this.setState({genderItems: localArrary});
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  async castCategory() {
    api
      .castCategory(await AsyncStorage.getItem('accessToken'))
      .then(res => {
        let localArrary = [];

        res.data.map(item => {
          localArrary.push({value: item.master_key, key: item.id});
        });

        this.setState({categoryItems: localArrary});
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  validate() {
    Object.keys(this.state).forEach(item => {});
  }

  increa;

  ////////////////////////  Form Validation ////////////////////////////

  notValidationQuestion(val) {
    return true;
  }

  validAdharName(val) {
    totalValues++;
    if (val == null || val == '' || val == undefined) {
      if (validCount > 0) {
        validCount--;
      }
      return false;
    } else {
      validCount++;

      return true;
    }
  }
  validAddress(val) {
    totalValues++;
    if (val == null || val == '' || val == undefined) {
      if (validCount > 0) {
        validCount--;
      }
      return false;
    } else {
      validCount++;
      return true;
    }
  }
  pincodeValidation(val) {
    totalValues++;
    if (val == null || val == '' || val == undefined) {
      if (validCount > 0) {
        validCount--;
      }
      return false;
    } else {
      if (val.length == 6) {
        validCount++;
        return true;
      }
    }
  }

  validBOD(val) {
    totalValues++;
    if (
      val == null ||
      val == '' ||
      val == undefined ||
      val == 'Date of Birth Click Here'
    ) {
      if (validCount > 0) {
        validCount--;
      }
      return false;
    } else {
      validCount++;
      return true;
    }
  }

  validMobileNumber(val) {
    totalValues++;
    if (val == null || val == '' || val == undefined) {
      if (validCount > 0) {
        validCount--;
      }
      return false;
    } else {
      if (val.length == 10) {
        validCount++;
        return true;
      }
    }
  }

  validGender(val) {
    totalValues++;
    if (val == null || val == '' || val == undefined) {
      if (validCount > 0) {
        validCount--;
      }
      return false;
    } else {
      validCount++;
      return true;
    }
  }

  validCountrytoVillage(value) {
    totalValues++;
    if (value != undefined) {
      validCount++;
      return true;
    } else {
      if (validCount > 0) {
        validCount--;
      }
      return false;
    }
  }

  // validCountrytoVillage(country, state, district, taluka, village) {
  //   if (
  //     country != undefined &&
  //     state != undefined &&
  //     district != undefined &&
  //     taluka != undefined &&
  //     village != undefined
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  closeDrawer() {
    this.setState({showDrawer: false});
  }

  change() {
    this.setState({renderXX: !this.state.renderXX});
  }

  render() {
    // console.log('HelloWorld');
    return (
      <>
        <ScrollView>
          <TouchableOpacity
            onPress={() => {
              this.change();
              // console.log(JSON.stringify(this.props.stateXXX, null, 2));
            }}>
            {/* <Text>PressMe</Text> */}
            {/* <Text>{JSON.stringify(this.props.stateXXX, null, 2)}</Text> */}
          </TouchableOpacity>
          <View style={style.mainView}>
            <TextInputComponent
              isRequire={true}
              storedValue={this.props.name_as_per_aadhar_card}
              question_text_label={'Name As Per Aadhar Card'}
              validation={this.validAdharName}
              reducerKey={constant.NAME_AS_PER_AADHAR_CARD}
              reducerName={constant.PERSONAL_DETAILS_CONSTANT}
            />

            <TextInputNumberComponent
              isRequire={true}
              storedValue={this.props.phone}
              reducerName={constant.PERSONAL_DETAILS_CONSTANT}
              reducerKey={constant.PHONE}
              validation={this.validMobileNumber}
              question_text_label={'Phone Number'}
            />

            <TextInputComponent
              isRequire={true}
              validation={this.validAddress}
              storedValue={this.props.address1}
              question_text_label={'Address1'}
              reducerKey={constant.ADDRESS1}
              reducerName={constant.PERSONAL_DETAILS_CONSTANT}
            />

            <TextInputComponent
              isRequire={false}
              validation={this.notValidationQuestion}
              storedValue={this.props.address2}
              question_text_label={'Address2'}
              reducerKey={constant.ADDRESS2}
              reducerName={constant.PERSONAL_DETAILS_CONSTANT}
            />

            <View>
              <SelectCountrytoVillage validation={this.validCountrytoVillage} />
            </View>
            <TextInputNumberComponent
              validation={this.pincodeValidation}
              isRequire={true}
              storedValue={this.props.pincode}
              reducerName={constant.PERSONAL_DETAILS_CONSTANT}
              question_text_label={'Pin/Zip Code'}
              reducerKey={constant.PINCODE}
            />

            <DateOfBirthComponent
              // validation={this.validBOD}
              validation={this.notValidationQuestion}
              isRequire={false}
              reducerKey={constant.DOB}
              storedValue={this.props.dob}
              storedValuex = {this.props.age}
              reducerName={constant.PERSONAL_DETAILS_CONSTANT}
            />

            <DropdownComponent
              // validation={this.validGender}
              validation={this.notValidationQuestion}
              isRequire={false}
              storedValue={this.props.gender}
              reducerKey={constant.GENDER}
              answer_params={this.state.genderItems}
              question_text_label={'Select Gender'}
              reducerName={constant.PERSONAL_DETAILS_CONSTANT}
            />
            <DropdownComponent
              validation={this.notValidationQuestion}
              storedValue={this.props.cast_religion}
              reducerKey={constant.CAST_RELIGION}
              reducerName={constant.PERSONAL_DETAILS_CONSTANT}
              answer_params={this.state.categoryItems}
              question_text_label={'Select Cast Categry'}
            />
            <TextInputNumberComponent
              validation={this.notValidationQuestion}
              isRequire={false}
              storedValue={this.props.annual_income}
              reducerName={constant.PERSONAL_DETAILS_CONSTANT}
              question_text_label={'Annual Income'}
              reducerKey={constant.ANNUALINCOME}
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[style.fab]}
          onPress={() => {
            EventRegister.emit(constant.PERSONAL_DETAILS_CONSTANT);

            console.log('totalValues-->' + totalValues);
            console.log('validCount-->' + validCount);
            this.props.navigation.navigate('BankDetails');
            if (totalValues == validCount) {
              this.props.navigation.navigate('BankDetails');
            } else {
              console.log('some Values are empty');
            }
            validCount = 0;
            totalValues = 0;
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
  console.log('TTTTTTTT', state.formReducer);
  return {
    stateXXX: state.formReducer,
    valuex: state.formReducer.personalDetailsState,
    name_as_per_aadhar_card:
      state.formReducer.personalDetailsState.name_as_per_aadhar_card,
    phone: state.formReducer.personalDetailsState.phone,
    age: state.formReducer.personalDetailsState.age,
    address1: state.formReducer.personalDetailsState.address1,
    address2: state.formReducer.personalDetailsState.address2,
    pincode: state.formReducer.personalDetailsState.pincode,
    dob: state.formReducer.personalDetailsState.dob,
    gender: state.formReducer.personalDetailsState.gender,
    cast_religion: state.formReducer.personalDetailsState.cast_religion,
    annual_income: state.formReducer.personalDetailsState.annual_income,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearRedux: () => {
      dispatch(clearRedux());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);

const style = StyleSheet.create({
  mainView: {
    elevation: 20,
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
