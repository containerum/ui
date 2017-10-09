import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AccountSidebar from './AccountSidebar';
import Profile from './Profile';
import Password from './Password';
import CLI from './CLI';
import DeleteAccount from './DeleteAccount';
import Spinner from '../Spinner';
// import Subscription from './Subscription';
// import ConvertCompany from './ConvertCompany';
// import Tokens from './Tokens';

import { getProfile } from '../../actions/ProfileActions/getProfileActions';

import './Account.css';

class Account extends Component {
    componentDidMount() {
        // const cliBlock = document.querySelector('.block-item__copy-string');
        if (!!this.props.GetProfileReducer.data.login) {
            this.props.onLoadProfileData();
        }
    }
    render() {
        const email = Object.keys(this.props.GetProfileReducer.data).length ?
            this.props.GetProfileReducer.data.data.email : '';
        let isFetchingComponent = '';
        if (this.props.GetProfileReducer.isFetching === false) {
            isFetchingComponent =
                <div>
                    <div className="content-block ">
                        <div className=" container no-back">
                            <div className="row double two-columns">
                                <AccountSidebar />
                                <div className="col-md-9 col-lg-9 col-xl-10">
                                    <div className="content-block">
                                        <div className="content-block-container container container-fluid">
                                            <Profile email={email} />
                                            <Password />
                                            <CLI />
                                            <DeleteAccount email={email} />
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix"> </div>
                            </div>
                        </div>
                    </div>
                </div>;
        } else {
            isFetchingComponent = <Spinner />;
        }
        return (
            <div>
                { isFetchingComponent }
            </div>
        );
    }
}

Account.propTypes = {
    onLoadProfileData: PropTypes.func,
    GetProfileReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        GetProfileReducer: state.GetProfileReducer
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
