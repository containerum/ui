import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import identicons from 'identicons';

import './Profile.css';

class Profile extends Component {
    render() {
        const profileBibSvg = localStorage.getItem('icon_profile_big') ?
            localStorage.getItem('icon_profile_big') :
            identicons.generateSVGDataURIString(this.props.email, { width: 63, size: 4 });
        return (
            <div className="block-item" id="profile">
                <div className="block-item__title">Profile</div>
                <form action="" className="" method="">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group pt-0">
                                <label className="form-group__label-image" htmlFor="avatar">
                                    <img src={profileBibSvg} />
                                </label>
                                <input type="file" className="form-group__hidden-input" id="avatar" />
                            </div>
                        </div>
                        {/*<div className="col-md-5">*/}
                            {/*<div className="form-group">*/}
                                {/*<input type="text" className="form-group__input-text form-control" id="login" />*/}
                                {/*<label className="form-group__label" htmlFor="login">Login</label>*/}
                                {/*<div className="form-group__helper"> </div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        <div className="col-md-5">
                            <div className="form-group">
                                <input type="text" value={this.props.email} disabled className="form-group__input-text form-control" id="email" />
                                {/*<input type="text" className="form-group__input-text form-control" id="email" />*/}
                                <label className="form-group__label form-group__label-always-onfocus" htmlFor="email">Email</label>
                                <div className="form-group__helper"> </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

Profile.propTypes = {
    email: PropTypes.string
};

export default Profile;
