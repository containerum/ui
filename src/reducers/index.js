import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import dataDeployment from './dDep';

const rootReducer = combineReducers({
  dataDeployment,
  auth: authReducer,
  form: formReducer
});

export default rootReducer;
