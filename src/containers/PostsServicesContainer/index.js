import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

class PostsServicesContainer extends Component {
    handleClickTR(href) {
        browserHistory.push('/Namespaces/default/Services/' + href);
    }
    render() {
        return (
        <div className="container-fluid pt-3">
            <div className="row">
                <div className="col-12">
                    <div className="card mt-3">
                        <div className="card-block c-table-card-block">
                            <div className="table table-hover c-table-card i-table-card">
                                <div className="i-table-tbody">
                                    {
                                        this.props.PostsServicesDataReducer.map((item, index) => {
                                            const labelsList = item.labels ? Object.keys(item.labels).join() : null;
                                            const name = item.name;
                                            return (
                                                <div className="i-row-table tr-hover" key={index}>
                                                    <div className="i-td-table" onClick={href => this.handleClickTR(item.name)}>
                                                        <img className="c-table-card-img mr-1" src="https://www.gravatar.com/avatar/3e2e9bb0425bbbd60b03f2b62a4d821d?s=328&d=identicon&r=PG&f=1" alt="" />
                                                        {name}
                                                    </div>
                                                    <div className="i-td-table" onClick={href => this.handleClickTR(item.name)}>Internal IP: {item['service-ip']}</div>
                                                    <div className="i-td-table" onClick={href => this.handleClickTR(item.name)}>{labelsList}</div>
                                                    <div className="i-td-table text-right">
                                                        <div className="btn-group">
                                                            <button className="btn btn-sm c-table-card-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className="md-icon">more_horiz</i>
                                                            </button>
                                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                                                                <button className="dropdown-item text-danger" type="button">Delete</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
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

PostsServicesContainer.propTypes = {
    PostsServicesDataReducer: PropTypes.array
};

export default PostsServicesContainer;
