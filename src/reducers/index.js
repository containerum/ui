import { combineReducers } from 'redux';

import dataDeployment from './dDep';
import validate from './validate';
import auth from './auth';

const rootReducer = combineReducers({
    dataDeployment,
    validate,
    auth
});

export default rootReducer;
