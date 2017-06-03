import { combineReducers } from 'redux';

import dataDeployment from './dDep';
import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';
import signUpReducer from './signUpReducer';
import confirmEmailReducer from './confirmEmailReducer';
import NamespacesReducer from './NamespacesReducer';
import DeploymentsReducer from './DeploymentsReducer';
import GetDeploymentReducer from './DeploymentReducers/GetDeploymentReducer';
import DeleteDeploymentReducer from './DeploymentReducers/DeleteDeploymentReducer';
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
    GetDeploymentReducer,
    PodsReducer,
    UsersReducer,
    UserReducer,
    ChangePasswordReducer,
    DeleteDeploymentReducer
});

export default rootReducer;
