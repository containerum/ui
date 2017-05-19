import React, { Component } from 'react';
import Deployments from '../Deployments';
import Services from '../Services';
import Namespaces from '../../components/Namespaces';
import CreateInstance from '../../components/CreateInstance';

export default class Workloads extends Component {
    componentWillMount() {
        document.body.classList.remove('c-body-bg');
    }
    render() {
        if (this.props.params.hasOwnProperty('nameSpace')) {
            console.log(this.props.params.nameSpace);
        }
        return (
            <div>
                <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                    <Namespaces />
                    <CreateInstance />
                </div>
                <Deployments />
                <Services />
            </div>
        )
    }
}
