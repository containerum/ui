import { combineReducers } from 'redux';

import dataDeployment from './dDep';
import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';
import signUpReducer from './signUpReducer';
import confirmEmailReducer from './confirmEmailReducer';

const rootReducer = combineReducers({
    dataDeployment,
    loginReducer,
    logoutReducer,
    signUpReducer,
    confirmEmailReducer
});

export default rootReducer;
