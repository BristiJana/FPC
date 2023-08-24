import {
  PERSONAL_DETAIL,
  BANK_DETAIL,
  LAND_DETAIL,
  KYC_DETAIL,
  REMOVE_KYC_DETAIL,
  CLEAR,
  SET_CONSTANT, 
} from '../ReduxConstant';

import {clearX} from '../Store';

const initialState = {
  personalDetailsState: {},
  bankDetailsState: {},
  landDetailsState: [],
  kycDetailsState: [],
  constantValue: null,
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
            object['cultivation_land_in_acreage'] =
              actionObject.value.cultivation_land_in_acreage;
            object['total_land_in_hector'] =
              actionObject.value.total_land_in_hector;
            object['cultivation_land_in_r'] =
              actionObject.value.cultivation_land_in_r;
            object['cultivation_land_in_hector'] =
              actionObject.value.cultivation_land_in_hector;
            object['uom_id'] = actionObject.value.uom_id;
            object['commodity_id'] = actionObject.value.commodity_id;
            object['season_id'] = actionObject.value.season_id;
            object['doc_attachment_path'] =
              actionObject.value.doc_attachment_path;
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

      return {
        ...temp,
        constantValue: state.constantValue,
      };

      case SET_CONSTANT: 
          return {
          ...state,
          constantValue: action.payload,
        };
      
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

