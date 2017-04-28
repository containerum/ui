import React, { Component } from 'react';
import NavLink from '../../components/NavLink';
import NavBar from '../../components/NavBar';
import Translate   from 'react-translate-component';
import LocaleSwitcher from '../../components/LocaleSwitcher/LocaleSwitcher';

import '../../localization/en/app';
import '../../localization/ru/app';

import '../../styles/bootstrap.min.css';
import '../../styles/custom.css';
import '../../styles/individual.css';

export default class App extends Component {
    render() {
        return (
            <div className='container'>
                <LocaleSwitcher />
                <NavBar />
                <ul className='nav nav-pills nav-stacked'>
                    <li>
                        <NavLink onlyActiveOnIndex={true} to='/'>
                            <Translate content='app.workloads'>Workloads</Translate>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Deployments'>
                            <Translate content='app.deployments'>Deployments</Translate>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/ReplicaSets'>
                            <Translate content='app.replicaSets'>Replica Sets</Translate>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Pods'>
                            <Translate content='app.pods'>Pods</Translate>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Services'>
                            <Translate content='app.services'>Services</Translate>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Storage'>
                            <Translate content='app.storage'>Storage</Translate>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Volume'>
                            <Translate content='app.volume'>Volume</Translate>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Config'>
                            <Translate content='app.config'>Config</Translate>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Secrets'>
                            <Translate content='app.secrets'>Secrets</Translate>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Tokens'>
                            <Translate content='app.tokens'>Tokens</Translate>
                        </NavLink>
                    </li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}