let arr = [
  {
    id: 11,
    name: '1 Litre',
    image: 'https://www.gokulmilk.coop/uploads/products/1677997735.jpg',
    quantity: 2,
    addedToCart: false,
    price: 158,
  },
  {
    id: 13,
    name: '250 Litre',
    image: 'https://www.gokulmilk.coop/uploads/products/1677997735.jpg',
    quantity: 1,
    addedToCart: false,
    price: 59,
  },
  {
    id: 11,
    name: '1 Litre',
    image: 'https://www.gokulmilk.coop/uploads/products/1677997735.jpg',
    quantity: 4,
    addedToCart: false,
    price: 316,
  },
  {
    id: 13,
    name: '250 Litre',
    image: 'https://www.gokulmilk.coop/uploads/products/1677997735.jpg',
    quantity: 1,
    addedToCart: false,
    price: 59,
  },
  {
    id: 11,
    name: '1 Litre',
    image: 'https://www.gokulmilk.coop/uploads/products/1677997735.jpg',
    quantity: 2,
    addedToCart: false,
    price: 158,
  },
  {
    id: 12,
    name: '500 mL',
    image: 'https://www.gokulmilk.coop/uploads/products/1677997735.jpg',
    quantity: 4,
    addedToCart: false,
    price: 196,
  },
  {
    id: 13,
    name: '250 Litre',
    image: 'https://www.gokulmilk.coop/uploads/products/1677997735.jpg',
    quantity: 1,
    addedToCart: false,
    price: 59,
  },
  {
    id: 11,
    name: '1 Litre',
    image: 'https://www.gokulmilk.coop/uploads/products/1677997735.jpg',
    quantity: 3,
    addedToCart: false,
    price: 237,
  },
];

const fun = () => {
  let filterData = arr.filter(e => e.id === 11);
  console.log('filterData', filterData);
  arr.forEach(e => {
    e['quantity'] = 12;
  });
  console.log('eachData', arr);
};
console.log(fun());
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import api from '../../services/api';
import React, {Component} from 'react';
import * as constant from '../../constant/Constant';
import {EventRegister} from 'react-native-event-listeners';
import DropdownComponent from '../Other/DropdownComponent';
import TextInputComponent from '../Other/TextInputComponent';
import UploadDocumentComponent from '../Other/UploadDocumentComponent';
import {landDetailInputChange} from '../../redux/ExportAction';
import CultivationLandComponent from './CultivationLandComponent';
import * as Constant from '../../constant/Constant';

var validCount = 0;
var totalValues = 0;

class LandDetialsComponent extends Component {
  mainObject = {};

  constructor(props) {
    super(props);
    this.state = {
      surveyNumberValue: undefined,
      landObjects: [],
      seasonItems: [],
      commodityItems: [],
      UOMItems: [],
      documentNameItems: [],

      totalLandH: props.storeValuesRedux.total_land_in_hector,
      totalLandR: props.storeValuesRedux.total_land_in_r,
      cultivationH: props.storeValuesRedux.cultivation_land_in_hector,
      cultivationR: props.storeValuesRedux.cultivation_land_in_r,
      cultivationLandAceage: props.storeValuesRedux.cultivation_land_in_acreage,
      isTotalLandH: true,
      isTotalLandR: true,
    };

    this.mergePasssedObject = this.mergePasssedObject.bind(this);
  }

  mergePasssedObject(object) {
    Object.assign(this.mainObject, {doc_sequence_no: this.props.index});
    Object.assign(this.mainObject, object);

    console.log(
      '----------------->',
      Object.keys('Objectssss----->', this.mainObject),
    );

    // if (Object.keys(this.mainObject).length == 6) {
    // setTimeout(() => {
    this.props.landDetailInputChange(this.mainObject);
    // }, 1000);
    console.log(
      '0000000000000000000000000',
      JSON.stringify(this.mainObject, null, 2),
    );
    // }
  }

  componentDidMount() {
    this.getData();
    this.submitListener = EventRegister.addEventListener(
      constant.LAND_DETAILS_CONSTANT,
      () => {
        this.cultivationLandAceageFunction(true);
        console.log('hiiiiiiiiiiii');
        // this.props.navigation.navigate('LandDetails');

        if (totalValues != 0 || validCount != 0) {
          if (totalValues == validCount) {
            this.props.totalValidCardFunction();
          } else {
            this.props.emptyValidCardFunction();
            validCount = 0;
            totalValues = 0;
          }
        }
        console.log('totalValues-->' + totalValues);
        console.log('validCount-->' + validCount);
      },
    );
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.submitListener);
  }

  cultivationLandAceageFunction(istrue, r) {
    console.log('zz', r);
    console.log('xx', this.state.totalLandR);
    if (this.state.totalLandH != undefined && r != undefined) {
      if (r != '') {
        const cultivation_land_in_hector_r = this.state.totalLandH + '.' + r;
        let cultivation_land_in_acreage =
          // parseFloat(cultivation_land_in_hector_r) * 2.47105;
          parseFloat(cultivation_land_in_hector_r) / 0.404686;

        console.log('firs========>', cultivation_land_in_acreage.toFixed(4));
        let modified_Cultivation_Acreage =
          cultivation_land_in_acreage.toFixed(4);

        this.setState({cultivationLandAceage: modified_Cultivation_Acreage});

        let object = {
          doc_sequence_no: 0,
          cultivation_land_in_acreage: modified_Cultivation_Acreage,
          total_land_in_hector: this.state.totalLandH,
          cultivation_land_in_hector: this.state.totalLandH,
          total_land_in_r: r,
          cultivation_land_in_r: r,
        };

        console.log('cultivationLandAceage', object);
      } else {
        this.setState({cultivationLandAceage: undefined});
      }
      if (istrue) {
        this.mergePasssedObject(object);
      }
    }
  }

  getData() {
    api
      .uom()
      .then(res => {
        let localArrary = [];

        res.data.map(item => {
          localArrary.push({value: item.uom_code, key: item.id});
        });

        this.setState({UOMItems: localArrary});
      })
      .catch(err => {
        console.log('err', err);
      });

    api
      .season()
      .then(res => {
        let localArrary = [];

        res.data.map(item => {
          localArrary.push({value: item.name, key: item.id});
        });

        this.setState({seasonItems: localArrary});
      })
      .catch(err => {
        console.log('err', err);
      });

    api
      .commodity()
      .then(res => {
        let localArrary = [];

        res.data.map(item => {
          localArrary.push({value: item.name, key: item.id});
        });

        this.setState({commodityItems: localArrary});
      })
      .catch(err => {
        console.log('err', err);
      });

    api
      .landDocumentName()
      .then(res => {
        let localArrary = [];

        res.data.map(item => {
          localArrary.push({value: item.master_key, key: item.id});
        });

        this.setState({documentNameItems: localArrary});
      })
      .catch(err => {
        console.log('Documents Not Found->', err);
      });
  }

  validSurveyNo(val) {
    totalValues++;
    if (val == null || val == '' || val == undefined) {
      if (validCount > 0) {
        validCount--;
      }
      return false;
    } else {
      validCount++;
      // this.setState({surveyNumberValue:val})
      return true;
    }
  }

  validTotalLandH(val) {
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

  validTotalLandR(val) {
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

  validSeason(val) {
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

  validCommodity(val) {
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

  validUOM(val) {
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
  validCalculationData(value) {
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

  notValidationQuestion(val) {
    return true;
  }

  render() {
    return (
      <View>
        <View
          style={[
            style.mainView,
            {borderColor: 'black', borderWidth: 1, marginBottom: 45},
          ]}>
          <View
            style={{
              alignSelf: 'flex-end',
              backgroundColor: 'black',
              padding: 10,
              borderRadius: 25,
            }}>
            <Text style={{color: 'white'}}>{this.props.index}</Text>
          </View>

          <TextInputComponent
            isRequire={false}
            storedValue={this.props.storeValuesRedux.survey_no}
            question_text_label={'Khata/ Gat /Survey No'}
            // validation={this.validSurveyNo}
            validation={this.notValidationQuestion}
            reducerKey={constant.SURVEY_NO}
            reducerName={'landDetails'}
            passedObjectToParent={this.mergePasssedObject}
          />

          <DropdownComponent
            // validation={this.validDocumentName}
            validation={this.notValidationQuestion}
            storedValue={this.props.storeValuesRedux.land_doc_id}
            reducerKey={constant.LAND_DOC_ID}
            reducerName={'landDetails'}
            answer_params={this.state.documentNameItems}
            question_text_label={'Document Name'}
            passedObjectToParent={this.mergePasssedObject}
          />

          <UploadDocumentComponent
            // validation={this.validSurveyNo}
            validation={this.notValidationQuestion}
            // isRequire={true}
            storedValue={this.props.storeValuesRedux.doc_attachment_path}
            reducerKey={constant.DOC_ATTACHMENT_PATH}
            reducerName={'landDetails'}
            question_text_label={'Attachment'}
            passedObjectToParent={this.mergePasssedObject}
          />

          {/* <CultivationLandComponent
            storedValue={this.props.storeValuesRedux}
            passedObjectToParent={this.mergePasssedObject}
            validation={this.validCalculationData}
          /> */}

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
                  // this.cultivationLandAceageFunction(false);
                  // }, 2000);
                }}
                placeholderTextColor={'grey'}
              />
            </View>
            <View style={{marginHorizontal: 5}}></View>
            <View style={{flex: 1}}>
              <Text style={style.heading}>
                Cultivation Land(Hector)
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
                  this.cultivationLandAceageFunction(false, input);
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
                  // if (this.state.totalLandR < input) {
                  this.setState({totalLandR: input});
                  this.cultivationLandAceageFunction(false, input);
                  // }
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

          <DropdownComponent
            validation={this.validSeason}
            reducerName={'landDetails'}
            isRequire={true}
            storedValue={this.props.storeValuesRedux.season_id}
            reducerKey={constant.SEASON_ID}
            answer_params={this.state.seasonItems}
            question_text_label={'Season'}
            passedObjectToParent={this.mergePasssedObject}
          />
          <DropdownComponent
            validation={this.validCommodity}
            storedValue={this.props.storeValuesRedux.commodity_id}
            reducerKey={constant.COMMODITY_ID}
            reducerName={'landDetails'}
            isRequire={true}
            answer_params={this.state.commodityItems}
            question_text_label={'Commodity / Crop'}
            passedObjectToParent={this.mergePasssedObject}
          />
          <DropdownComponent
            validation={this.notValidationQuestion}
            // validation={this.validUOM}
            storedValue={this.props.storeValuesRedux.uom_id}
            reducerKey={constant.UOM_ID}
            reducerName={'landDetails'}
            answer_params={this.state.UOMItems}
            question_text_label={'UOM'}
            passedObjectToParent={this.mergePasssedObject}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    landDetailInputChange: value => {
      dispatch(landDetailInputChange(value));
    },
  };
};

export default connect(null, mapDispatchToProps)(LandDetialsComponent);

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

import {
  PERSONAL_DETAIL,
  BANK_DETAIL,
  LAND_DETAIL,
  KYC_DETAIL,
  REMOVE_KYC_DETAIL,
  CLEAR,
} from '../ReduxConstant';

import {clearX} from '../Store';

const initialState = {
  personalDetailsState: {},
  bankDetailsState: {},
  landDetailsState: [],
  kycDetailsState: [],
};

export const formReducer = (state = initialState, actionObject) => {
  switch (actionObject.type) {
    case PERSONAL_DETAIL: {
      return {
        ...state,
        personalDetailsState: Object.assign(
          state.personalDetailsState,
          actionObject.value,
        ),
      };
    }
    case BANK_DETAIL: {
      return {
        ...state,
        bankDetailsState: Object.assign(
          state.bankDetailsState,
          actionObject.value,
        ),
      };
    }
    case LAND_DETAIL: {
      if (state.landDetailsState.length > 0) {
        let found = false;
        let landDetailsStateTemp = state.landDetailsState;

        landDetailsStateTemp.filter(object => {
          if (object.doc_sequence_no == actionObject.value.doc_sequence_no) {
            found = true;

            object['total_land_in_r'] = actionObject.value.total_land_in_r;
            object['survey_no'] = actionObject.value.survey_no;
            object['cultivation_land_in_acreage'] = actionObject.value.cultivation_land_in_acreage;
            object['total_land_in_hector'] = actionObject.value.total_land_in_hector;
            object['cultivation_land_in_r'] = actionObject.value.cultivation_land_in_r;
            object['cultivation_land_in_hector'] = actionObject.value.cultivation_land_in_hector;
            object['uom_id'] = actionObject.value.uom_id;
            object['commodity_id'] = actionObject.value.commodity_id;
            object['season_id'] = actionObject.value.season_id;
            object['doc_attachment_path'] = actionObject.value.doc_attachment_path;
            object['land_doc_id'] = actionObject.value.land_doc_id;
          }
        });

        if (!found) {
          landDetailsStateTemp.push(actionObject.value);
        }

        return {
          ...state,
          landDetailsState: landDetailsStateTemp,
        };
      } else {
        return {
          ...state,
          landDetailsState: state.landDetailsState.concat(actionObject.value),
        };
      }
    }

    case KYC_DETAIL: {
      if (state.kycDetailsState.length > 0) {
        let found = false;
        let kycDetailsStateTemp = state.kycDetailsState;

        kycDetailsStateTemp.filter(object => {
          if (object.number == actionObject.value.number) {
            found = true;
            object['kyc_doc_id'] = actionObject.value.kyc_doc_id;
            object['kyc_account_no'] = actionObject.value.kyc_account_no;
            object['attachment_path'] = actionObject.value.attachment_path;
          }
        });

        if (!found) {
          kycDetailsStateTemp.push(actionObject.value);
        }

        return {
          ...state,
          kycDetailsState: kycDetailsStateTemp,
        };
        // let contains = false;

        // state.kycDetailsState.map((item, index) => {
        //   if (item.hasOwnProperty('number')) {
        //     if (item['number'] == actionObject.value['number']) {
        //       contains = true;
        //     }
        //   }
        // });

        // if (!contains) {
        //   return {
        //     ...state,
        //     kycDetailsState: state.kycDetailsState.concat(actionObject.value),
        //   };
        // }
      } else {
        return {
          ...state,
          kycDetailsState: state.kycDetailsState.concat(actionObject.value),
        };
      }
    }

    case REMOVE_KYC_DETAIL: {
      if (state.kycDetailsState.length > 0) {
        console.log(' Remove Itemmm');
        var array = state.kycDetailsState;
        array.splice(array.length - 1, 1);
        state.kycDetailsState = array;

        // state.kycDetailsState.splice(0, 0);

        // console.log(
        //   'hiiiiiiiiiiiiiiiiiiiiiii',
        //   JSON.stringify(state.kycDetailsState, null, 2),
        // );
        // console.log('hiiiiiiiiiiiiiiiiiiiiiii', state.kycDetailsState);
      }
    }
    case CLEAR:
      const temp = {
        personalDetailsState: {},
        bankDetailsState: {},
        landDetailsState: [],
        kycDetailsState: [],
      };

      state = temp;
      // initialState = temp;

      return state;
    default:
      return state;
  }
};

// let contains = false;

// state.landDetailsState.map((item, index) => {
//   if (item.hasOwnProperty('doc_sequence_no')) {
//     if (
//       item['doc_sequence_no'] == actionObject.value['doc_sequence_no']
//     ) {
//       contains = true;
//     }
//   }
// });

// if (!contains) {
//   return {
//     ...state,
//     landDetailsState: state.landDetailsState.concat(actionObject.value),
//   };
// }

 