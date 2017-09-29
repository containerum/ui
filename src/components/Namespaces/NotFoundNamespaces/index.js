import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NotFoundNamespaces extends Component {
    render() {
        return (
            <div className="row double">
                <div className="col-md-12 align-middle">
                    <div className="add-new-block content-block-content card-container hover-action ">
                        <div className="action">
                            Let's Start <br />
                            Follow the <a className="documentation-link" href="https://containerum.com/fast-deploy/hello-world" target="_blank">Documentation</a> to create your 1st Namespace
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NotFoundNamespaces.propTypes = {
    PostsNamespacesDataReducer: PropTypes.array
};

export default NotFoundNamespaces;
