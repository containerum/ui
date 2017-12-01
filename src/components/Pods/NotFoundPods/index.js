import React, { Component } from 'react';

class NotFoundPods extends Component {
    render() {
        return (
            <div>
                <div className="content-block-content full">
                    <div className="tab-content">
                        <div className="tab-pane deployments active">
                            <table className="content-block__table table" width="1170">
                                <thead>
                                <tr>
                                    <td className="td-1" style={{paddingLeft: '60px'}}>
                                        At the moment the Pod is rebooting
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

export default NotFoundPods;
