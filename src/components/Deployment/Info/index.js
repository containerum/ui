import React, { Component } from 'react';

class Info extends Component {
    render() {
        return (
            <div className="container-fluid pt-3">
                <div className="row">
                    <div className="col-12">
                        <div className="card mt-3">
                            <div className="card-block c-table-card-block">
                                <table className="table i-table-card">
                                    <tbody>
                                        <tr>
                                            <td>
                                                redis-django
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className="text-right">
                                                <div className="btn-group">
                                                    <button className="btn btn-sm c-table-card-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className="md-icon">more_horiz</i>
                                                    </button>
                                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                                                        <button className="dropdown-item text-danger" type="button">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img className="c-table-card-img i-table-card-img mr-1" src="https://www.gravatar.com/avatar/3e2e9bb0425bbbd60b03f2b62a4d821d?s=328&amp;d=identicon&amp;r=PG&amp;f=1" alt="" />
                                            </td>
                                            <td>
                                                CPU: 1982 <br/>
                                                RAM: 8439 MB
                                            </td>
                                            <td>
                                                Status <br/>

                                                2 available <br/>
                                                2 total <br/>
                                                0 unavailable <br/>
                                                2 updated <br/>
                                            </td>
                                            <td>
                                                Labels <br/>

                                                app: nginx<br/>
                                                run: nvrinirv<br/>
                                                server-master: cat-dog-fish <br/>
                                                master-server: fish-dog-cat <br/>
                                            </td>
                                            <td>
                                                Strategy: RollingUpdate <br/>

                                                Min ready seconds: 0<br/>
                                                Revision history limit: No set<br/>
                                                Rolling update strategy: Max surge: 1, Max unavailable: 1 <br/>
                                                Creation time: 2017-01-27T16:34 <br/>
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

export default Info;
