import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';

import icon from '../../../../images/icon-create-dep.svg';

class Volume extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState();
	}
	initialState() {
		return {
			volumeMounts: []
		};
	}
	handleClickAddVolume() {
		this.setState({
			volumeMounts: [
				...this.state.volumeMounts,
				{
					name: this.props.volumes[0].name,
					mountPath: '',
					subPath: '',
					id: '_' + Math.random().toString(36).substr(2, 9),
					index: this.props.index
				}
			]
		}, () => {
			this.props.onChangeSelectVolume(this.state.volumeMounts);
		})
	}
	handleClickRemoveVolume(id) {
		if (this.state.volumeMounts.length > 1) {
			const nextLabels = Object.assign({}, this.state).volumeMounts.filter((item) => {
				return item.id !== id;
			});
			this.setState({
				volumeMounts: nextLabels
			}, () => {
				this.props.onChangeSelectVolume(this.state.volumeMounts);
			});
		} else {
			this.setState(this.initialState(), () => {
				// console.log(this.state.volumeMounts);
				this.props.onChangeSelectVolume(this.state.volumeMounts, this.props.index);
			});
		}
	}
	handleChangeSelect(e, id, index) {
		const nextState = Object.assign({}, this.state);
		nextState.volumeMounts.filter(item => {
			if (item.id === id) {
				item.name = e.target.value;
				item.index = index;
			}
		});
		this.setState({
			volumeMounts: nextState.volumeMounts
		}, () => {
			this.props.onChangeSelectVolume(this.state.volumeMounts);
		});
	}
	handleChangeInputVolumeSubpath(e, id, index) {
		const nextState = Object.assign({}, this.state);
		nextState.volumeMounts.filter(item => {
			if (item.id === id) {
				item.subPath = e.target.value;
				item.index = index;
			}
		});
		this.setState({
			volumeMounts: nextState.volumeMounts
		}, () => {
			this.props.onChangeSelectVolume(this.state.volumeMounts);
		});
	}
	handleChangeInputVolumePath(e, id, index) {
		const nextState = Object.assign({}, this.state);
		nextState.volumeMounts.filter(item => {
			if (item.id === id) {
				item.mountPath = e.target.value;
				item.index = index;
			}
		});
		this.setState({
			volumeMounts: nextState.volumeMounts
		}, () => {
			this.props.onChangeSelectVolume(this.state.volumeMounts);
		});
	}
    render() {
    	// console.log(this.props.volumes);
    	// console.log(this.props.volumes.length);
    	// console.log(this.props.isContainersMore);
        return (
	        <div
		        className="row rowLine"
		        id={`container${this.props.index}-volume`}
		        style={
		        	(this.props.isContainersMore) ? {} : {borderBottom: 'none'}
		        }
	        >
		        <div className="col-md-12">
			        <div className="containerTitle containerBlockTitle">Volume
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
			        this.state.volumeMounts.map((item, index) => {
			        	// console.log(item);
				        const id = item.id;
				        return (
					        <div
						        className="row marLeft"
						        style={{width: '100%'}}
						        key={id}
					        >
						        <div className="col-md-4 myCol31">
							        <div className="form-group" style={{padding: 0}}>
								        <div className="select-wrapper">
									        <div className="select-arrow-3"> </div>
									        <div className="select-arrow-3"> </div>
									        <select
										        name="volumes"
										        className="selectCustom"
										        value={this.state.volumeMounts[index].id === id &&
										        this.state.volumeMounts[index].name}
										        onChange={(e) => this.handleChangeSelect(e, id, this.props.index)}
										        required>
										        {this.props.volumes.map((item) => {
											        return (
												        <option
													        key={item.label}
													        value={item.label}
												        >{item.label}</option>
											        );
										        })}
									        </select>
								        </div>
								        {index === 0 && <div className="form-group__helper">Choose your exiscting Volume <br/>
									        Path - The Folder into  your Container or Pod</div>}
							        </div>
						        </div>
						        <div className="col-md-4 myCol31">
							        <div className="form-group" style={{paddingTop: 0, marginTop: '-3px'}}>
								        <span className="inputSubpathSign">/</span>
								        <input
									        className="form-group__input-text form-control customInput"
									        id={`subPath${index}${id}`}
									        type="text"
									        value={this.state.volumeMounts[index].id === id &&
									        this.state.volumeMounts[index].subPath}
									        onChange={(e) => {
										        this.handleChangeInputVolumeSubpath(e, id, this.props.index);
										        if (e.target.value.length === 0) {
											        document.getElementById(`subpath-name-form-group__label${index}${id}`).classList.remove('form-group__label-always-onfocus');
										        } else {
											        document.getElementById(`subpath-name-form-group__label${index}${id}`).classList.add('form-group__label-always-onfocus');
										        }
									        }}
								        />
								        <label
									        className="form-group__label"
									        htmlFor={`subPath${index}${id}`}
									        id={`subpath-name-form-group__label${index}${id}`}
									        style={{marginTop: '-20px'}}
								        >Subpath</label>
							        </div>
						        </div>
						        <div className="col-md-4 myCol31 marLeftt10">
							        <div className="form-group" style={{paddingTop: 0, marginTop: '-3px'}}>
								        <input
									        className="form-group__input-text form-control customInput"
									        id={`mountPath${index}${id}`}
									        type="text"
									        pattern="[a-z0-9/]([-a-z0-9/]*[a-z0-9])?"
									        required title="error"
									        value={this.state.volumeMounts[index].id === id &&
									        this.state.volumeMounts[index].mountPath}
									        onChange={(e) => {
										        this.handleChangeInputVolumePath(e, id, this.props.index);
										        if (e.target.value.length === 0) {
											        document.getElementById(`path-name-form-group__label${index}${id}`).classList.remove('form-group__label-always-onfocus');
										        } else {
											        document.getElementById(`path-name-form-group__label${index}${id}`).classList.add('form-group__label-always-onfocus');
										        }
									        }}
								        />
								        <label
									        className="form-group__label"
									        htmlFor={`mountPath${index}${id}`}
									        id={`path-name-form-group__label${index}${id}`}
									        style={{marginTop: '-20px'}}
								        >Path</label>
							        </div>
						        </div>
						        <div
							        className="col-md-1"
							        onClick={() => this.handleClickRemoveVolume(id)}
						        >
							        <img src={icon} alt="delete" className="iconBasket" />
						        </div>
					        </div>
				        )
			        })
		        }
		        {
			        this.props.volumes.length ?
				        <div className="col-md-12">
					        <div
						        className="addBlockBtn marLeft"
						        onClick={this.handleClickAddVolume.bind(this)}
					        >+ Add Volume</div>
				        </div> :
				        <div style={{marginLeft: '15px'}}>You don't have volumes</div>
		        }
	        </div>
        );
    }
}

Volume.propTypes = {
	index: PropTypes.number.isRequired,
	onChangeSelectVolume: PropTypes.func.isRequired,
	isContainersMore: PropTypes.bool,
	// idName: PropTypes.string.isRequired,
	volumes: PropTypes.array.isRequired
};

export default Volume;
