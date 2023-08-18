import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import api from '../../services/api';
import React, {Component} from 'react';
import * as constant from '../../constant/Constant';
import {ScrollView} from 'react-native-virtualized-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropdownComponent from '../Other/DropdownComponent';
import {EventRegister} from 'react-native-event-listeners';
import TextInputComponent from '../Other/TextInputComponent';
import UploadDocumentComponent from '../Other/UploadDocumentComponent';
import TextInputNumberComponent from '../Other/TextInputNumberComponent';

var validCount = 0;
var totalValues = 0;

class BankDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openGenterModal: false,
      value: null,
      bankProofItem: [],
    };
  }

  componentDidMount() {
    this.bankProof();
  }

 async bankProof() {
    api
      .bankProof()
      .then(res => {
        console.log('first', res.data);
        let localArrary = [];

        res.data.map(item => {
          localArrary.push({value: item.master_key, key: item.id});
        });

        this.setState({bankProofItem: localArrary});
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  ////////// validation Bank Detail  ////////

  validAccountHolderName(val) {
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

  validBankAcNumber(val) {
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

  validIFSCCode(val) {
    totalValues++;
    if (val == null || val == '' || val == undefined) {
      if (validCount > 0) {
        validCount--;
      }
      return false;
    } else {
      // if (val.length == 11) {
      //   validCount++;
      //   return true;
      // }
      validCount++;
      return true;
    }
  }

  validBankName(val) {
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
  validBankBranchCode(val) {
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
  validBankProof(val) {
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
  notValidationQuestion(val) {
    return true;
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
              this.props.navigation.navigate('Register');
              // this.props.navigation.goBack(null);
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
            <Text style={style.farmerRegistrationText}>Bank Detail</Text>
          </View>
        </View>
        <ScrollView>
          <View style={style.mainView}>
            <TextInputComponent
              validation={this.validAccountHolderName}
              isRequire={true}
              reducerKey={constant.BANK_ACCOUNT_HOLDER_NAME}
              reducerName={'bankDetails'}
              question_text_label={'Account Holder Name'}
              storedValue={this.props.bank_account_holder_name}
            />
            <TextInputNumberComponent
              validation={this.validBankAcNumber}
              isRequire={true}
              reducerKey={constant.BANK_ACCOUNT_NO}
              reducerName={'bankDetails'}
              question_text_label={'Bank Account No'}
              storedValue={this.props.bank_account_no}
            />
            <TextInputNumberComponent
              validation={this.validBankAcNumber}
              isRequire={true}
              reducerKey={constant.NEW_BANK_ACCOUNT_NO}
              reducerName={'bankDetails'}
              question_text_label={'Confirm Bank Account Number'}
              storedValue={this.props.new_bank_account_no}
            />
            <TextInputComponent
              validation={this.validIFSCCode}
              isRequire={true}
              reducerKey={constant.BANK_IFSC_CODE}
              reducerName={'bankDetails'}
              question_text_label={'Bank IFSC Code'}
              storedValue={this.props.bank_ifsc_code}
            />
            <TextInputComponent
              validation={this.validBankName}
              isRequire={true}
              reducerKey={constant.BANK_NAME}
              reducerName={'bankDetails'}
              question_text_label={'Bank Name'}
              storedValue={this.props.bank_name}
            />
            <TextInputNumberComponent
              // validation={this.validBankBranchCode}
              validation={this.notValidationQuestion}
              isRequire={false}
              reducerName={'bankDetails'}
              reducerKey={constant.BANK_BRANCH_CODE}
              question_text_label={'Bank Branch Code'}
              storedValue={this.props.bank_branch_code}
            />

            <DropdownComponent
              validation={this.validBankProof}
              isRequire={true}
              reducerName={constant.BANK_DETAILS_CONSTANT}
              reducerKey={constant.BANK_DOC_ID}
              answer_params={this.state.bankProofItem}
              question_text_label={'Bank Proof'}
              storedValue={this.props.bank_proof}
            />

            <View>
              <UploadDocumentComponent
                // validation={this.validBankProof}
                validation={this.notValidationQuestion}
                isRequire={false}
                reducerName={'bankDetails'}
                reducerKey={constant.BANK_ATTACHMENT_PATH}
                question_text_label={'Upload Bank Proof'}
                storedValue={this.props.bank_attachment_path}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={[style.fab]}
          onPress={() => {
            EventRegister.emit(constant.BANK_DETAILS_CONSTANT);

            // setTimeout(() => {
            console.log('totalValues-->' + totalValues);
            console.log('validCount-->' + validCount);

            this.props.navigation.navigate('FarmerDocumentDetails');
            if (totalValues == validCount) {
              this.props.navigation.navigate('FarmerDocumentDetails');
            } else {
              console.log('some Values are empty');
            }

            validCount = 0;
            totalValues = 0;
            // }, 1000);
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
    bank_account_holder_name:
      state.formReducer.bankDetailsState.bank_account_holder_name,
    bank_account_no: state.formReducer.bankDetailsState.bank_account_no,
    new_bank_account_no: state.formReducer.bankDetailsState.new_bank_account_no,
    bank_ifsc_code: state.formReducer.bankDetailsState.bank_ifsc_code,
    bank_name: state.formReducer.bankDetailsState.bank_name,
    bank_branch_code: state.formReducer.bankDetailsState.bank_branch_code,
    bank_proof: state.formReducer.bankDetailsState.bank_doc_id,
    bank_attachment_path:state.formReducer.bankDetailsState.bank_attachment_path,
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, null)(BankDetails);

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
