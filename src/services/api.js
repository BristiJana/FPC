import axios from 'axios';
import global from './global';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Instance = axios.create({
  baseURL: global.Instance,
});

Instance.interceptors.request.use(
  async function (config) {
    config.headers.Authorization =
      'Bearer ' + (await AsyncStorage.getItem('accessToken'));
    console.log("xxxx".config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

const NonHeaderInstance = axios.create({
  baseURL: global.Instance,
});

NonHeaderInstance.interceptors.response.use(
  request => {
    console.log('Interceptor request-->' + JSON.stringify(request, null, 2));
    return request;
  },
  err => {
    console.log('Interceptor Error-->' + JSON.stringify(err, null, 2));
  },
);

export default {
  login: (username, password) =>
    NonHeaderInstance({
      method: 'POST',
      url: 'auth/code/',
      data: {
        username: username,
        password: password,
      },
    }),
  logout: token =>
    Instance({
      method: 'POST',
      url: 'logoutme/',
      data: {
        token: token,
      },
    }),
  castCategory: token =>
    Instance({
      method: 'GET',
      url: 'master/',
      params: {
        master_type: 'Cast Category',
      },
    }),
  uom: () =>
    Instance({
      method: 'GET',
      url: 'uom/',
    }),
  season: () =>
    Instance({
      method: 'GET',
      url: 'season/',
    }),
  commodity: () =>
    Instance({
      method: 'GET',
      url: 'commodity/',
    }),

  landDocumentName: () =>
    Instance({
      method: 'GET',
      url: 'master/',
      params: {
        master_type: 'Land Doc Type',
      },
    }),
  Gender: () =>
    Instance({
      method: 'GET',
      url: 'master/',
      params: {
        master_type: 'Gender',
      },
    }),
  bankProof: () =>
    Instance({
      method: 'GET',
      url: 'master/',
      params: {
        master_type: 'Bank Proof',
      },
    }),
  FarmerDocument: () =>
    Instance({
      method: 'GET',
      url: 'master/',
      params: {
        master_type: 'Document Format',
      },
    }),

  form: data =>
    Instance({
      method: 'POST',
      url: 'farmer/',
      data: data,
    }),
  selectCountry: () =>
    Instance({
      method: 'GET',
      url: 'countrycurrency/',
    }),
  getState: id =>
    Instance({
      method: 'GET',
      url: 'state/',
      params: {
        country_id: id,
      },
    }),
  getDistrict: id =>
    Instance({
      method: 'GET',
      url: 'district/',
      params: {
        state_id: id,
      },
    }),
  getTaluka: id =>
    Instance({
      method: 'GET',
      url: 'subdistricttaluka/',
      params: {
        district_id: id,
      },
    }),
  getVillageData: id =>
    Instance({
      method: 'GET',
      url: 'village/',
      params: {
        sub_district_id: id,
      },
    }),
};
