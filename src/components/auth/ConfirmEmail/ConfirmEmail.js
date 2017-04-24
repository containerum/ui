import { Link } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ConfirmEmail extends Component {
    render() {
        const emailUser = this.props.validate.emailUser;
        return (
            <div>
                <div className='row rowform'>
                    <img src='http://placehold.it/70x70' className='img-circle' alt='Responsive image'/>
                    <h1>Containerum</h1>
                    <div className='formcontainer'>
                        <h2>Confirm Email</h2>
                        <div className='form-group'>
                            {
                                <h3>{ emailUser }</h3>
                            }
                        </div>
                        <div className='form-group'>
                            <h4>Confirm your email by clicking the verification link we just send to your inbox.</h4>
                        </div>
                        <Link to='/Login' className='btn btn-default btn-long'>Go to Login</Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        validate: state.validate
    }
}

export default connect(mapStateToProps)(ConfirmEmail)
