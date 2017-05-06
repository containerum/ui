import React, { Component } from 'react';
import Deployments from '../Deployments';
import Services from '../Services';

export default class Workloads extends Component {
    componentWillMount() {
        document.body.classList.remove('c-body-bg');
    }
    render() {
        return (
            <div>
                <Deployments />
                <Services />
            </div>
        )
    }
}
