import { combineReducers } from 'redux';

import loginReducer from './AuthReducers/LoginReducer';
import logoutReducer from './AuthReducers/LogoutReducer';
import signUpReducer from './AuthReducers/SignUpReducer';
import ConfirmEmailReducer from './AuthReducers/ConfirmEmailReducer';
import NamespacesReducer from './NamespacesReducers';
import VolumesReducer from './VolumesReducers';
import DeploymentsReducer from './DeploymentsReducers';
import GetDeploymentReducer from './DeploymentReducers/GetDeploymentReducer';
import DeleteDeploymentReducer from './DeploymentReducers/DeleteDeploymentReducer';
import GetPodReducer from './PodReducers/GetPodReducer';
import DeletePodReducer from './PodReducers/DeletePodReducer';
import ServicesReducer from './ServicesReducers';
import GetServiceReducer from './ServiceReducers/GetServiceReducer';
import DeleteServiceReducer from './ServiceReducers/DeleteServiceReducer';
import GetProfileReducer from './ProfileReducers/GetProfileReducer';
import DeleteProfileReducer from './ProfileReducers/DeleteProfileReducer';
import CreateServiceReducer from './ServiceReducers/CreateServiceReducer';
import CreateDeploymentReducer from './DeploymentReducers/CreateDeploymentReducer';
import PodsReducer from './PodsReducers';
import ChangePasswordReducer from './AuthReducers/ChangePasswordReducer';
import UserHashConfirmReducer from './AuthReducers/UserHashConfirmReducer';
import SupportReducer from './SupportReducer';
import EmailUpdateReducer from './AuthReducers/EmailUpdateReducer';
import ConvertToCompanyReducer from './UserReducers/ConvertToCompanyReducer';
import EmailSubscriptionsReducer from './UserReducers/EmailSubscriptionsReducer';
import CheckHashPasswordReducer from './AuthReducers/CheckHashPasswordReducer';
import RecoveryPasswordReducer from './AuthReducers/RecoveryPasswordReducers';
import CheckRelationWithGitHubAccountReducer from './AuthReducers/CheckRelationWithGitHubAccountReducer';
import GroupOmnideskReducer from './OmnideskReducers/GetGroupOmnideskReducer';
import TokensReducer from './TokensReducers';
import GetReleasesGithubReducer from './UserReducers/GetReleasesGithubReducer';
import CreateNamespaceReducer from './NamespaceReducers/CreateNamespaceReducer';
import NSTariffsReducer from './NamespacesReducers/NSTariffsReducer';
import VolumesTariffsReducer from './VolumesReducers/VolumesTariffsReducer';
import CreateVolumeReducer from './VolumeReducers/CreateVolumeReducer';
import GetProfileBalanceReducer from './BillingReducers/GetProfileBalanceReducer';

const rootReducer = combineReducers({
    loginReducer,
    logoutReducer,
    signUpReducer,
    ConfirmEmailReducer,
    NamespacesReducer,
    VolumesReducer,
    DeploymentsReducer,
    ServicesReducer,
    GetServiceReducer,
    GetProfileReducer,
    DeleteProfileReducer,
    CreateServiceReducer,
    CreateDeploymentReducer,
    GetPodReducer,
    GetDeploymentReducer,
    PodsReducer,
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
    RecoveryPasswordReducer,
    CheckRelationWithGitHubAccountReducer,
    TokensReducer,
    GroupOmnideskReducer,
    GetReleasesGithubReducer,
    CreateNamespaceReducer,
    NSTariffsReducer,
    VolumesTariffsReducer,
    CreateVolumeReducer,
    GetProfileBalanceReducer
});

export default rootReducer;
