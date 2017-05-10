import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavLink from '../../components/NavLink';

class PostsServicesContainer extends Component {
    render() {
        return (
            <div className="container-fluid pt-3">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-block c-table-card-block">
                                <div className="table table-hover c-table-card">
                                    <table>
                                        <tbody>
                                        {
                                            this.props.PostsServicesDataReducer.map(function(item, index) {
                                                const labelsList = item.labels.join();
                                                return (
                                                    <NavLink key={index} to={`/Services/${item.name}`}>
                                                        <tr>
                                                            <td>
                                                                <img className="c-table-card-img mr-1" src="https://www.gravatar.com/avatar/3e2e9bb0425bbbd60b03f2b62a4d821d?s=328&d=identicon&r=PG&f=1" alt="" />
                                                                {item.name}
                                                            </td>
                                                            <td>Internal IP: {item['service-ip']}</td>
                                                            <td>{labelsList}</td>
                                                            <td className="text-right">
                                                                <div className="btn-group">
                                                                    <button className="btn btn-sm dropdown-toggle c-table-card-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        Action
                                                                    </button>
                                                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                                                                        <button className="dropdown-item text-danger" type="button">Delete</button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </NavLink>
                                                );
                                            })
                                        }
                                        </tbody>
                                    </table>
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
