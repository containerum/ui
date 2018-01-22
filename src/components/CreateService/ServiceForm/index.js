import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router';
import PropTypes from 'prop-types';

import icon from '../../../images/icon-create-dep.svg';

class ServiceForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentDeployment: this.props.currentDeployment,
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
	handleChangeInternal() {
		this.setState({
			...this.state,
			currentDeployment: this.props.currentDeployment,
			isActiveInternal: !this.state.isActiveInternal,
			internalServObj: [{
				internalServName: '',
				internalServPort: '',
				internalServTargetPort: '',
				intServiceType: 'TCP',
				id: '_first',
				index: 1
			}]
		}, () => {
			this.props.handleSubmitForm(this.state);
		})
		this.props.handleChangeActivityInternal();
	}
	onChangeIntServicePort(e, id, index) {
		const regexp = /^[0-9]{0,5}$|^$/;
		const portToInt = e.target.value ? parseInt(e.target.value, 10) : '';
		if (e.target.value.search(regexp) !== -1) {
			const nextState = Object.assign({}, this.state);
			nextState.internalServObj.filter(item => {
				if (item.id === id) {
					item.internalServPort = portToInt;
					item.index = index + 1;
				}
			});
			this.setState({
				...this.state,
				internalServObj: nextState.internalServObj
			}, () => {
				this.props.handleSubmitForm(this.state);
			});
		}
		if (e.target.value.length === 0) {
			document.getElementById(`int-service-port-form-group__label${index}`).classList.remove('form-group__label-always-onfocus');
		} else {
			document.getElementById(`int-service-port-form-group__label${index}`).classList.add('form-group__label-always-onfocus');
		}
	}
	onChangeIntServiceName(e, id, index) {
		const nextState = Object.assign({}, this.state);
		nextState.internalServObj.filter(item => {
			if (item.id === id) {
				item.internalServName = e.target.value;
				item.index = index + 1;
			}
		});
		this.setState({
			...this.state,
			internalServObj: nextState.internalServObj
		}, () => {
			this.props.handleSubmitForm(this.state);
		});
		if (e.target.value.length === 0) {
			document.getElementById(`int-service-name-form-group__label${index}`).classList.remove('form-group__label-always-onfocus');
		} else {
			document.getElementById(`int-service-name-form-group__label${index}`).classList.add('form-group__label-always-onfocus');
		}
	}
	onChangeIntServiceTargetPort(e, id, index) {
		const regexp = /^[0-9]{0,5}$|^$/;
		const portToInt = e.target.value ? parseInt(e.target.value, 10) : '';
		if (e.target.value.search(regexp) !== -1) {
			const nextState = Object.assign({}, this.state);
			nextState.internalServObj.filter(item => {
				if (item.id === id) {
					item.internalServTargetPort = portToInt;
					item.index = index + 1;
				}
			});
			this.setState({
				...this.state,
				internalServObj: nextState.internalServObj
			}, () => {
				this.props.handleSubmitForm(this.state);
			});
		}
		if (e.target.value.length === 0) {
			document.getElementById(`int-service-target-port-form-group__label${index}`).classList.remove('form-group__label-always-onfocus');
		} else {
			document.getElementById(`int-service-target-port-form-group__label${index}`).classList.add('form-group__label-always-onfocus');
		}
	}
	onChangeIntServiceType(e, id, index) {
		const nextState = Object.assign({}, this.state);
		nextState.internalServObj.filter(item => {
			if (item.id === id) {
				item.intServiceType = e.target.value;
				item.index = index + 1;
			}
		});
		this.setState({
			...this.state,
			internalServObj: nextState.internalServObj
		}, () => {
			this.props.handleSubmitForm(this.state);
		});
	}
	handleClickAddInternalPort() {
		this.setState({
			...this.state,
			internalServObj: [
				...this.state.internalServObj,
				{
					internalServPort: "",
					internalServTargetPort: "",
					intServiceType: "TCP",
					id: '_' + Math.random().toString(36).substr(2, 9),
					index: 1
				}
			]
		}, () => {
			this.props.handleSubmitForm(this.state);
		})
	}
	handleClickRemoveIntServicePort(id) {
		if (this.state.internalServObj.length > 1) {
			const nextLabels = Object.assign({}, this.state).internalServObj.filter((item) => {
				return item.id !== id;
			});
			this.setState({
				internalServObj: nextLabels
			}, () => {
				this.props.handleSubmitForm(this.state);
			});
		} else {
			this.setState({
				...this.state,
				internalServObj: [{
					internalServPort: '',
					internalServTargetPort: '',
					intServiceType: 'TCP',
					id: '_first',
					index: 1
				}]
			}, () => {
				this.props.handleSubmitForm(this.state);
			});
		}
	}
	handleChangeExternal() {
		this.setState({
			...this.state,
			currentDeployment: this.props.currentDeployment,
			isActiveExternal: !this.state.isActiveExternal,
			externalServObj: [{
				externalServName: '',
				externalServPort: '',
				extServiceType: 'TCP',
				id: '_first',
				index: 1
			}]
		}, () => {
			this.props.handleSubmitForm(this.state);
		});
		this.props.handleChangeActivityExternal();
	}
	onChangeExtServiceName(e, id, index) {
		const nextState = Object.assign({}, this.state);
		nextState.externalServObj.filter(item => {
			if (item.id === id) {
				item.externalServName = e.target.value;
				item.index = index + 1;
			}
		});
		this.setState({
			...this.state,
			externalServObj: nextState.externalServObj
		}, () => {
			this.props.handleSubmitForm(this.state);
		});
		if (e.target.value.length === 0) {
			document.getElementById(`ext-service-name-form-group__label${index}`).classList.remove('form-group__label-always-onfocus');
		} else {
			document.getElementById(`ext-service-name-form-group__label${index}`).classList.add('form-group__label-always-onfocus');
		}
	}
	onChangeExtServicePort(e, id, index) {
		const regexp = /^[0-9]{0,5}$|^$/;
		const portToInt = e.target.value ? parseInt(e.target.value, 10) : '';
		if (e.target.value.search(regexp) !== -1) {
			const nextState = Object.assign({}, this.state);
			nextState.externalServObj.filter(item => {
				if (item.id === id) {
					item.externalServPort = portToInt;
					item.index = index + 1;
				}
			});
			this.setState({
				...this.state,
				externalServObj: nextState.externalServObj
			}, () => {
				this.props.handleSubmitForm(this.state);
			});
		}
		if (e.target.value.length === 0) {
			document.getElementById(`ext-service-port-form-group__label${index}`).classList.remove('form-group__label-always-onfocus');
		} else {
			document.getElementById(`ext-service-port-form-group__label${index}`).classList.add('form-group__label-always-onfocus');
		}
	}
	onChangeExtServiceType(e, id, index) {
		const nextState = Object.assign({}, this.state);
		nextState.externalServObj.filter(item => {
			if (item.id === id) {
				item.extServiceType = e.target.value;
				item.index = index + 1;
			}
		});
		this.setState({
			...this.state,
			externalServObj: nextState.externalServObj
		}, () => {
			this.props.handleSubmitForm(this.state);
		});
	}
	handleClickRemoveExtServicePort(id) {
		if (this.state.externalServObj.length > 1) {
			const nextLabels = Object.assign({}, this.state).externalServObj.filter((item) => {
				return item.id !== id;
			});
			this.setState({
				externalServObj: nextLabels
			}, () => {
				this.props.handleSubmitForm(this.state);
			});
		} else {
			this.setState({
				...this.state,
				externalServObj: [{
					externalServPort: '',
					extServiceType: 'TCP',
					id: '_first',
					index: 1
				}]
			}, () => {
				this.props.handleSubmitForm(this.state);
			});
		}
	}
	handleClickAddExternalPort() {
		this.setState({
			...this.state,
			externalServObj: [
				...this.state.externalServObj,
				{
					externalServPort: '',
					extServiceType: 'TCP',
					id: '_' + Math.random().toString(36).substr(2, 9),
					index: 1
				}
			]
		}, () => {
			this.props.handleSubmitForm(this.state);
		})
	}
	render() {
		return (
			<div>
				<div
					className="blockContainer blockContainerPadin"
					id="internal-service"
				>
					<div className="row">
						<div className="col-md-9">
							<div className="containerTitle marLeft20"><span className="isHidden">*</span> Internal Service
								<span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
							</div>
						</div>

						<div className="col-md-3">
							<div
								className={
									this.props.isActiveInternal ?
										"serviceSwitcher serviceSwitcherOn" :
										"serviceSwitcher"
								}
								onClick={this.handleChangeInternal.bind(this)}
							> </div>
						</div>
					</div>
					{
						this.props.isActiveInternal &&
						<div className="serviceWrapper">
							<div>
								{/*<div className="row rowLine">*/}
								{/*<div className="col-md-6">*/}
								{/*<div className="has-float-label marTop40">*/}
								{/*<div className="form-group">*/}
								{/*<input*/}
								{/*className="form-group__input-text form-control"*/}
								{/*type="text"*/}
								{/*required="required"*/}
								{/*ref="name"*/}
								{/*id="int-service-name"*/}
								{/*onChange={(e) => this.onChangeIntServiceName(e)}*/}
								{/*/>*/}
								{/*<label*/}
								{/*className="form-group__label"*/}
								{/*id="int-service-name-form-group__label"*/}
								{/*htmlFor="int-service-name"*/}
								{/*>Service Name</label>*/}
								{/*<div className="helperText">Your Internal Name is the same as the name of Deployment</div>*/}
								{/*</div>*/}
								{/*</div>*/}
								{/*</div>*/}
								{/*</div>*/}
							</div>
							<div className="row rowWithoutLine">
								<div className="col-md-12">
									<div className="containerTitle containerBlockTitle"><span>*</span> Ports
										<span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
									</div>
								</div>
								{
									this.state.internalServObj.map((item, index) => {
										const id = item.id;
										return (
											<div
												style={{display: 'flex', width: '96%'}}
												key={id}
											>
												<div className="col-md-3">
													<div className="has-float-label">
														<div className="form-group">
															<input
																className="form-group__input-text form-control"
																type="text"
																pattern=".{3,}"
																required title="3 characters minimum"
																value={this.state.internalServObj[index].id === id &&
																this.state.internalServObj[index].internalServName}
																id={`int-service-name${index}`}
																onChange={(e) => this.onChangeIntServiceName(e, id, index)}
															/>
															<label
																className="form-group__label"
																id={`int-service-name-form-group__label${index}`}
																htmlFor={`int-service-name${index}`}
															>Name</label>
															{index === 0 && <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>}
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="has-float-label">
														<div className="form-group">
															<input
																className="form-group__input-text form-control"
																type="number"
																required
																min="1"
																max="65535"
																value={this.state.internalServObj[index].id === id &&
																this.state.internalServObj[index].internalServPort}
																id={`int-service-port${index}`}
																onChange={(e) => this.onChangeIntServicePort(e, id, index)}
															/>
															<label
																className="form-group__label"
																id={`int-service-port-form-group__label${index}`}
																htmlFor={`int-service-port${index}`}
															>Port</label>
															{index === 0 && <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>}
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="has-float-label">
														<div className="form-group">
															<input
																className="form-group__input-text form-control"
																type="number"
																required
																min="1"
																max="65535"
																value={this.state.internalServObj[index].id === id &&
																this.state.internalServObj[index].internalServTargetPort}
																id={`int-service-target-port${index}`}
																onChange={(e) => this.onChangeIntServiceTargetPort(e, id, index)}
															/>
															<label
																className="form-group__label"
																id={`int-service-target-port-form-group__label${index}`}
																htmlFor={`int-service-target-port${index}`}
															>Target Port</label>
															{index === 0 && <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>}
														</div>
													</div>
												</div>
												<div className="col-md-2">
													<div className="form-group">
														<div className="select-wrapper">
															<div className="select-arrow-3"> </div>
															<div className="select-arrow-3"> </div>
															<select
																name="deployment"
																className="selectCustom selectGreyColor"
																value={this.state.internalServObj[index].id === id &&
																this.state.internalServObj[index].intServiceType}
																onChange={(e) => this.onChangeIntServiceType(e, id, index)}
																required
															>
																<option value="TCP">TCP</option>
																<option value="UDP">UDP</option>
															</select>
														</div>
													</div>
												</div>
												<div
													className="col-md-1"
													onClick={() => this.handleClickRemoveIntServicePort(id)}
												>
													<img
														src={icon}
														alt="delete"
														className="iconBasket"
														style={{marginTop: '30px'}}
													/>
												</div>
											</div>
										)
									})
								}
								<div className="col-md-12">
									<div
										className="addBlockBtn marLeft"
										onClick={this.handleClickAddInternalPort.bind(this)}
									>+ Add Port</div>
								</div>
							</div>
						</div>
					}
				</div>
				<div
					className="blockContainer blockContainerPadin"
					id="external-service"
				>
					<div className="row">
						<div className="col-md-9">
							<div className="containerTitle marLeft20"><span className="isHidden">*</span> External Service
								<span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
							</div>
						</div>
						<div className="col-md-3">
							<div
								className={
									this.props.isActiveExternal ?
										"serviceSwitcher serviceSwitcherOn" :
										"serviceSwitcher"
								}
								onClick={this.handleChangeExternal.bind(this)}
							> </div>
						</div>
					</div>
					{
						this.props.isActiveExternal &&
						<div className="serviceWrapper">
							<div>
								{/*<div className="row rowLine">*/}
								{/*<div className="col-md-6">*/}
								{/*<div className="has-float-label marTop40">*/}
								{/*<div className="form-group">*/}
								{/*<input*/}
								{/*className="form-group__input-text form-control"*/}
								{/*type="text"*/}
								{/*required="required"*/}
								{/*ref="name"*/}
								{/*id="ext-service-name"*/}
								{/*onChange={(e) => this.onChangeExtServiceName(e)}*/}
								{/*/>*/}
								{/*<label*/}
								{/*className="form-group__label"*/}
								{/*id="ext-service-name-form-group__label"*/}
								{/*htmlFor="ext-service-name"*/}
								{/*>Service Name</label>*/}
								{/*<div className="helperText">Your Internal Name is the same as the name of Deployment with «… ext-service» index</div>*/}
								{/*</div>*/}
								{/*</div>*/}
								{/*</div>*/}
								{/*</div>*/}
							</div>
							<div className="row rowWithoutLine">
								<div className="col-md-12">
									<div className="containerTitle containerBlockTitle"><span>*</span> Ports
										<span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
									</div>
								</div>
								{
									this.state.externalServObj.map((item, index) => {
										const id = item.id;
										return (
											<div
												style={{display: 'flex', width: '100%'}}
												key={id}
											>
												<div className="col-md-4">
													<div className="has-float-label">
														<div className="form-group">
															<input
																className="form-group__input-text form-control"
																type="text"
																pattern=".{3,}"
																required title="3 characters minimum"
																value={this.state.externalServObj[index].id === id &&
																this.state.externalServObj[index].externalServName}
																id={`ext-service-name${index}`}
																onChange={(e) => this.onChangeExtServiceName(e, id, index)}
															/>
															<label
																className="form-group__label"
																id={`ext-service-name-form-group__label${index}`}
																htmlFor={`ext-service-name${index}`}
															>Name</label>
															{index === 0 && <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>}
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="has-float-label">
														<div className="form-group">
															<input
																className="form-group__input-text form-control"
																type="number"
																required
																min="1"
																max="65535"
																value={this.state.externalServObj[index].id === id &&
																this.state.externalServObj[index].externalServPort}
																id={`ext-service-port${index}`}
																onChange={(e) => this.onChangeExtServicePort(e, id, index)}
															/>
															<label
																className="form-group__label"
																id={`ext-service-port-form-group__label${index}`}
																htmlFor={`ext-service-port${index}`}
															>Port</label>
															{index === 0 && <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>}
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="form-group">
														<div className="select-wrapper">
															<div className="select-arrow-3"> </div>
															<div className="select-arrow-3"> </div>
															<select
																name="deployment"
																className="selectCustom selectGreyColor"
																value={this.state.externalServObj[index].id === id &&
																this.state.externalServObj[index].extServiceType}
																onChange={(e) => this.onChangeExtServiceType(e, id, index)}
																required
															>
																<option value="TCP">TCP</option>
																<option value="UDP">UDP</option>
															</select>
														</div>
													</div>
												</div>
												<div
													className="col-md-1"
													onClick={() => this.handleClickRemoveExtServicePort(id)}
												>
													<img
														src={icon}
														alt="delete"
														className="iconBasket"
														style={{marginTop: '30px'}}
													/>
												</div>
											</div>
										)
									})
								}
								<div className="col-md-12">
									<div
										className="addBlockBtn marLeft"
										onClick={this.handleClickAddExternalPort.bind(this)}
									>+ Add Port</div>
								</div>
							</div>
						</div>
					}
				</div>
			</div>
		);
	}
}

ServiceForm.propTypes = {
	handleSubmitForm: PropTypes.func,
	handleChangeActivityInternal: PropTypes.func,
	handleChangeActivityExternal: PropTypes.func,
	currentDeployment: PropTypes.string,
	isActiveInternal: PropTypes.bool,
	isActiveExternal: PropTypes.bool
};

export default ServiceForm;
