import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import api from '../../services/api';
import {connect} from 'react-redux';
import * as constant from '../../constant/Constant';
import DropdownComponent from './DropdownComponent';
import {SCREEN_HEIGHT} from '../../constant/Constant';
import {EventRegister} from 'react-native-event-listeners';
import {kycDetailInputChange} from '../../redux/ExportAction';
import UploadDocumentComponent from './UploadDocumentComponent';
import TextInputNumberComponent from './TextInputNumberComponent';

var validCount = 0;
var totalValues = 0;

class FarmerDocumentComponent extends Component {
  mainObject = {};
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      DocumentNumber: undefined,
      data: [],
    };
    this.mergePasssedObject = this.mergePasssedObject.bind(this);
  }

  mergePasssedObject(object) {
    Object.assign(this.mainObject, {number: this.props.index});
    // Object.assign(this.mainObject, {pratikkkkk: 'Pratikkkkkkkk'});
    Object.assign(this.mainObject, object);

    console.log('----------------->', Object.keys(this.mainObject).length);
    // if (Object.keys(this.mainObject).length == 3) {
    this.props.kycDetailInputChange(this.mainObject);
    console.log(
      '0000000000000000000000000',
      JSON.stringify(this.mainObject, null, 2),
    );
    // }
  }

  validDocumentName(val) {
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

  validNumberDocument(val) {
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

  componentDidMount() {
    this.getData();
    this.submitListener = EventRegister.addEventListener(
      constant.KYC_DETAILS_CONSTANT,
      () => {
        // this.props.navigation.navigate('LandDetails');

        if (totalValues != 0 || validCount != 0) {
          if (totalValues == validCount) {
            this.props.totalValidCardFunction();
          } else {
            this.props.emptyValidCardFunction();
            validCount = 0;
            totalValues = 0;
          }
        } else {
          this.props.emptyValidCardFunction();
          // this.props.moveOnWithoutValidation();
        }
        console.log('totalValues-->' + totalValues);
        console.log('validCount-->' + validCount);
      },
    );
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.submitListener);
  }

  getData() {
    api
      .FarmerDocument()
      .then(res => {
        // console.log('response', res.data);
        res.data.map(item => [
          this.state.data.push({key: item.id, value: item.master_key}),
        ]);
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  render() {
    return (
      <View
        style={[
          style.mainView,

          {
            borderColor: 'black',
            borderWidth: 1,
            flex: 1,
          },
        ]}>
        <View>
          <View
            style={{
              alignSelf: 'flex-end',
              backgroundColor: 'black',
              padding: 5,
              borderRadius: 10,
            }}>
            <Text style={{color: 'white'}}>{this.props.index}</Text>
          </View>

          <DropdownComponent
            validation={this.validDocumentName}
            storedValue={this.props.storeValuesRedux.kyc_doc_id}
            reducerKey={constant.KYC_DOC_ID}
            reducerName={'kycDetails'}
            isRequire={true}
            answer_params={this.state.data}
            question_text_label={'Select Document Name'}
            passedObjectToParentKYCDetail={this.mergePasssedObject}
          />

          <TextInputNumberComponent
            style={{flex: 1, marginEnd: 5}}
            validation={this.validNumberDocument}
            storedValue={this.props.storeValuesRedux.kyc_account_no}
            reducerKey={constant.KYC_ACCOUNT_NO}
            reducerName={'kycDetails'}
            isRequire={true}
            question_text_label={'Document Number'}
            passedObjectToParentKYCDetail={this.mergePasssedObject}
          />

          <UploadDocumentComponent
            validation={this.validDocumentName}
            isRequire={true}
            storedValue={this.props.storeValuesRedux.attachment_path}
            // storedValue={this.props.attachment_path}
            reducerKey={constant.ATTACHMENT_PATH}
            reducerName={'kycDetails'}
            question_text_label={'Attachment'}
            passedObjectToParentKYCDetail={this.mergePasssedObject}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.formReducer.landDetailsState.attachment_path);
  console.log(state.formReducer.landDetailsState);
  return {
    attachment_path: state.formReducer.landDetailsState.attachment_path,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    kycDetailInputChange: value => {
      dispatch(kycDetailInputChange(value, 'KYC_PAGE '));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FarmerDocumentComponent);

const style = StyleSheet.create({
  mainView: {
    // elevation: 20,
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
    fontSize: (SCREEN_HEIGHT * 1.5) / 100,
    // margin: 5,
    color: 'black',
    fontWeight: '600',
  },
  textInputStyle: {
    // marginHorizontal: 5,
    // marginVertical: 5,
    marginBottom: 10,
    padding: 10,
    color: 'black',
    borderWidth: 1,
    // borderColor: this.props.storedValue == null ? 'red' : 'black',
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
