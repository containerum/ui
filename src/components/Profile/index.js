import React, { Component } from 'react';
import Account from './Account';
import CliToken from './CliToken';

export default class Profile extends Component {
    render() {
        return (
            <div>
                <Account />
                <CliToken />
            </div>
        );
    }
}
