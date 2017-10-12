import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
// import { Scrollbars } from 'react-custom-scrollbars';

import { SignUpUser } from '../../../actions/SignUpActions';
import YandexGeocoder from '../../../functions/yandex-geocoder';
import InputEmail from '../InputEmail';
import InputPassword from '../InputPassword';
import Logo from '../../Logo';
import MiniSpinner from '../../MiniSpinner';
import { COUNTRIES } from '../../../constants/Countries';
import '../../../styles/flags.css';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            toggleActive: false,
            idOfActiveToggle: 'option1',
            errorMsg: '',
            email: '',
            isValidEmail: false,
            password: '',
            isValidPassword: false,
            currentCountry: 'Russian Federation',
            currentCountryCode: 'RU',
            ISONumericalCode: '643',
            displayedCountries: COUNTRIES
        };
        this.handleChangeOnToggle = this.handleChangeOnToggle.bind(this);
        this.handleCheckValidateEmailInput = this.handleCheckValidateEmailInput.bind(this);
        this.handleCheckValidatePasswordInput = this.handleCheckValidatePasswordInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        document.body.classList.add('c-body-bg');
        localStorage.removeItem('id_token');
    }
    componentDidMount() {
        const yandexGeocoder = new YandexGeocoder();
        navigator.geolocation.getCurrentPosition((position) => {
            if (position) {
                yandexGeocoder.resolve(`${position.coords.longitude},${position.coords.latitude}`, (err, collection) => {
                    if (err) throw err;
                    const defaultCountry = COUNTRIES.find(item => {
                        return item.value === collection[0].country_code
                    });
                    this.setState({
                        ...this.state,
                        currentCountry: defaultCountry.name,
                        currentCountryCode: defaultCountry.value,
                        ISONumericalCode: defaultCountry.ISONumericalCode
                    });
                });
            }
        });

        if (this.props.location.query.error) {
            this.setState({
                ...this.state,
                errorMsg: 'Email or Password is not valid'
            });
            const getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errorMessage) {
            this.setState({
                ...this.state,
                errorMsg: nextProps.errorMessage
            });
            const getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
    }
    handleChangeOnToggle(e) {
        const targetId = e.target.id;
        if (this.state.idOfActiveToggle !== targetId) {
            this.setState({
                ...this.state,
                toggleActive: !this.state.toggleActive,
                idOfActiveToggle: targetId
            });
        }
    }
    handleCheckValidateEmailInput(email, isValidEmail) {
        this.setState({
            ...this.state,
            email,
            isValidEmail
        });
    }
    handleCheckValidatePasswordInput(password, isValidPassword) {
        this.setState({
            ...this.state,
            password,
            isValidPassword
        });
    }
    handleClick(event) {
        event.preventDefault();
        if (this.state.password.length <= 7) {
            this.setState({
                ...this.state,
                errorMsg: 'Password must be at least 8 characters long'
            });
            const getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        } else if (this.state.isValidEmail && this.state.isValidPassword) {
            const creds = {
                username: this.state.email.trim(),
                password: this.state.password.trim(),
                country_code: this.state.ISONumericalCode
            };
            this.props.onSignUpUser(creds);
        } else {
            this.setState({
                ...this.state,
                errorMsg: 'Email or Password is not valid'
            });
            const getAlert = document.getElementById('loginAlert');
            getAlert.style.display = 'block';
        }
    }
    handleSelectCountry(name, value, ISONumericalCode) {
        this.setState({
            ...this.state,
            currentCountry: name,
            currentCountryCode: value,
            ISONumericalCode
        });
    }
    handleChangeCountry(e) {
        const query = e.target.value.toLowerCase().trim();

        const displayedCountries = COUNTRIES.filter(function(item) {
            return item.name.toLowerCase().search(query) >= 0;
        });
        this.setState({
            displayedCountries: displayedCountries
        });
    }
    render() {
        let toggleCompanyComponent = '';
        if (this.state.toggleActive === true) {
            toggleCompanyComponent = (
                <div>

                    <label className="sr-only" htmlFor="inlineFormInputCompanyName">Company name</label>
                    <div className="form-group i-mb-20 c-has-feedback-left">
                        <input
                            ref="company_name"
                            required="required"
                            type="text"
                            className="form-control"
                            id="inlineFormInputCompanyName"
                            placeholder="Company name"
                        />
                        <i className="c-form-control-icon fa fa-address-book fa-1" />
                    </div>

                    <label className="sr-only" htmlFor="inlineFormInputTaxCode">Tax Code</label>
                    <div className="form-group i-mb-20 c-has-feedback-left">
                        <input
                            ref="tax_code"
                            required="required"
                            type="text"
                            className="form-control"
                            id="inlineFormInputTaxCode"
                            placeholder="Tax Code"
                        />
                        <i className="c-form-control-icon fa fa-tag fa-1" />
                    </div>
                </div>
            );
        }
        const defaultEmail = this.props.location.query.email ? this.props.location.query.email : '';
        const signUpButtonText = this.props.SignUpReducer.isFetching ? <MiniSpinner /> : 'Sign Up';
        const isActiveSignUpButton = this.props.SignUpReducer.isFetching ?
            'btn btn-block c-btn-green disabled' :
            'btn btn-block c-btn-green';
        const isActiveSignUpState = !!this.props.SignUpReducer.isFetching;
        return (
            <div className="main_container">
                <Logo />
                <form className="form-signin" onSubmit={(event) => this.handleClick(event)}>
                    <div className="card c-card">
                        <div className="card-block p-5">
                            <div className="card-label">
                                Sign up
                            </div>
                            <div id="loginAlert" className="alert alert-danger mb-4 c-alert-danger">
                                { this.state.errorMsg }
                            </div>
                            <div>
                                {/* <div className="text-center i-height-btn-group i-mb-20">*/}
                                {/* <div className="btn-group">*/}
                                {/* <label*/}
                                {/* className={this.state.idOfActiveToggle === "option1"*/}
                                {/* ? "btn btn-success active" : "btn btn-success"}>*/}
                                {/* <input*/}
                                {/* onChange={this.handleChangeOnToggle}*/}
                                {/* type="radio"*/}
                                {/* name="options"*/}
                                {/* id="option1"*/}
                                {/* checked={!this.state.toggleActive}*/}
                                {/* />Individual*/}
                                {/* </label>*/}
                                {/* <label*/}
                                {/* className="btn btn-success disabled"*/}
                                {/* // className={this.state.idOfActiveToggle === "option2"*/}
                                {/* //     ? "btn btn-success active" : "btn btn-success"}*/}
                                {/* >*/}
                                {/* <input*/}
                                {/* // onChange={this.handleChangeOnToggle}*/}
                                {/* type="radio"*/}
                                {/* name="options"*/}
                                {/* id="option2"*/}
                                {/* checked={this.state.toggleActive}*/}
                                {/* />Company*/}
                                {/* </label>*/}
                                {/* </div>*/}
                                {/* </div>*/}
                            </div>
                            <InputEmail
                                handleEmail={
                                    (email, isValidEmail) =>
                                        this.handleCheckValidateEmailInput(email, isValidEmail)
                                }
                                defaultUserEmail={defaultEmail}
                            />
                            <InputPassword
                                handlePassword={
                                    (password, isValidPassword) =>
                                        this.handleCheckValidatePasswordInput(password, isValidPassword)
                                }
                            />
                            {toggleCompanyComponent}

                            <div className="form-group i-mb-20 c-has-feedback-left">
                                <div className="dropdown">
                                    <div
                                        className="btn btn-secondary bfh-selectbox-toggle custom-select"
                                        id="dropdownMenu2"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <span className="bfh-selectbox-option input-medium">
                                            <img
                                                className={this.state.currentCountryCode ?
                                                    `flag ${this.state.currentCountryCode.toLowerCase()} fnone` : ''}
                                            /> {this.state.currentCountry}</span>
                                    </div>
                                    <div
                                        className="dropdown-menu dropdown-menu-width"
                                        aria-labelledby="dropdownMenu2"
                                    >
                                        <input
                                            type="text"
                                            className="bfh-selectbox-filter"
                                            onInput={this.handleChangeCountry.bind(this)}
                                        />
                                        <div
                                            className="bfh-selectbox-options">
                                            <ul>
                                                {
                                                    this.state.displayedCountries.map((item, index) => {
                                                        const flag = item.value.toLowerCase();
                                                        return (
                                                            <li
                                                                tabIndex={index}
                                                                className="dropdown-item"
                                                                key={item.value}
                                                                onClick={(name, value, ISONumericalCode) => this.handleSelectCountry(item.name, item.value, item.ISONumericalCode)}
                                                            >
                                                                <a data-option={`${item.value}`}>
                                                                    <img className={`flag ${flag} fnone`} /> {item.name}
                                                                </a>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                ref="button"
                                className={isActiveSignUpButton}
                                disabled={isActiveSignUpState}
                            >
                                { signUpButtonText }
                            </button>
                        </div>
                        <div className="card-footer p-3 text-center">
                            By signing up, you agree to the <a href="https://containerum.com/license-agreement">Public Offer</a>
                            and <br/><a href="https://containerum.com/privacy-policy">Privacy Policy</a>
                        </div>
                    </div>
                    <p className="text-center pt-3 c-wt">
                        Already have an account? <Link to="/Login" className="c-link-wt">Log In</Link>
                    </p>
                </form>
            </div>
        );
    }
}

SignUp.propTypes = {
    onSignUpUser: PropTypes.func.isRequired,
    quote: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    errorMessage: PropTypes.string,
    location: PropTypes.object,
    SignUpReducer: PropTypes.object,
    isSecretQuote: PropTypes.bool
};

function mapStateToProps(state) {
    const { SignUpReducer } = state;
    const { errorMessage } = SignUpReducer;

    return {
        errorMessage,
        SignUpReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignUpUser: creds => {
            dispatch(SignUpUser(creds));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
