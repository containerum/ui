import { combineReducers } from 'redux';

import dataDeployment from './dDep';
import validate from './validateInputsReducer';
import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';
import signUpReducer from './signUpReducer';
import confirmEmailReducer from './confirmEmailReducer';

const rootReducer = combineReducers({
    dataDeployment,
    validate,
    loginReducer,
    logoutReducer,
    signUpReducer,
    confirmEmailReducer
});

export default rootReducer;
