import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Deployments from '../Deployments';
import Services from '../Services';
// import CreateInstance from '../CreateInstance';
import NamespacesDropDown from '../NamespacesDropDown';

class Panel extends Component {
    render() {
        return (
            <div>
                <div>
                    <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                        <NamespacesDropDown />
                        {/*<CreateInstance idName={this.props.params.idName} />*/}
                    </div>
                </div>
                <Deployments idName={this.props.params.idName} />
                <Services idName={this.props.params.idName} />
            </div>
        );
    }
}

Panel.propTypes = {
    params: PropTypes.object.isRequired
};

export default Panel;
