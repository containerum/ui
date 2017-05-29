import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { logoutUser } from '../../actions/LogoutActions';
import { getProfile } from '../../actions/ProfileActions';
import logo from '../../images/Containerum_logo_new.png';
import CommonInfoDropdown from './CommonInfoDropdown';
import ProfileInfoDropdown from './ProfileInfoDropdown';

import '../../localization/en/header';
import '../../localization/ru/header';

class Header extends Component {
    componentDidMount() {
        this.props.onLoadProfileData();
    }
    handleClickLogo() {
        browserHistory.push('/Namespaces/default');
    }
    render() {
        let userEmail = this.props.ProfileReducer.data.login ? this.props.ProfileReducer.data.login : 'kfeofantov@wqe.qwe';
        return (
            <div className="navbar navbar-inverse navbar-toggleable-md c-navbar i-hover-pointer">
                <div className="navbar-brand i-navbar-brand-pd-l" onClick={this.handleClickLogo.bind(this)}>
                    <img className="d-inline-block align-top i-sizes-img-logo" src={logo} alt="Logo"/>
                </div>
                <div className="collapse navbar-collapse justify-content-end">
                    <CommonInfoDropdown />
                    <ProfileInfoDropdown onLogoutClick={this.props.onLogoutClick} userEmail={userEmail} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        logoutReducer: state.logoutReducer,
        ProfileReducer: state.ProfileReducer,
        errorMessage: state.errorMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutClick: () => {
            dispatch(logoutUser())
        },
        onLoadProfileData: () => {
            dispatch(getProfile())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)
