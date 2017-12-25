import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import icon from '../../../../images/icon-create-dep.svg';

class Enviroments extends Component {
	constructor() {
		super();
		this.state = this.initialState();
	}
	initialState() {
		return {
			envs: [{
				value: '',
				name: '',
				id: '_first'
			}]
		};
	}
	handleClickAddEnviroments() {
		this.setState({
			envs: [
				...this.state.envs,
				{
					value: '',
					name: '',
					id: '_' + Math.random().toString(36).substr(2, 9)
				}
			]
		})
	}
	handleClickRemoveEnviroments(id) {
		if (this.state.envs.length > 1) {
			const nextLabels = Object.assign({}, this.state).envs.filter((item) => {
				return item.id !== id;
			});
			this.setState({
				envs: nextLabels
			}, () => {
				this.props.onChangeInputEnv(this.state.envs);
			});
		} else {
			this.setState(this.initialState(), () => {
				this.props.onChangeInputEnv(this.state.envs);
			});
		}
	}
	handleChangeInputEnviromentsName(e, id, index) {
		const nextState = Object.assign({}, this.state);
		nextState.envs.filter(item => {
			if (item.id === id) {
				item.name = e.target.value;
				item.index = index;
			}
		});
		this.setState({
			envs: nextState.envs
		}, () => {
			this.props.onChangeInputEnv(this.state.envs);
		});
	}
	handleChangeInputEnviromentsValue(e, id, index) {
		const nextState = Object.assign({}, this.state);
		nextState.envs.filter(item => {
			if (item.id === id) {
				item.value = e.target.value;
				item.index = index;
			}
		});
		this.setState({
			envs: nextState.envs
		}, () => {
			this.props.onChangeInputEnv(this.state.envs);
		});
	}
    render() {
        return (
	        <div
		        className="row rowLine"
		        id={`container${this.props.index}-enviroments`}
	        >
		        <div className="col-md-12">
			        <div className="containerTitle containerBlockTitle">Enviroments
				        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
			        </div>
		        </div>
		        {
			        this.state.envs.map((item, index) => {
				        const id = item.id;
				        return (
					        <div
						        className="row marLeft"
						        key={id}
						        style={{width: '100%'}}
					        >
						        <div className="col-md-5 myColumn">
							        <div className="form-group">
								        <input
									        className="form-group__input-text form-control"
									        id={`envName${index}`}
									        type="text"
									        value={this.state.envs[index].id === id &&
									        this.state.envs[index].name}
									        onChange={(e) => this.handleChangeInputEnviromentsName(e, id, this.props.index)}
								        />
								        <label className="form-group__label" htmlFor={`envName${index}`}>Name</label>
								        {index === 0 && <div className="form-group__helper helperText">Your Deployment name can only contain alphanumeric and characters</div>}
							        </div>
						        </div>
						        <div className="col-md-5 myColumn">
							        <div className="form-group">
								        <input
									        className="form-group__input-text form-control"
									        id={`envValue${index}`}
									        type="text"
									        value={this.state.envs[index].id === id &&
									        this.state.envs[index].value}
									        onChange={(e) => this.handleChangeInputEnviromentsValue(e, id, this.props.index)}
								        />
								        <label className="form-group__label" htmlFor={`envValue${index}`}>Value</label>
								        {index === 0 && <div className="form-group__helper helperText">Your Deployment name can only contain alphanumeric and characters</div>}
							        </div>
						        </div>
						        <div
							        className="col-md-1"
							        onClick={() => this.handleClickRemoveEnviroments(id)}
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
				        onClick={this.handleClickAddEnviroments.bind(this)}
			        >+ Add Enviroment</div>
		        </div>
	        </div>
        );
    }
}

Enviroments.propTypes = {
	index: PropTypes.number.isRequired,
	onChangeInputEnv: PropTypes.func.isRequired
};

export default Enviroments;
