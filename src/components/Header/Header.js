import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import { logoutUser } from '../../actions/LogoutActions';
import { getProfile } from '../../actions/ProfileActions/getProfileActions';
import logo from '../../images/Containerum_logo_new.svg';
import CommonInfoDropdown from './CommonInfoDropdown';
import ProfileInfoDropdown from './ProfileInfoDropdown';

import '../../localization/en/header';
import '../../localization/ru/header';

class Header extends Component {
    componentDidMount() {
        this.props.onLoadProfileData();
    }
    handleClickLogo() {
        if (this.props.idName) {
            browserHistory.push('/Namespaces/' + this.props.idName);
        } else {
            browserHistory.push('/Namespaces/default');
        }
    }
    render() {
        const userEmail = this.props.GetProfileReducer.data.login ? this.props.GetProfileReducer.data.login : '';
        return (
            <div className="c-navbar">
                <div className="navbar navbar-inverse navbar-toggleable-md i-hover-pointer">
                    <div className="navbar-brand i-navbar-brand-pd-l" onClick={this.handleClickLogo.bind(this)}>
                        <img className="d-inline-block align-top i-sizes-img-logo" src={logo} alt="Logo"/>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end">
                        <CommonInfoDropdown />
                        <ProfileInfoDropdown onLogoutClick={this.props.onLogoutClick} userEmail={userEmail} />
                    </div>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    idName: PropTypes.string,
    onLogoutClick: PropTypes.func,
    onLoadProfileData: PropTypes.func,
    GetProfileReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        logoutReducer: state.logoutReducer,
        GetProfileReducer: state.GetProfileReducer,
        errorMessage: state.errorMessage
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutClick: () => {
            dispatch(logoutUser());
        },
        onLoadProfileData: () => {
            dispatch(getProfile());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
