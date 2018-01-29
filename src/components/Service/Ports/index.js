import React, { Component } from 'react';
import { connect } from 'react-redux';

import deploy from '../../../images/deploy.png';

class Ports extends Component {
    render() {
	    let isPortsEmpty = '';
        // console.log(this.props.GetServiceReducer.data.ports);
        const ports = Object.keys(this.props.GetServiceReducer.data).length ? this.props.GetServiceReducer.data.ports : [];
        const isExternal = Object.keys(this.props.GetServiceReducer.data).length ? this.props.GetServiceReducer.data.labels.external : '';
        const type = '' + isExternal === 'true';
        if (Object.keys(this.props.GetServiceReducer.data).length) {
	        isPortsEmpty =
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
			            // console.log(this.props.GetServiceReducer.data.domain_hosts[0]);
			            const domainHost = this.props.GetServiceReducer.data.domain_hosts[0] ?
                            this.props.GetServiceReducer.data.domain_hosts[0] : 'x1.containerum.io';
				        const name = item.name;
				        const port = item.port;
				        const targetPort = item.targetPort;
				        const protocol = item.protocol;
				        const linkServ = `http://p${port}.${domainHost}`;
				        const viewLinkServ = `p${port}.${domainHost}`;
				        return (
                            <tr
                                className="tr-table-hover"
                                key={index}
                            >
                                <td className="td-1"><img src={deploy} alt="" /></td>
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
        } else {
            isPortsEmpty =
                <div style={{
		            height: '270px',
		            margin: '0 30px',
		            borderRadius: '2px',
		            backgroundColor: '#f6f6f6'
	            }} />
        }
        return (
            <div className="content-block-content full">
                <div className="tab-content">
                    <div className="tab-pane fade show deployments active">
                        { isPortsEmpty }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        GetServiceReducer: state.GetServiceReducer
    };

}

export default connect(mapStateToProps)(Ports);
