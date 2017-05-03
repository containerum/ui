import React, { Component } from 'react';
import Namespaces from '../Namespaces';
import CreateInstance from '../CreateInstance';

export default class Workloads extends Component {
    render() {
        return (
            <div className="navbar navbar-inverse main-header">
                <div className="container d-flex justify-content-between">
                <Namespaces />
                <div className="d-flex flex-row-reverse">
                    <CreateInstance />
                </div>
                </div>
            </div>
        )
    }
}
