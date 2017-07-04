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
import GetPodReducer from './PodReducers/GetPodReducer';
import DeletePodReducer from './PodReducers/DeletePodReducer';
import ServicesReducer from './ServicesReducer';
import getServiceReducer from './ServiceReducers/getServiceReducer';
import DeleteServiceReducer from './ServiceReducers/DeleteServiceReducer';
import GetProfileReducer from './ProfileReducers/GetProfileReducer';
import DeleteProfileReducer from './ProfileReducers/DeleteProfileReducer';
import CreateServiceReducer from './CreateServiceReducer';
import CreateDeploymentReducer from './CreateDeploymentReducer';
import PodsReducer from './PodsReducer';
import UsersReducer from './UsersReducer';
import UserReducer from './UserReducer';
import ChangePasswordReducer from './ChangePasswordReducer';
import UserHashConfirmReducer from './UserHashConfirmReducer';
import SupportReducer from './SupportReducer';
import EmailUpdateReducer from './EmailUpdateReducer';
import ConvertToCompanyReducer from './ConvertToCompanyReducer';
import EmailSubscriptionsReducer from './EmailSubscriptionsReducer';
import CheckHashPasswordReducer from './CheckHashPasswordReducer';
import RecoveryPasswordReducer from './RecoveryPasswordReducers';

const rootReducer = combineReducers({
    dataDeployment,
    loginReducer,
    logoutReducer,
    signUpReducer,
    confirmEmailReducer,
    NamespacesReducer,
    DeploymentsReducer,
    ServicesReducer,
    getServiceReducer,
    GetProfileReducer,
    DeleteProfileReducer,
    CreateServiceReducer,
    CreateDeploymentReducer,
    GetPodReducer,
    GetDeploymentReducer,
    PodsReducer,
    UsersReducer,
    UserReducer,
    ChangePasswordReducer,
    DeleteDeploymentReducer,
    DeletePodReducer,
    DeleteServiceReducer,
    UserHashConfirmReducer,
    SupportReducer,
    EmailUpdateReducer,
    ConvertToCompanyReducer,
    EmailSubscriptionsReducer,
    CheckHashPasswordReducer,
    RecoveryPasswordReducer
});

export default rootReducer;
