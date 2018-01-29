import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';

import icon from '../../../../images/icon-create-dep.svg';

class ImagePorts extends Component {
	constructor() {
		super();
		this.state = this.initialState();
	}
	initialState() {
		return {
			ports: [{
				containerPort: '',
				id: '_first',
				index: 1
			}]
		};
	}
	handleClickAddImagePort(index) {
		this.setState({
			ports: [
				...this.state.ports,
				{
					containerPort: '',
					id: '_' + Math.random().toString(36).substr(2, 9),
					index
				}
			]
		}, () => {
			this.props.onChangeInputImagePorts(this.state.ports);
		})
	}
	handleClickRemoveImagePort(id) {
		if (this.state.ports.length > 1) {
			const nextLabels = Object.assign({}, this.state).ports.filter((item) => {
				return item.id !== id;
			});
			this.setState({
				ports: nextLabels
			}, () => {
				this.props.onChangeInputImagePorts(this.state.ports);
			});
		} else {
			this.setState(this.initialState(), () => {
				// console.log(this.state.ports);
				this.props.onChangeInputImagePorts(this.state.ports);
			});
		}
	}
	handleChangeInputImagePort(e, id, index) {
		const regexp = /^[0-9]{0,5}$|^$/;
		const portToInt = e.target.value ? parseInt(e.target.value, 10) : '';
		if (e.target.value.search(regexp) !== -1) {
			const nextState = Object.assign({}, this.state);
			nextState.ports.filter(item => {
				if (item.id === id) {
					item.containerPort = portToInt;
					item.index = index;
				}
			});
			this.setState({
				ports: nextState.ports
			}, () => {
				this.props.onChangeInputImagePorts(this.state.ports);
			});
		}
	}
    render() {
	    // console.log('props', this.props.item);
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
									        type="text"
									        value={this.props.item.ports[index].id === id &&
									        this.props.item.ports[index].containerPort}
									        onChange={(e) => {
										        this.handleChangeInputImagePort(e, id, this.props.index);
										        if (e.target.value.length === 0) {
											        document.getElementById(`port-name-form-group__label${id}`).classList.remove('form-group__label-always-onfocus');
										        } else {
											        document.getElementById(`port-name-form-group__label${id}`).classList.add('form-group__label-always-onfocus');
										        }
									        }}
								        />
								        <label
									        className="form-group__label"
									        id={`port-name-form-group__label${id}`}
									        htmlFor={`port${this.props.index}${id}`}
								        >Port</label>
								        {/*{index === 0 && <div className="form-group__helper">Your Deployment name can only contain alphanumeric and characters</div>}*/}
							        </div>
						        </div>
						        <div className="col-md-5 myColumn"> </div>
						        <div
							        className="col-md-1"
							        onClick={() => this.handleClickRemoveImagePort(id)}
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
	onChangeInputImagePorts: PropTypes.func.isRequired
};

export default ImagePorts;
