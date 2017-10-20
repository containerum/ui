import React, { Component } from 'react';
import PropTypes from 'prop-types';

import YandexGeocoder from '../../../functions/yandex-geocoder';
import { COUNTRIES } from '../../../constants/CountriesBilling';
import '../../../styles/flags.css';

class CountrySelector extends Component {
    constructor() {
        super();
        this.state = {
            currentCountry: 'Russian Federation',
            currentCountryCode: 'RU',
            billing_code: '182',
            displayedCountries: COUNTRIES
        };
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
                    // console.log(defaultCountry);
                    this.setState({
                        ...this.state,
                        currentCountry: defaultCountry.name,
                        currentCountryCode: defaultCountry.value,
                        billing_code: defaultCountry.country_code
                    });
                });
            }
        });
    }
    handleSelectCountryCode(name, value, billing_code) {
        this.setState({
            ...this.state,
            currentCountry: name,
            currentCountryCode: value,
            billing_code
        });
        this.props.handleSelectCountry(billing_code);
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
        return (
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
                                        // console.log(item);
                                        return (
                                            <li
                                                tabIndex={index}
                                                className="dropdown-item"
                                                key={item.value}
                                                onClick={(name, value, billing_code) => this.handleSelectCountryCode(item.name, item.value, item.billing_code)}
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
        );
    }
}

CountrySelector.propTypes = {
    handleSelectCountry: PropTypes.func
};

export default CountrySelector;
