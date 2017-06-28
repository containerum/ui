import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Account.css';

import avatar from '../../../images/avatar.jpg';

class Profile extends Component {
    render() {
        const userEmail = this.props.GetProfileReducer.data.login ? this.props.GetProfileReducer.data.login : '';
        const userLogin = this.props.GetProfileReducer.data.data ? this.props.GetProfileReducer.data.data.email : '';
        return (
            <div className="card-block c-table-card-block">
                <table className="table i-table-card">
                    <tbody>
                    <tr>
                        <td className="first-td-width">
                            <h2 id="profile">
                                <a name="profile" className="anchor" href="#profile">Profile</a>
                            </h2>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                            <img src={avatar} alt='Avatar' className='img-rounded'/>
                        </td>
                        <td>
                            <div className="i-user-login">
                                <span>{userEmail}</span> <br/>
                                <span>{userLogin}</span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        GetProfileReducer: state.GetProfileReducer
    }
}

export default connect(mapStateToProps)(Profile);
