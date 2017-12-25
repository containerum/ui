import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import icon from '../../../../images/icon-create-dep.svg';

class Volume extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState();
	}
	initialState() {
		return {
			volumeMounts: [{
				name: `${this.props.idName}-volume`,
				mountPath: '',
				subPath: '',
				id: '_first',
				index: this.props.index
			}]
		};
	}
	handleClickAddVolume() {
		this.setState({
			volumeMounts: [
				...this.state.volumeMounts,
				{
					name: `${this.props.idName}-volume`,
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
				this.props.onChangeSelectVolume(this.state.volumeMounts);
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
        return (
	        <div
		        className="row rowLine"
		        id={`container${this.props.index}-volume`}
	        >
		        <div className="col-md-12">
			        <div className="containerTitle containerBlockTitle">Volume
				        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
			        </div>
		        </div>

		        {
			        this.state.volumeMounts.map((item, index) => {
				        const id = item.id;
				        return (
					        <div
						        className="row marLeft"
						        style={{width: '100%'}}
						        key={id}
					        >
						        <div className="col-md-4 myCol31">
							        <div className="form-group">
								        <div className="select-wrapper">
									        <div className="select-arrow-3"></div>
									        <div className="select-arrow-3"></div>
									        <select
										        name="volimes"
										        className="selectCustom"
										        value={this.state.volumeMounts[index].id === id &&
										        this.state.volumeMounts[index].name}
										        onChange={(e) => this.handleChangeSelect(e, id, this.props.index)}
										        required>
										        <option
											        key={`${this.props.idName}-volume`}
											        value={`${this.props.idName}-volume`}
										        >{`${this.props.idName}-volume`}</option>
										        {this.props.volumes.map((item) => {
											        return (
												        <option
													        key={item.name}
													        value={item.name}
												        >{item.name}</option>
											        );
										        })}
									        </select>
								        </div>
								        {index === 0 && <div className="form-group__helper">Your Deployment name can only contain alphanumeric and characters</div>}
								        </div>
						        </div>
						        <div className="col-md-4 myCol31">
							        <div className="form-group" style={{paddingTop: 0, marginTop: '-3px'}}>
								        <span className="inputSubpathSign">/</span>
								        <input
									        className="form-group__input-text form-control"
									        id={`subPath${index}`}
									        type="text"
									        value={this.state.volumeMounts[index].id === id &&
									        this.state.volumeMounts[index].subPath}
									        onChange={(e) => this.handleChangeInputVolumeSubpath(e, id, this.props.index)}
								        />
								        <label
									        className="form-group__label"
									        htmlFor={`subPath${index}`}
									        style={{marginTop: '-20px'}}
								        >Subpath</label>
							        </div>
						        </div>
						        <div className="col-md-4 myCol31 marLeftt10">
							        <div className="form-group" style={{paddingTop: 0, marginTop: '-3px'}}>
								        <input
									        className="form-group__input-text form-control"
									        id={`mountPath${index}`}
									        type="text"
									        value={this.state.volumeMounts[index].id === id &&
									        this.state.volumeMounts[index].mountPath}
									        onChange={(e) => this.handleChangeInputVolumePath(e, id, this.props.index)}
								        />
								        <label
									        className="form-group__label"
									        htmlFor={`mountPath${index}`}
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

		        <div className="col-md-12">
			        <div
				        className="addBlockBtn marLeft"
				        onClick={this.handleClickAddVolume.bind(this)}
			        >+ Add Volume</div>
		        </div>
	        </div>
        );
    }
}

Volume.propTypes = {
	index: PropTypes.number.isRequired,
	onChangeSelectVolume: PropTypes.func.isRequired,
	idName: PropTypes.string.isRequired,
	volumes: PropTypes.array.isRequired
};

export default Volume;
