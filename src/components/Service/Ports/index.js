import React, { Component } from 'react';
import { connect } from 'react-redux';

import deploy from '../../../images/deploy.png';

class Ports extends Component {
    render() {
        // console.log(this.props.getServiceReducer.data.ports);
        const ports = Object.keys(this.props.getServiceReducer.data).length ? this.props.getServiceReducer.data.ports : [];
        const isExternal = Object.keys(this.props.getServiceReducer.data).length ? this.props.getServiceReducer.data.labels.external : '';
        const type = '' + isExternal === 'true';
        return (
            <div className="content-block-content full">
                <div className="tab-content">
                    <div className="tab-pane fade show deployments active">
                        <table className="content-block__table table" width="1170">
                            <thead>
                                <tr>
                                    <td className="td-1"> </td>
                                    <td className="td-2">Name</td>
                                    <td className="td-3">Port</td>
                                    <td className="td-4">Protocol</td>
                                    {type ? <td className="td-5">Link</td> : ''}
                                    <td className="td-7"> </td>
                                    <td className="td-7"> </td>
                                </tr>
                            </thead>
                            <tbody>
                                {ports.map((item, index) => {
                                    const name = item.name;
                                    const port = item.port;
                                    const targetPort = item.targetPort;
                                    const protocol = item.protocol;
                                    const linkServ = `http://p${port}.x1.containerum.io`;
                                    const viewLinkServ = `p${port}.x1.containerum.io`;
                                    return (
                                        <tr
                                            className="tr-table-hover"
                                            key={index}
                                        >
                                            <td className="td-1"><img src={deploy} alt="Port" /></td>
                                            <td className="td-2">{name}</td>
                                            <td className="td-3">{port}:{targetPort}</td>
                                            <td className="td-4">{protocol}</td>
                                            {type ? <td className="td-5"><a target="_blank" href={linkServ}>{viewLinkServ}</a></td> : ''}
                                            <td className="td-7"> </td>
                                            <td className="td-7">
                                                {/*<div className="warning"> </div>*/}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        getServiceReducer: state.getServiceReducer
    };

}

export default connect(mapStateToProps)(Ports);
