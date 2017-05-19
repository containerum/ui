import React, { Component } from 'react';
// import LocaleSwitcher from '../../components/LocaleSwitcher/LocaleSwitcher';
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
                    {this.props.children}
                    <Footer />
                </div>
            </div>
        );
    }
}