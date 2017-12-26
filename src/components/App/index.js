import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Fingerprint2 from 'fingerprintjs2';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import config from '../../config';

class App extends Component {
    render() {
        // const options = {excludeUserAgent: true};
        new Fingerprint2().get(function(result, components){
            if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                localStorage.setItem('id_browser', result);
            }
            // console.log(result, components); // an array of FP components
        });
        return (
            <div>
                <Helmet {...config.app} />
                <div className="wrapper">
                    <Header idName={this.props.params.idName} />
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}

App.propTypes = {
    params: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.node
};

export default App;
