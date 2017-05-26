import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token');

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import '../../styles/bootstrap.min.css';
import '../../styles/custom.css';
import '../../styles/individual.css';

export default class App extends Component {
    componentDidMount() {
        if (this.props.params.idName &&
            this.props.params.idName === 'default' &&
            Object.keys(this.props.params).length <= 1) {
            browserHistory.push('/Namespaces/default');
        } else if (Object.keys(this.props.params).length <= 1 && this.props.params.idName) {
            browserHistory.push('/Namespaces/' + this.props.params.idName);
        } else if (Object.keys(this.props.params).length === 0) {
            browserHistory.push('/Namespaces/default');
        }
    }
    render() {
        return (
            <div>
                <div className="wrapper">
                    <Header />
                    {this.props.children}
                    <Footer />
                </div>
            </div>
        );
    }
}
