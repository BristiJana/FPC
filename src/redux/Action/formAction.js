import {
  PERSONAL_DETAIL,
  BANK_DETAIL,
  LAND_DETAIL,
  KYC_DETAIL,
  CLEAR,
  REMOVE_KYC_DETAIL,
} from '../ReduxConstant';

export function personalDetailInputChange(changedInput) {
  return {
    type: PERSONAL_DETAIL,
    value: changedInput,
  };
}
export const bankDetailInputChange = changedInput => {
  return {
    type: BANK_DETAIL,
    value: changedInput,
  };
};

export const landDetailInputChange = changedInput => {
  return {
    type: LAND_DETAIL,
    value: changedInput,
  };
};

export const kycDetailInputChange = (changedInput, fromPage) => {
  return {
    type: KYC_DETAIL,
    value: changedInput,
    fromPage: fromPage,
  };
};

export const clearKycDetails = () => {
  return {
    type: REMOVE_KYC_DETAIL,
  };
};

export const clearRedux = () => {
  return {
    type: CLEAR,
  };
};
