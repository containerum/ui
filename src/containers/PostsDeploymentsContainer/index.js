import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavLink from '../../components/NavLink';

class PostsDeploymentsContainer extends Component {
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
                                            this.props.PostsDeploymentsDataReducer.map(function(item, index) {
                                                return (
                                                    <NavLink key={index} to={`/Deployments/${item.name}`}>
                                                        <tr>
                                                            <td>
                                                                <img className="c-table-card-img mr-1" src="https://avatars2.githubusercontent.com/u/6412038?v=3&amp;s=200" alt="" />
                                                                {item.name}
                                                            </td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>

                                                            {
                                                                item.images.map(function(itemImages) {
                                                                    return (
                                                                        <td>
                                                                            {itemImages.length - 1 ? itemImages : itemImages + ', '}
                                                                        </td>
                                                                    );
                                                                })
                                                            }
                                                            <td className="text-right">
                                                                <div className="btn-group">
                                                                    <button className="btn btn-sm dropdown-toggle c-table-card-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        Action
                                                                    </button>
                                                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                                                                        <button className="dropdown-item" type="button">Action</button>
                                                                        <button className="dropdown-item" type="button">Action</button>
                                                                        <button className="dropdown-item" type="button">Action</button>
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

PostsDeploymentsContainer.propTypes = {
    PostsDeploymentsDataReducer: PropTypes.array
};

export default PostsDeploymentsContainer;
