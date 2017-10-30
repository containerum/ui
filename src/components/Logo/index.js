import React, { Component } from 'react';

import logo from '../../images/Containerum_logo_new.svg';

class Logo extends Component {
    render() {
        return (
            <div className="text-center p-4">
                <img className="c-logo-login" src={logo} alt="" />
            </div>
        );
    }
}

export default Logo;
