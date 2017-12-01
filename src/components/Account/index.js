import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileSidebar from './ProfileSidebar';
import Profile from './Profile';
import Password from './Password';
import CLI from './CLI';
import WebHook from './WebHook';
import DeleteAccount from './DeleteAccount';
// import Spinner from '../Spinner';
// import Subscription from './Subscription';
// import ConvertCompany from './ConvertCompany';
// import Tokens from './Tokens';

import { getProfile } from '../../actions/ProfileActions/getProfileAction';

import './Account.css';

class Account extends Component {
    componentDidMount() {
        if (!!this.props.GetProfileReducer.data.login) {
            this.props.onLoadProfileData();
        }
    }
    render() {
        const email = Object.keys(this.props.GetProfileReducer.data).length ?
            this.props.GetProfileReducer.data.data.email : '';
        let isFetchingComponent = '';
        if (!this.props.GetProfileReducer.isFetching &&
	        !this.props.GetReleasesGithubReducer.isFetching &&
            !this.props.DeleteProfileReducer.isFetching) {
            isFetchingComponent =
                <div className="content-block-container container container-fluid">
                    <Profile email={email} />
                    <Password />
                    <WebHook />
                    <CLI />
                    <DeleteAccount email={email} />
                </div>;
        } else {
            isFetchingComponent = <img src={require('../../images/acc-main.svg')} style={{marginTop: '28px', width: '100%'}} />;
        }
        return (
            <div>
                <div className="content-block ">
                    <div className=" container no-back">
                        <div className="row double two-columns">
                            <ProfileSidebar
                                isFetchingProfile={this.props.GetProfileReducer.isFetching}
                            />
                            <div className="col-md-9 col-lg-9 col-xl-10">
                                <div className="content-block">
	                                { isFetchingComponent }
                                </div>
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Account.propTypes = {
    onLoadProfileData: PropTypes.func,
    GetProfileReducer: PropTypes.object,
	GetProfileReportReducer: PropTypes.object,
	GetReleasesGithubReducer: PropTypes.object,
	DeleteProfileReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        GetProfileReducer: state.GetProfileReducer,
	    GetProfileReportReducer: state.GetProfileReportReducer,
	    GetReleasesGithubReducer: state.GetReleasesGithubReducer,
	    DeleteProfileReducer: state.DeleteProfileReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadProfileData: () => {
            dispatch(getProfile());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
