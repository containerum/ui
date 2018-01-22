import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Scrollspy from 'react-scrollspy';

import { getCreateIntService } from '../../actions/CreateServiceActions/CreateInternalService';
import { getCreateExtService } from '../../actions/CreateServiceActions/CreateExternalService';
import { getDeployments } from '../../actions/DeploymentsActions';
import HeaderDropDown from '../HeaderDropDown';
import ServiceForm from './ServiceForm';
import createDepServ from '../../images/create-dep-serv.svg';
// import icon from '../../images/icon-create-dep.svg';

class CreateService extends Component {
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
	    this.props.onGetDeployments(this.props.params.idName);
    }
	componentWillReceiveProps(nextProps) {
        if (nextProps.DeploymentsReducer.data.length &&
            this.props.DeploymentsReducer.data.length !==
            nextProps.DeploymentsReducer.data.length) {
	        this.setState({
		        ...this.state,
		        currentDeployment: nextProps.DeploymentsReducer.data[0].name
	        });
        }
    }
	handleChangeActivityInternal() {
		this.setState({
			...this.state,
			isActiveInternal: !this.state.isActiveInternal
		});
	}
	handleChangeActivityExternal() {
		this.setState({
			...this.state,
			isActiveExternal: !this.state.isActiveExternal
		});
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
    	// console.log(this.state);
		const serviceObject = this.state;
		if (serviceObject.internalServObj.length &&
			serviceObject.internalServObj[0].internalServPort) {
			this.props.onGetCreateIntService(this.props.params.idName,
				serviceObject);
		}
		if (serviceObject.externalServObj.length &&
			serviceObject.externalServObj[0].externalServPort) {
			// console.log('externalServObj', serviceObject.externalServObj);
			this.props.onGetCreateExtService(this.props.params.idName,
				serviceObject);
		}
	}
    render() {
	    // console.log(this.state.externalServObj);
	    let isFetchingComponent = '';
	    if (!this.props.DeploymentsReducer.isFetching) {
		    isFetchingComponent =
			    <form onSubmit={this.handleSubmit.bind(this)}>
				    <div
					    className="blockContainer blockContainerPadin"
					    id="target-deployment"
				    >
					    <div className="col-md-6">

						    <div className="containerTitle"><span className={!this.state.currentDeployment && "isHidden"}>*</span> Target Deployment
							    <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
						    </div>
						    {
							    this.state.currentDeployment ?
								    <div className="containerSubTitle marBot30">Choose Deployment</div> :
								    <div className="containerSubTitle marBot30">Текст про то, что нужно обязательно иметь<br />
									    Deployment для создания Service</div>
						    }


						    {
							    this.state.currentDeployment ?
								    <div className="select-wrapper">
									    <div className="select-arrow-3"> </div>
									    <div className="select-arrow-3"> </div>
									    <select
										    name="deployment"
										    className="selectCustom selectGreyColor"
										    value={this.state.currentDeployment}
										    onChange={(e) => this.handleChange(e)}
										    required
									    >
										    {this.props.DeploymentsReducer.data.map((item) => {
											    return (
												    <option
													    key={item.name}
													    value={item.name}
												    >{item.name}</option>
											    );
										    })}
									    </select>
								    </div> :
								    <Link to={`/Namespaces/${this.props.params.idName}/CreateDeployment`} className="deployBtn">Create Deployment</Link>
						    }

						    <div className="helperText isHidden">Select the deployment for which the Service applies</div>
					    </div>
				    </div>
				    <ServiceForm
					    handleSubmitForm={(obj) =>
						    this.handleSubmitForm(obj)}
					    handleChangeActivityInternal={() =>
						    this.handleChangeActivityInternal()}
					    handleChangeActivityExternal={() =>
						    this.handleChangeActivityExternal()}
					    currentDeployment={this.state.currentDeployment}
					    isActiveInternal={this.state.isActiveInternal}
					    isActiveExternal={this.state.isActiveExternal}
					    params={this.props.params}
				    />
				    {
					    (this.state.isActiveInternal ||
						    this.state.isActiveExternal) &&
					    <button
						    className="btnDeployment btnService"
						    type="submit"
					    >Create service</button>
				    }
			    </form>;
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
	    }
        return (
            <div>
	            <div className="container-fluid breadcrumbNavigation">
		            <HeaderDropDown
			            idName={this.props.params.idName}
			            IdCreate="service"
		            />
	            </div>
	            <div className="content-block">
		            <div className="container no-back">
			            <div className="row pageWidth">
				            <div className="col-md-3 sideMenu" style={{padding: '20px 0px'}}>
					            <Scrollspy
						            items={[
							            'target-deployment',
							            'internal-service',
							            'external-service'
						            ]}
						            style={{
							            padding: '50px 0',
							            margin: '-40px 0 0'
						            }}
						            currentClassName="active"
					            >
						            <div className="sideMenuHeader"><a href="#target-deployment">Target Deployment</a></div>
						            <div className="sideMenuHeader"><a href="#internal-service">Internal Service</a></div>
						            <div className="sideMenuHeader"><a href="#external-service">External Service</a></div>
					            </Scrollspy>
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

CreateService.propTypes = {
    onGetCreateIntService: PropTypes.func.isRequired,
	onGetCreateExtService: PropTypes.func.isRequired,
    onGetDeployments: PropTypes.func,
    CreateServiceReducer: PropTypes.object,
    DeploymentsReducer: PropTypes.object,
    params: PropTypes.object
};

function mapStateToProps(state) {
    return {
        CreateServiceReducer: state.CreateServiceReducer,
        DeploymentsReducer: state.DeploymentsReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetCreateIntService: (idName, data) => {
            dispatch(getCreateIntService(idName, data));
        },
        onGetCreateExtService: (idName, data) => {
            dispatch(getCreateExtService(idName, data));
        },
        onGetDeployments: idName => {
            dispatch(getDeployments(idName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateService);
