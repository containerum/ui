import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class PodsList extends Component {
    constructor() {
        super();
        this.handleClickTR = this.handleClickTR.bind(this);
    }
    handleClickTR(href) {
        browserHistory.push('/Deployments/demo/Pods/' + href);
    }
    render() {
        return (
            <div className="container-fluid pt-3 pb-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card mt-3">
                            <div className="card-block c-table-card-block">
                                <table className="table table-hover c-table-card">
                                    <tbody>
                                    <tr>
                                        <td className="i-table-td" onClick={href => this.handleClickTR('redis-django-12345')}>
                                            <div className="i-table-inline col-3">
                                                <img className="c-table-card-img mr-1" src="https://www.gravatar.com/avatar/3e2e9bb0425bbbd60b03f2b62a4d821d?s=328&d=identicon&r=PG&f=1" alt="" />
                                                redis-django-12345
                                            </div>
                                            <div className="i-table-inline col-2">8439 MB RAM</div>
                                            <div className="i-table-inline col-2">0.234 CPU</div>
                                            <div className="i-table-inline col-2">11 h</div>
                                            <div className="i-table-inline col-2">7 restarts</div>
                                        </td>
                                        <td className="text-right">
                                            <div className="i-table-inline">
                                                <div className="btn-group">
                                                    <button className="btn btn-sm dropdown-toggle c-table-card-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Action
                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                                                        <button className="dropdown-item text-danger" type="button">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="i-table-td" onClick={href => this.handleClickTR('nginx-12345')}>
                                            <div className="i-table-inline col-3">
                                                <img className="c-table-card-img mr-1" src="https://www.gravatar.com/avatar/3e2e9bb0425bbbd60b03f2b62a4d821d?s=328&d=identicon&r=PG&f=1" alt="" />
                                                nginx-12345
                                            </div>
                                            <div className="i-table-inline col-2">8439 MB RAM</div>
                                            <div className="i-table-inline col-2">0.234 CPU</div>
                                            <div className="i-table-inline col-2">11 h</div>
                                            <div className="i-table-inline col-2">7 restarts</div>
                                        </td>
                                        <td className="text-right">
                                            <div className="i-table-inline">
                                                <div className="btn-group">
                                                    <button className="btn btn-sm dropdown-toggle c-table-card-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Action
                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                                                        <button className="dropdown-item text-danger" type="button">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="i-table-td" onClick={href => this.handleClickTR('redis-12345')}>
                                            <div className="i-table-inline col-3">
                                                <img className="c-table-card-img mr-1" src="https://www.gravatar.com/avatar/3e2e9bb0425bbbd60b03f2b62a4d821d?s=328&d=identicon&r=PG&f=1" alt="" />
                                                redis-12345
                                            </div>
                                            <div className="i-table-inline col-2">8439 MB RAM</div>
                                            <div className="i-table-inline col-2">0.234 CPU</div>
                                            <div className="i-table-inline col-2">11 h</div>
                                            <div className="i-table-inline col-2">7 restarts</div>
                                        </td>
                                        <td className="text-right">
                                            <div className="i-table-inline">
                                                <div className="btn-group">
                                                    <button className="btn btn-sm dropdown-toggle c-table-card-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Action
                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                                                        <button className="dropdown-item text-danger" type="button">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PodsList;
