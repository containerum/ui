import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

// import { encode } from '../../functions/encode';
// import { getColor } from '../../functions/getColor';

class PostsServicesContainer extends Component {
    handleClickTR(href) {
        browserHistory.push('/Namespaces/' + this.props.idName + '/Services/' + href);
    }
    render() {
        return (
        <div className="container-fluid pt-3 pb-5">
            <h5>Services</h5>
            <div className="row">
                <div className="col-12">
                    <div className="card i-card-border mt-3">
                        <div className="card-block c-table-card-block">
                            <div className="table table-hover c-table-card i-table-card">
                                <div className="i-table-tbody">
                                    {
                                        this.props.PostsServicesDataReducer.map((item, index) => {
                                            const labelsList = item.labels ? Object.keys(item.labels).join() : null;
                                            const name = item.name;
                                            const nameFirstChar = name.substring(0, 1).toUpperCase();
                                            // const currentColor = getColor(encode(item.uid));
                                            return (
                                                <div className="i-row-table tr-hover" key={index}>
                                                    <div className="i-td-table" onClick={href => this.handleClickTR(item.name)}>
                                                        <svg className="c-table-card-img mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.78 33.25">
                                                            <g>
                                                                <path className="cls-services" d="M5383.94,530.28l8.57-14.84a2,2,0,0,0,0-1.78l-8.56-14.85a2,2,0,0,0-1.54-.89h-17.14a2,2,0,0,0-1.54.89l-8.57,14.84a2,2,0,0,0,0,1.78l8.56,14.84a2,2,0,0,0,1.54.89h17.14A2,2,0,0,0,5383.94,530.28Z" transform="translate(-5354.94 -497.92)"/>
                                                            </g>
                                                            <text className="cls-2" x="33%" y="70%">{nameFirstChar}</text>
                                                        </svg>
                                                        {name}
                                                    </div>
                                                    <div className="i-td-table i-td-table-pd-top" onClick={href => this.handleClickTR(item.name)}>Internal IP: {item['service-ip']}</div>
                                                    <div className="i-td-table i-td-table-pd-top" onClick={href => this.handleClickTR(item.name)}>{labelsList}</div>
                                                    <div className="i-td-table text-right">
                                                        <div className="btn-group">
                                                            <button className="btn btn-sm c-table-card-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className="md-icon">more_horiz</i>
                                                            </button>
                                                            <div className="dropdown-menu dropdown-menu-right i-dropdown-box-shadow" aria-labelledby="dropdownMenu2">
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
    PostsServicesDataReducer: PropTypes.array,
    idName: PropTypes.string
};

export default PostsServicesContainer;
