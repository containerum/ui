import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NotFoundNamespaces extends Component {
    render() {
        return (
            <div className="container-fluid pt-3 pb-5">
                <h5>Namespace</h5>
                <div className="row">
                    <div className="col-12">
                        <div className="card i-card-border mt-3">
                            <div className="card-block c-table-card-block">
                                <div className="table table-hover c-table-card i-table-card">
                                    <div className="i-table-tbody">
                                        <div className="i-row-table">
                                            <div className="i-td-table">
                                                Let's Start <br />
                                                Follow the <a href="http://containerum.io/documentation/start-guide" target="_blank">Documentation</a> to create your 1st Namespace
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
