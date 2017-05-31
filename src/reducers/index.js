import { combineReducers } from 'redux';

import dataDeployment from './dDep';
import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';
import signUpReducer from './signUpReducer';
import confirmEmailReducer from './confirmEmailReducer';
import NamespacesReducer from './NamespacesReducer';
import DeploymentsReducer from './DeploymentsReducer';
import DeploymentReducer from './DeploymentReducer';
import PodReducer from './PodReducer';
import ServicesReducer from './ServicesReducer';
import ServiceReducer from './ServiceReducer';
import ProfileReducer from './ProfileReducer';
import CreateServiceReducer from './CreateServiceReducer';
import CreateDeploymentReducer from './CreateDeploymentReducer';
import checkHashParamReducer from './checkHashParamReducer';
import PodsReducer from './PodsReducer';
import UsersReducer from './UsersReducer';
import UserReducer from './UserReducer';
import ChangePasswordReducer from './ChangePasswordReducer';

const rootReducer = combineReducers({
    dataDeployment,
    loginReducer,
    logoutReducer,
    signUpReducer,
    confirmEmailReducer,
    NamespacesReducer,
    DeploymentsReducer,
    ServicesReducer,
    ServiceReducer,
    ProfileReducer,
    CreateServiceReducer,
    CreateDeploymentReducer,
    checkHashParamReducer,
    PodReducer,
    DeploymentReducer,
    PodsReducer,
    UsersReducer,
    UserReducer,
    ChangePasswordReducer
});

export default rootReducer;
