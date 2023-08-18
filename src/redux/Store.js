import {createStore, combineReducers} from 'redux';

import {formReducer} from './Reducer/formReducer';
import {loginReducer} from './Reducer/loginReducer';

const rootReducer = combineReducers({
  formReducer: formReducer,
  loginReducer: loginReducer,
});
const store = createStore(rootReducer);

export const clearX = () => {
  rootReducer();
};

export default store;
