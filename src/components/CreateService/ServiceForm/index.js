import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';

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
		if (this.props.currentDeployment) {

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
	}
	onChangeIntServicePort(e, id, index) {
		const portToInt = e.target.value ? parseInt(e.target.value, 10) : '';
		if (e.target.value.length === 0) {
			document.getElementById(`int-service-port-form-group__label${index}${id}`).classList.remove('form-group__label-always-onfocus');
		} else {
			document.getElementById(`int-service-port-form-group__label${index}${id}`).classList.add('form-group__label-always-onfocus');
		}
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
			document.getElementById(`int-service-name-form-group__label${index}${id}`).classList.remove('form-group__label-always-onfocus');
		} else {
			document.getElementById(`int-service-name-form-group__label${index}${id}`).classList.add('form-group__label-always-onfocus');
		}
	}
	onChangeIntServiceTargetPort(e, id, index) {
		const portToInt = e.target.value ? parseInt(e.target.value, 10) : '';
		if (e.target.value.length === 0) {
			document.getElementById(`int-service-target-port-form-group__label${index}${id}`).classList.remove('form-group__label-always-onfocus');
		} else {
			document.getElementById(`int-service-target-port-form-group__label${index}${id}`).classList.add('form-group__label-always-onfocus');
		}
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
	handleClickRemoveIntServicePort(id, index) {
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
					internalServName: '',
					internalServPort: '',
					internalServTargetPort: '',
					intServiceType: 'TCP',
					id: '_first',
					index: 1
				}]
			}, () => {
				document.getElementById(`int-service-name-form-group__label${index}${id}`) ?
					document.getElementById(`int-service-name-form-group__label${index}${id}`).classList.remove('form-group__label-always-onfocus') : null;
				document.getElementById(`int-service-port-form-group__label${index}${id}`) ?
					document.getElementById(`int-service-port-form-group__label${index}${id}`).classList.remove('form-group__label-always-onfocus') : null;
				document.getElementById(`int-service-target-port-form-group__label${index}${id}`) ?
					document.getElementById(`int-service-target-port-form-group__label${index}${id}`).classList.remove('form-group__label-always-onfocus') : null;
				this.props.handleSubmitForm(this.state);
			});
		}
	}
	handleChangeExternal() {
		if (this.props.currentDeployment) {
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
			document.getElementById(`ext-service-name-form-group__label${index}${id}`).classList.remove('form-group__label-always-onfocus');
		} else {
			document.getElementById(`ext-service-name-form-group__label${index}${id}`).classList.add('form-group__label-always-onfocus');
		}
	}
	onChangeExtServicePort(e, id, index) {
		const portToInt = e.target.value ? parseInt(e.target.value, 10) : '';
		if (e.target.value.length === 0) {
			document.getElementById(`ext-service-port-form-group__label${index}${id}`).classList.remove('form-group__label-always-onfocus');
		} else {
			document.getElementById(`ext-service-port-form-group__label${index}${id}`).classList.add('form-group__label-always-onfocus');
		}
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
	handleClickRemoveExtServicePort(id, index) {
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
					externalServName: '',
					externalServPort: '',
					extServiceType: 'TCP',
					id: '_first',
					index: 1
				}]
			}, () => {
				document.getElementById(`ext-service-name-form-group__label${index}${id}`) ?
					document.getElementById(`ext-service-name-form-group__label${index}${id}`).classList.remove('form-group__label-always-onfocus') : null;
				document.getElementById(`ext-service-port-form-group__label${index}${id}`) ?
					document.getElementById(`ext-service-port-form-group__label${index}${id}`).classList.remove('form-group__label-always-onfocus') : null;
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
								{/*<Tooltip*/}
									{/*placement='top'*/}
									{/*trigger={['hover']}*/}
									{/*overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>}*/}
								{/*>*/}
									{/*<span className="myTooltip" data-toggle="tooltip">?</span>*/}
								{/*</Tooltip>*/}
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
								{/*className="form-group__input-text form-control customInput"*/}
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
										{/*<Tooltip*/}
											{/*placement='top'*/}
											{/*trigger={['hover']}*/}
											{/*overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>}*/}
										{/*>*/}
											{/*<span className="myTooltip" data-toggle="tooltip">?</span>*/}
										{/*</Tooltip>*/}
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
																className="form-group__input-text form-control customInput"
																type="text"
																pattern=".{3,}"
																required title="3 characters minimum"
																value={this.state.internalServObj[index].id === id &&
																this.state.internalServObj[index].internalServName}
																id={`int-service-name${index}${id}`}
																onChange={(e) => this.onChangeIntServiceName(e, id, index)}
															/>
															<label
																className="form-group__label"
																id={`int-service-name-form-group__label${index}${id}`}
																htmlFor={`int-service-name${index}${id}`}
															>Name</label>
															{index === 0 && <div className="helperText">The port name of Internal Service</div>}
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="has-float-label">
														<div className="form-group">
															<input
																className="form-group__input-text form-control customInput"
																type="number"
																required
																min="10000"
																max="65535"
																value={this.state.internalServObj[index].id === id &&
																this.state.internalServObj[index].internalServPort}
																id={`int-service-port${index}${id}`}
																onChange={(e) => this.onChangeIntServicePort(e, id, index)}
															/>
															<label
																className="form-group__label"
																id={`int-service-port-form-group__label${index}${id}`}
																htmlFor={`int-service-port${index}${id}`}
															>Port</label>
															{index === 0 && <div className="helperText">The port of Internal Service</div>}
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="has-float-label">
														<div className="form-group">
															<input
																className="form-group__input-text form-control customInput"
																type="number"
																required
																min="10000"
																max="65535"
																value={this.state.internalServObj[index].id === id &&
																this.state.internalServObj[index].internalServTargetPort}
																id={`int-service-target-port${index}${id}`}
																onChange={(e) => this.onChangeIntServiceTargetPort(e, id, index)}
															/>
															<label
																className="form-group__label"
																id={`int-service-target-port-form-group__label${index}${id}`}
																htmlFor={`int-service-target-port${index}${id}`}
															>Target Port</label>
															{index === 0 && <div className="helperText">The target port into your Container</div>}
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
													onClick={() => this.handleClickRemoveIntServicePort(id, index)}
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
								{/*<Tooltip*/}
									{/*placement='top'*/}
									{/*trigger={['hover']}*/}
									{/*overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>}*/}
								{/*>*/}
									{/*<span className="myTooltip" data-toggle="tooltip">?</span>*/}
								{/*</Tooltip>*/}
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
								{/*className="form-group__input-text form-control customInput"*/}
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
										{/*<Tooltip*/}
											{/*placement='top'*/}
											{/*trigger={['hover']}*/}
											{/*overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>}*/}
										{/*>*/}
											{/*<span className="myTooltip" data-toggle="tooltip">?</span>*/}
										{/*</Tooltip>*/}
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
																className="form-group__input-text form-control customInput"
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
																id={`ext-service-name-form-group__label${index}${id}`}
																htmlFor={`ext-service-name${index}`}
															>Name</label>
															{index === 0 && <div className="helperText">The name of Internal Service</div>}
														</div>
													</div>
												</div>
												<div className="col-md-3">
													<div className="has-float-label">
														<div className="form-group">
															<input
																className="form-group__input-text form-control customInput"
																type="number"
																required
																min="10000"
																max="65535"
																value={this.state.externalServObj[index].id === id &&
																this.state.externalServObj[index].externalServPort}
																id={`ext-service-port${index}`}
																onChange={(e) => this.onChangeExtServicePort(e, id, index)}
															/>
															<label
																className="form-group__label"
																id={`ext-service-port-form-group__label${index}${id}`}
																htmlFor={`ext-service-port${index}`}
															>Port</label>
															{index === 0 && <div className="helperText">The target port into your Container</div>}
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
													onClick={() => this.handleClickRemoveExtServicePort(id, index)}
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
