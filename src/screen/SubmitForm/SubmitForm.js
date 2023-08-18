import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import api from '../../services/api';
import {clearRedux} from '../../redux/ExportAction';

let allRules = {};
// let xnxxx = {
//   address1: 'Satara',
//   address2: 'Satara',
//   age: 29,
//   bank_account_holder_name: 'Pratik',
//   bank_account_no: '1234567890',
//   bank_branch_code: '00001',
//   bank_doc_id: 34,
//   bank_ifsc_code: 'SBIN0003296',
//   bank_name: 'SBI',
//   cast_religion: 21,
//   country_ref_id: 1,
//   district_ref_id: 1,
//   dob: '1994-05-24',
//   e_samridhi_id: '',
//   error_code_id: '',
//   farmer_kyc_details: [
//     {
//       kyc_account_no: '123456',
//       kyc_doc_id: 27,
//       number: 2,
//     },
//     {
//       kyc_account_no: '1234567890',
//       kyc_doc_id: 28,
//       number: 1,
//     },
//   ],
//   gender: 17,
//   land_details: [
//     {
//       cultivation_land_in_acreage: '1.0000',
//       cultivation_land_in_hector: '1',
//       cultivation_land_in_r: '2',
//       total_land_in_hector: '1',
//       total_land_in_r: '2',
//       commodity_id: 2,
//       doc_sequence_no: 1,
//       land_doc_id: 23,
//       season_id: 1,
//       survey_no: '1234567',
//       uom_id: 3,
//     },
//   ],
//   name_as_per_aadhar_card: 'Pratik katkar',
//   new_bank_account_no: '1234567890',
//   phone: '5555555555',
//   pincode: '415501',
//   remark: '',
//   state_ref_id: 1,
//   taluka_ref_id: 244,
//   village_ref_id: 29199,
//   workflow_status: 'Created',
// };
export class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: this.props.FormValue,
      mergeObject: {},
    };
  }
  componentDidMount() {
    // this.state.mergeObject(...this.props.personalDetail ,...this.props.bankDetail)
    // console.log("--------->",this.state.mergeObject)
    allRules = Object.assign(
      this.state.mergeObject,
      this.props.personalDetail,
      this.props.bankDetails,
      this.state.landDetails,
      {
        e_samridhi_id: '',
        error_code_id: '',
        remark: '',
        workflow_status: 'Created',
      },
      {land_details: [...this.props.landDetails]},
      {farmer_kyc_details: [...this.props.kycDetails]},
    );
    console.log('FarmerRegisterData', JSON.stringify(allRules,null,2));
  }
  formSubmit() {
    api
      .form(allRules)
      .then(res => {
        console.log('response', res.data);

        this.props.clearRedux();
        Alert.alert('Success', 'Form Submit Successfully', [
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.navigate('Register');
              this.props.clearRedux();
            },
          },
        ]);
      })
      .catch(err => {
        if (err.response.status == 500) {
          Alert.alert('Server Error', 'Please Try After Some Time', [
            {
              text: 'OK',
              onPress: () => {
                console.log('hi');
                // this.props.clearRedux();
                // this.props.navigation.navigate('Register');
              },
            },
          ]);
        }
        if (err.response.status == 400) {
          Alert.alert('Alert', 'Please fill All Questions', [
            {
              text: 'OK',
              onPress: () => {
                // this.props.clearRedux();
                // this.props.navigation.navigate('Register');

                console.log('hi');
              },
            },
          ]);
        }
        console.log('error', err);
      });
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
              this.props.navigation.navigate('LandDetails');
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
            {/* <Text style={style.farmerRegistrationText}>Land Details</Text> */}
          </View>
        </View>
        {/* <ScrollView>
          <View style={style.parantView}>
            <Text style={style.HeadingText}>Personal Details</Text>
            <Text style={{}}>Name:</Text>
            <Text style={{}}>kyc_doc_id:</Text>
            <Text style={{}}>kyc_account_no:</Text>
          </View>
          <View>
            <Text style={style.HeadingText}>Bank Details</Text>
            <Text style={{}}>account_no</Text>
            <Text style={{}}>branch_name</Text>
            <Text style={{}}>ifsc_code</Text>
          </View>
          <View>
            <Text style={style.HeadingText}>KYC Details</Text>
          </View>
          <View>
            <Text style={style.HeadingText}>Land Details</Text>
            <Text style={{}}>survey_no:</Text>
            <Text style={{}}>land_survey_id:</Text>
          </View>

          <View>
            <Text>{'\n\n'}</Text>
            <Text>
              --------------------------------------------------------------------
            </Text>
            <Text style={style.HeadingText}>JSON Information</Text>
            <Text>{this.state.form}</Text>
          </View>
        </ScrollView> */}
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              padding: 10,
              backgroundColor: '#000',
              // backgroundColor: '#228B22',
              // borderRadius: 25,
            }}
            onPress={() => {
              console.log('xxxxxx', this.props.FormValue);
              console.log(
                '11111111111111111111111111',
                allRules,
              );
              this.formSubmit();
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // marginHorizontal:10
              }}>
              <Text style={{fontSize: 20, color: 'white'}}>Submit Form</Text>
              {/* <Ionicons
              name="md-arrow-redo-outline"
              size={30}
            color={'#fff'}></Ionicons> */}
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log(
    '------------------->MMM' + JSON.stringify(state.formReducer, null, 2),
  );

  return {
    FormValue: JSON.stringify(state.formReducer, null, 2),
    personalDetail: state.formReducer.personalDetailsState,
    bankDetails: state.formReducer.bankDetailsState,
    landDetails: state.formReducer.landDetailsState,
    kycDetails: state.formReducer.kycDetailsState,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearRedux: () => {
      dispatch(clearRedux());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitForm);

const style = StyleSheet.create({
  HeadingText: {
    fontSize: 20,
    fontWeight: '600',
  },
  parantView: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
