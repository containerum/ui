import { combineReducers } from 'redux';

import LoginReducer from './AuthReducers/LoginReducer';
import LogoutReducer from './AuthReducers/LogoutReducer';
import SignUpReducer from './AuthReducers/SignUpReducer';
import ChangePasswordReducer from './AuthReducers/ChangePasswordReducer';
import UserHashConfirmReducer from './AuthReducers/UserHashConfirmReducer';
import ConfirmEmailReducer from './AuthReducers/ConfirmEmailReducer';
import CheckHashPasswordReducer from './AuthReducers/CheckHashPasswordReducer';
import RecoveryPasswordReducer from './AuthReducers/RecoveryPasswordReducers';
import EmailUpdateReducer from './AuthReducers/EmailUpdateReducer';
import CheckRelationWithGitHubAccountReducer from './AuthReducers/CheckRelationWithGitHubAccountReducer';
import NamespacesReducer from './NamespacesReducers';
import NSTariffsReducer from './NamespacesReducers/NSTariffsReducer';
import GetNamespaceReducer from './NamespaceReducers/GetNamespaceReducer';
import CreateNamespaceReducer from './NamespaceReducers/CreateNamespaceReducer';
import DeleteNamespaceReducer from './NamespaceReducers/DeleteNamespaceReducer';
import UpdateNamespaceReducer from './NamespaceReducers/UpdateNamespaceReducer';
import VolumesReducer from './VolumesReducers';
import VolumesTariffsReducer from './VolumesReducers/VolumesTariffsReducer';
import VolumesByNSReducer from './VolumesReducers/VolumesByNSReducer';
import CreateVolumeReducer from './VolumeReducers/CreateVolumeReducer';
import DeploymentsReducer from './DeploymentsReducers';
import GetDeploymentReducer from './DeploymentReducers/GetDeploymentReducer';
import DeleteDeploymentReducer from './DeploymentReducers/DeleteDeploymentReducer';
import CreateDeploymentReducer from './DeploymentReducers/CreateDeploymentReducer';
import ServicesReducer from './ServicesReducers';
import GetServiceReducer from './ServiceReducers/GetServiceReducer';
import DeleteServiceReducer from './ServiceReducers/DeleteServiceReducer';
import CreateIntServiceReducer from './ServiceReducers/CreateIntServiceReducer';
import CreateExtServiceReducer from './ServiceReducers/CreateExtServiceReducer';
import PodsReducer from './PodsReducers';
import GetPodReducer from './PodReducers/GetPodReducer';
import DeletePodReducer from './PodReducers/DeletePodReducer';
import GetProfileReducer from './ProfileReducers/GetProfileReducer';
import DeleteProfileReducer from './ProfileReducers/DeleteProfileReducer';
import GetProfileBalanceReducer from './BillingReducers/GetProfileBalanceReducer';
import GetTariffsReducer from './BillingReducers/GetTariffsReducer';
import PayForReducer from './BillingReducers/PayForReducer';
import CouponPayReducer from './BillingReducers/CouponPayReducer';
import GetProfileReportReducer from './BillingReducers/GetProfileReportReducer';
import ConvertToCompanyReducer from './UserReducers/ConvertToCompanyReducer';
import EmailSubscriptionsReducer from './UserReducers/EmailSubscriptionsReducer';
import GetReleasesGithubReducer from './UserReducers/GetReleasesGithubReducer';
import GroupOmnideskReducer from './OmnideskReducers/GetGroupOmnideskReducer';
import SupportReducer from './SupportReducer';
import TokensReducer from './TokensReducers';
import GetImageTokensReducer from './TokensReducers/GetImageTokensReducer';
import CreateImageTokensReducer from './TokensReducers/CreateImageTokensReducer';
import DeleteImageTokensReducer from './TokensReducers/DeleteImageTokensReducer';
import GetVolumeReducer from './VolumeReducers/GetVolumeReducer';
import DeleteVolumeReducer from './VolumeReducers/DeleteVolumeReducer';
import UpdateVolumeReducer from './VolumeReducers/UpdateVolumeReducer';
import UpdateExtServiceReducer from './ServiceReducers/UpdateExtServiceReducer';
import UpdateIntServiceReducer from './ServiceReducers/UpdateIntServiceReducer';
import UpdateDeploymentReducer from './DeploymentReducers/UpdateDeploymentReducer';

const rootReducer = combineReducers({
    LoginReducer,
    LogoutReducer,
    SignUpReducer,
    ConfirmEmailReducer,
    NamespacesReducer,
    VolumesReducer,
    DeploymentsReducer,
	UpdateDeploymentReducer,
    ServicesReducer,
    GetServiceReducer,
    GetProfileReducer,
    DeleteProfileReducer,
	CreateExtServiceReducer,
    CreateIntServiceReducer,
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
    GetImageTokensReducer,
    GroupOmnideskReducer,
    GetReleasesGithubReducer,
    CreateNamespaceReducer,
    UpdateNamespaceReducer,
    NSTariffsReducer,
    VolumesTariffsReducer,
	VolumesByNSReducer,
    CreateVolumeReducer,
    GetProfileBalanceReducer,
    GetTariffsReducer,
    PayForReducer,
	CouponPayReducer,
    GetProfileReportReducer,
    DeleteNamespaceReducer,
    GetNamespaceReducer,
    CreateImageTokensReducer,
    DeleteImageTokensReducer,
    GetVolumeReducer,
    DeleteVolumeReducer,
    UpdateVolumeReducer,
	UpdateExtServiceReducer,
	UpdateIntServiceReducer
});

export default rootReducer;
