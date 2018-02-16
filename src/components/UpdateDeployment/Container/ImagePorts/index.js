import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';

import icon from '../../../../images/icon-create-dep.svg';

class ImagePorts extends Component {
	componentDidMount() {
		this.props.item.ports.map((item) => {
			if (item.containerPort) {
				// console.log('item.containerPort', item.id, item.index);
				const port = document.getElementById(`port-name-form-group__label${item.index}${item.id}`);
				// console.log('item.port', `port-name-form-group__label${this.props.index}${this.props.item.id}`);
				port ? port.classList.add('form-group__label-always-onfocus') : null;
			}
		});
	}
	handleClickAddImagePort(index) {
		const ports = this.props.item.ports;
		ports.push({
			containerPort: '',
			id: '_' + Math.random().toString(36).substr(2, 9),
			index
		});
		this.props.onChangeInputImagePorts(ports);
	}
	handleClickRemoveImagePort(id, index) {
		const ports = this.props.item.ports;
		if (ports.length > 1) {
			const nextLabels = ports.filter((item) => {
				return item.id !== id && item.index === index;
			});
			console.log('nextLabels', nextLabels);
			this.props.onChangeInputImagePorts(nextLabels);
		} else {
			// console.log(ports, id, index);
			this.props.onChangeInputImagePorts([{
				containerPort: '',
				id,
				index
			}]);
			document.getElementById(`port-name-form-group__label${index}${id}`) ?
				document.getElementById(`port-name-form-group__label${index}${id}`).classList.remove('form-group__label-always-onfocus') : null;
		}
	}
	handleChangeInputImagePort(e, id, index) {
		const portToInt = e.target.value ? parseInt(e.target.value, 10) : '';
		const ports = this.props.item.ports;
		if (e.target.value.length === 0) {
			document.getElementById(`port-name-form-group__label${this.props.index}${id}`).classList.remove('form-group__label-always-onfocus');
		} else {
			document.getElementById(`port-name-form-group__label${this.props.index}${id}`).classList.add('form-group__label-always-onfocus');
		}
		ports.filter(item => {
			if (item.id === id) {
				item.containerPort = portToInt;
				item.index = index;
			}
		});
		this.props.onChangeInputImagePorts(ports);
	}
	render() {
		return (
			<div
				className="row rowLine"
				id={`container${this.props.index}-image-ports`}
			>
				<div className="col-md-12">
					<div className="containerTitle containerBlockTitle">Image Ports
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
					this.props.item.ports.map((item, index) => {
						const id = item.id;
						// console.log('this.props.index, id', this.props.index, id);
						return (
							<div
								className="row marLeft"
								style={{width: '100%'}}
								key={id}
							>
								<div className="col-md-5 myColumn">
									<div className="form-group">
										<input
											className="form-group__input-text form-control customInput"
											id={`port${this.props.index}${id}`}
											type="number"
											min="0"
											max="65535"
											value={this.props.item.ports[index].id === id &&
											this.props.item.ports[index].containerPort}
											onChange={(e) => {
												this.handleChangeInputImagePort(e, id, this.props.index);
											}}
										/>
										<label
											className="form-group__label"
											htmlFor={`port${this.props.index}${id}`}
											id={`port-name-form-group__label${this.props.index}${id}`}
										>Port</label>
										{/*{index === 0 && <div className="form-group__helper">Your Deployment name can only contain alphanumeric and characters</div>}*/}
									</div>
								</div>
								<div className="col-md-5 myColumn"> </div>
								<div
									className="col-md-1"
									onClick={() => this.handleClickRemoveImagePort(id, this.props.index)}
								>
									<img src={icon} alt="delete" className="iconBasket" />
								</div>
							</div>
						)
					})
				}
				{/*<div className="col-md-5 myColumn">*/}
				{/*<div className="has-float-label">*/}
				{/*<input className="form-control customInput" id="text9" type="text" placeholder=" " />*/}
				{/*<label className="customLabel" htmlFor="text9">Target Port</label>*/}
				{/*<div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>*/}
				{/*</div>*/}
				{/*</div>*/}

				<div className="col-md-12">
					<div
						className="addBlockBtn marLeft"
						onClick={() => this.handleClickAddImagePort(this.props.index)}
					>+ Add Image Port</div>
				</div>
			</div>
		);
	}
}

ImagePorts.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object.isRequired,
	containers: PropTypes.array,
	onChangeInputImagePorts: PropTypes.func.isRequired
};

export default ImagePorts;