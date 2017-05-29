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
        return (
            <div>
                <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                    <Namespaces />
                    <CreateInstance />
                </div>
                <Deployments idName={this.props.params.idName} />
                <Services idName={this.props.params.idName} />
            </div>
        )
    }
}
