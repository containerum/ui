import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import '../../styles/bootstrap.min.css';
import '../../styles/custom.css';
import '../../styles/individual.css';

class App extends Component {
    render() {
        return (
            <div>
                <div className="wrapper">
                    <Header idName={this.props.params.idName} />
                    {this.props.children}
                    <Footer />
                </div>
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
