import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Scrollspy from 'react-scrollspy';
// import Tooltip from 'rc-tooltip';

import { getUpdateIntService } from '../../actions/UpdateServiceActions/UpdateInternalService';
import { getUpdateExtService } from '../../actions/UpdateServiceActions/UpdateExternalService';
import { getService } from '../../actions/ServiceActions/getServiceAction';
import MiniSpinner from '../MiniSpinner';
import Notification from '../Notification';
import HeaderDropDown from '../HeaderDropDown';
import ServiceForm from './ServiceForm';
import createDepServ from '../../images/create-dep-serv.svg';
// import icon from '../../images/icon-create-dep.svg';

class UpdateService extends Component {
    constructor(props) {
        super(props);
        this.state = {
	        currentDeployment: '',
	        isActiveInternal: false,
	        isActiveExternal: false,
	        internalServObj: [{
		        internalServName: '',
		        internalServPort: '',
		        internalServTargetPort: '',
		        intServiceType: 'TCP',
		        id: '_first',
		        index: 1
	        }],
	        internalServName: '',
	        externalServObj: [{
		        externalServName: '',
		        externalServPort: '',
		        extServiceType: 'TCP',
		        id: '_first',
		        index: 1
	        }],
	        externalServName: '',
        };
    }
    componentDidMount() {
	    this.props.onGetService(this.props.params.idName, this.props.params.idService);
    }
	componentWillReceiveProps(nextProps) {
		// console.log(nextProps.GetServiceReducer.data);
        if (Object.keys(nextProps.GetServiceReducer.data).length &&
            Object.keys(this.props.GetServiceReducer.data).length !==
            Object.keys(nextProps.GetServiceReducer.data).length) {
        	// console.log(nextProps.GetServiceReducer.data);
	        const { deployment, labels, ports } = nextProps.GetServiceReducer.data;
	        const internalServObj = String(labels.external) == "false" ?
		        ports.map((item, index) => {
		        	return {
				        internalServName: item.name,
				        internalServPort: item.port,
				        internalServTargetPort: item.targetPort,
				        intServiceType: item.protocol,
				        id: '_' + Math.random().toString(36).substr(2, 9),
				        index
			        }
		        }) : this.state.internalServObj;
	        const externalServObj = String(labels.external) == "true" ?
		        ports.map((item, index) => {
		        	return {
				        externalServName: item.name,
				        externalServPort: item.targetPort,
				        extServiceType: item.protocol,
				        id: '_' + Math.random().toString(36).substr(2, 9),
				        index
			        }
		        }) : this.state.internalServObj;
	        // console.log(externalServObj);
	        this.setState({
		        ...this.state,
		        currentDeployment: deployment,
		        isActiveInternal: String(labels.external) == "false",
		        isActiveExternal: String(labels.external) == "true",
		        internalServObj: String(labels.external) == "false" ?
			        internalServObj : this.state.internalServObj,
		        externalServObj: String(labels.external) == "true" ?
			        externalServObj : this.state.externalServObj
	        });
        }
    }
	handleChange(e) {
		// console.log(e.target.value);
		this.setState({
            ...this.state,
			currentDeployment: e.target.value
        })
	}
	handleSubmitForm(obj) {
    	this.setState(obj);
	}
	handleSubmit(e) {
		e.preventDefault();
		const serviceObject = this.state;
		if (serviceObject.internalServObj.length &&
			serviceObject.internalServObj[0].internalServPort) {
			this.props.onGetUpdateIntService(
				this.props.params.idName,
				this.props.params.idService,
				serviceObject
			);
		}
		if (serviceObject.externalServObj.length &&
			serviceObject.externalServObj[0].externalServPort) {
			// console.log('externalServObj', serviceObject.externalServObj);
			this.props.onGetCreateExtService(
				this.props.params.idName,
				this.props.params.idService,
				serviceObject
			);
		}
	}
    render() {
	    // console.log('state', this.state);
	    const submitButtonText = (this.props.UpdateIntServiceReducer.isFetching || this.props.UpdateExtServiceReducer.isFetching) ?
		    <MiniSpinner /> : 'Update service';
	    const isActiveSubmitButton = (this.props.UpdateIntServiceReducer.isFetching || this.props.UpdateExtServiceReducer.isFetching) ?
		    'btnDeployment btnService disabled' :
		    'btnDeployment btnService';
	    const isActiveSubmitState = !!(this.props.UpdateIntServiceReducer.isFetching || this.props.UpdateExtServiceReducer.isFetching);
	    let isFetchingComponent = '';
	    let isFetchingSidebar = '';
	    if (!this.props.GetServiceReducer.isFetching) {
		    isFetchingComponent =
			    <form onSubmit={this.handleSubmit.bind(this)}>
				    <ServiceForm
					    handleSubmitForm={(obj) =>
						    this.handleSubmitForm(obj)}
					    isActiveInternal={this.state.isActiveInternal}
					    isActiveExternal={this.state.isActiveExternal}
					    state={this.state}
					    params={this.props.params}
					    idService={this.props.params.idService}
				    />
				    <button
					    ref="button"
					    type="submit"
					    className={isActiveSubmitButton}
					    disabled={isActiveSubmitState}
				    >
					    { submitButtonText }
				    </button>
			    </form>;
		    isFetchingSidebar =
			    <Scrollspy
				    items={[
					    'port'
				    ]}
				    style={{
					    padding: '50px 0',
					    margin: '-40px 0 0'
				    }}
				    currentClassName="active"
			    >
				    <div className="sideMenuHeader"><a href="#port">Port</a></div>
			    </Scrollspy>;
	    } else {
		    isFetchingComponent =
			    <div>
				    {
					    new Array(3).fill().map((item, index) => {
						    return (
							    <img
								    key={index}
								    src={createDepServ}
								    style={{
									    marginTop: '-2px',
									    marginBottom: '30px',
									    width: '100%'
								    }} />
						    )
					    })
				    }
			    </div>;
		    isFetchingSidebar =
			    <div style={{marginTop: '40px', width: '80%'}}>
				    {
					    new Array(1).fill().map((item, index) => {
						    return (
							    <img
								    key={index}
								    src={require('../../images/profile-sidebar-big.svg')}
								    style={{width: '100%', marginBottom: '20px'}}
							    />
						    )
					    })
				    }
			    </div>;
	    }

	    // console.log('this.props.UpdateIntServiceReducer', this.props.UpdateIntServiceReducer);
	    // console.log('this.props.UpdateExtServiceReducer', this.props.UpdateExtServiceReducer);
        return (
            <div>
	            <Notification
		            status={this.props.UpdateIntServiceReducer.status}
		            method={this.props.UpdateIntServiceReducer.method}
		            name={this.props.UpdateIntServiceReducer.idServ}
		            errorMessage={this.props.UpdateIntServiceReducer.errorMessage}
	            />
	            <Notification
		            status={this.props.UpdateExtServiceReducer.status}
		            name={this.props.UpdateExtServiceReducer.idServ}
		            method={this.props.UpdateExtServiceReducer.method}
		            errorMessage={this.props.UpdateExtServiceReducer.errorMessage}
	            />
	            <div className="container-fluid breadcrumbNavigation">
		            <HeaderDropDown
			            idName={this.props.params.idName}
			            IdUpdate="service"
			            typeOfUpdateService={
			            	this.state.isActiveInternal ?
					            'Internal' :
					            'External'
			            }
		            />
	            </div>
	            <div className="content-block">
		            <div className="container no-back">
			            <div className="row pageWidth">
				            <div className="col-md-3 sideMenu" style={{padding: '20px 0px'}}>
					            { isFetchingSidebar }
				            </div>
				            <div className="col-md-9 pageContent">
					            { isFetchingComponent }
				            </div>
			            </div>
		            </div>
	            </div>
            </div>
        );
    }
}

UpdateService.propTypes = {
    onGetUpdateIntService: PropTypes.func.isRequired,
	onGetCreateExtService: PropTypes.func.isRequired,
    onGetService: PropTypes.func,
    UpdateIntServiceReducer: PropTypes.object,
    UpdateExtServiceReducer: PropTypes.object,
    GetServiceReducer: PropTypes.object,
    params: PropTypes.object
};

function mapStateToProps(state) {
    return {
        UpdateIntServiceReducer: state.UpdateIntServiceReducer,
	    UpdateExtServiceReducer: state.UpdateExtServiceReducer,
        GetServiceReducer: state.GetServiceReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetUpdateIntService: (idName, idService, data) => {
            dispatch(getUpdateIntService(idName, idService, data));
        },
        onGetCreateExtService: (idName, idService, data) => {
            dispatch(getUpdateExtService(idName, idService, data));
        },
        onGetService: (idName, serviceName) => {
            dispatch(getService(idName, serviceName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateService);
