import React, { Component } from 'react';
import { Link } from 'react-router';
import { logoutUser } from '../../../actions/LogoutActions'
import { connect } from 'react-redux'

class ButtonDropRight extends Component {
    render() {
        const errorMessage = this.props.errorMessage;
        return (
            <div className='dropdown'>
                <button
                    className='btn btn-default dropdown-toggle'
                    type='button'
                    id='dropdownMenu1'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='true'
                >
                    <span className='caret'></span>
                </button>
                <ul className='dropdown-menu' aria-labelledby='dropdownMenu1'>
                    <li>
                        <a href='#'>
                        <img
                            src='http://www.esek.org.gr/images/ESET/eset_user.png'
                            alt='...'
                            className='img-circle'
                        />kfeofantov
                        </a>
                    </li>
                    <li>
                        <a href='#'>kfeofantov @gmail.com</a>
                    </li >
                    <li role='separator' className='divider'></li>
                    <li>
                        <Link to='/Profile'>Profile</Link>
                    </li>
                    <li>
                        <Link to='/Billing'>Billing</Link>
                    </li>
                    <li>
                        <Link to='/Referrals'>Referrals</Link>
                    </li>
                    <li>
                        <Link onClick={() => this.props.onLogoutClick()} to='/Login'>Log Out</Link>
                    </li>
                </ul>
                <p>
                    {errorMessage}
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { logoutReducer } = state;
    const { errorMessage } = logoutReducer;

    return {
        errorMessage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutClick: () => {
            dispatch(logoutUser())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonDropRight)
