import React, { Component } from 'react';

class NotFoundDeployments extends Component {
    render() {
        return (
            <div>
                <div className="content-block-content full">
                    <div className="tab-content">
                        <div className="tab-pane deployments active">
                            <table className="content-block__table table" width="1170">
                                <thead>
                                <tr>
                                    <td className="td-1">
                                        Let's Start <br/>
                                        Follow the <a className="documentation-link" target="_blank" href="https://containerum.com/documentation/Start-Guide">Documentation</a> to create your 1st Deployment
                                    </td>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotFoundDeployments;
