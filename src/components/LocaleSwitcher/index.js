import React, { Component } from 'react';
import counterpart from 'counterpart';

export default class LocaleSwitcher extends Component {
    constructor() {
        super();
        this.handleChangeLocate = this.handleChangeLocate.bind(this);
        const locateState = localStorage.getItem('locate_token');
        counterpart.setLocale(locateState);
        this.state = {
            locate: locateState ? locateState : 'en'
        };
    }
    componentDidMount() {
        if (!localStorage.getItem('locate_token')) {
            localStorage.setItem('locate_token', this.state.locate);
        }
    }
    handleChangeLocate(e) {
        this.setState({
            locate: e.target.value
        });
        localStorage.setItem('locate_token', e.target.value);
        counterpart.setLocale(localStorage.getItem('locate_token'));
    }
    render() {
        return (
            <p>
                <span>Switch Locale:</span>

                <select defaultValue={counterpart.getLocale()} onChange={this.handleChangeLocate}>
                    <option>en</option>
                    <option>ru</option>
                </select>
            </p>
        );
    }
}
