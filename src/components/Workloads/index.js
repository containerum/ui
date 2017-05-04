import React, { Component } from 'react';
import Namespaces from '../Namespaces';
import CreateInstance from '../CreateInstance';

export default class Workloads extends Component {
    componentWillMount() {
        document.body.classList.remove('c-body-bg');
    }
    render() {
        return (
            <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                <Namespaces />
                <CreateInstance />
            </div>
        )
    }
}
