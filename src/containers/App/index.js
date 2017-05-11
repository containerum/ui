import React, { Component } from 'react';
// import LocaleSwitcher from '../../components/LocaleSwitcher/LocaleSwitcher';
import Namespaces from '../../components/Namespaces';
import CreateInstance from '../../components/CreateInstance';
import Spinner from '../../components/Spinner';
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token');

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import '../../styles/bootstrap.min.css';
import '../../styles/custom.css';
import '../../styles/individual.css';

export default class App extends Component {
    render() {
        return (
            <div>
                <Spinner />
                <div className="wrapper">
                    {/*<LocaleSwitcher />*/}
                    <Header />
                    <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                        <Namespaces />
                        <CreateInstance />
                    </div>
                    {this.props.children}
                    <Footer />
                </div>
            </div>
        );
    }
}