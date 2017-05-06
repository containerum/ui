import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getProfile } from '../../actions/ProfileActions';

class ProfileInfoEmail extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getProfile());
    }
    render() {
        let userName = this.props.ProfileReducer.data.login ? this.props.ProfileReducer.data.login : 'User Name';
        return (
            <span className="c-nav-user-name">
                { userName }
            </span>
        );
    }
}

ProfileInfoEmail.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps (state) {
    const { ProfileReducer } = state;
    const { errorMessage } = ProfileReducer;

    return {
        errorMessage,
        ProfileReducer
    }
}

export default connect(mapStateToProps)(ProfileInfoEmail)
