import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';

import icon from '../../../../images/icon-create-dep.svg';

class Enviroments extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState();
	}
	initialState() {
		return {
			env: [{
				value: '',
				name: '',
				id: '_first',
				index: this.props.index
			}]
		};
	}
	handleClickAddEnviroments(index) {
		this.setState({
			env: [
				...this.state.env,
				{
					value: '',
					name: '',
					id: '_' + Math.random().toString(36).substr(2, 9),
					index
				}
			]
		}, () => {
			this.props.onChangeInputEnv(this.state.env);
		})
	}
	handleClickRemoveEnviroments(id) {
		if (this.state.env.length > 1) {
			const nextLabels = Object.assign({}, this.state).env.filter((item) => {
				return item.id !== id;
			});
			this.setState({
				env: nextLabels
			}, () => {
				this.props.onChangeInputEnv(this.state.env);
			});
		} else {
			this.setState(this.initialState(), () => {
				this.props.onChangeInputEnv(this.state.env);
			});
		}
	}
	handleChangeInputEnviromentsName(e, id, index) {
		const nextState = Object.assign({}, this.state);
		nextState.env.filter(item => {
			if (item.id === id) {
				item.name = e.target.value;
				item.index = index;
			}
		});
		this.setState({
			env: nextState.env
		}, () => {
			this.props.onChangeInputEnv(this.state.env);
		});
	}
	handleChangeInputEnviromentsValue(e, id, index) {
		const nextState = Object.assign({}, this.state);
		nextState.env.filter(item => {
			if (item.id === id) {
				item.value = e.target.value;
				item.index = index;
			}
		});
		this.setState({
			env: nextState.env
		}, () => {
			this.props.onChangeInputEnv(this.state.env);
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
			        this.props.item.env.map((item, index) => {
				        // console.log('env', this.props.item.env[index]);
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
									        className="form-group__input-text form-control customInput"
									        id={`envName${index}${this.props.index}`}
									        type="text"
									        pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$|^$"
									        title="Name can only contain letters, numbers and characters"
									        value={this.props.item.env[index].id === id &&
									        this.props.item.env[index].name}
									        onChange={(e) => {
										        this.handleChangeInputEnviromentsName(e, id, this.props.index);
										        if (e.target.value.length === 0) {
											        document.getElementById(`env-name-form-group__label${index}${this.props.index}`).classList.remove('form-group__label-always-onfocus');
										        } else {
											        document.getElementById(`env-name-form-group__label${index}${this.props.index}`).classList.add('form-group__label-always-onfocus');
										        }
									        }}
								        />
								        <label
									        className="form-group__label"
									        htmlFor={`envName${index}${this.props.index}`}
									        id={`env-name-form-group__label${index}${this.props.index}`}
								        >Name</label>
								        {index === 0 && <div className="form-group__helper helperText">The Enviroments instruction sets the environment variable {`<key>`} to the value {`<value>`}.</div>}
							        </div>
						        </div>
						        <div className="col-md-5 myColumn">
							        <div className="form-group">
								        <input
									        className="form-group__input-text form-control customInput"
									        id={`envValue${index}${this.props.index}`}
									        type="text"
									        pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$|^$"
									        title="Value can only contain letters, numbers and characters"
									        value={this.props.item.env[index].id === id &&
									        this.props.item.env[index].value}
									        onChange={(e) => {
										        this.handleChangeInputEnviromentsValue(e, id, this.props.index);
										        if (e.target.value.length === 0) {
											        document.getElementById(`value-name-form-group__label${index}${this.props.index}`).classList.remove('form-group__label-always-onfocus');
										        } else {
											        document.getElementById(`value-name-form-group__label${index}${this.props.index}`).classList.add('form-group__label-always-onfocus');
										        }
									        }}
								        />
								        <label
									        className="form-group__label"
									        htmlFor={`envValue${index}${this.props.index}`}
									        id={`value-name-form-group__label${index}${this.props.index}`}
								        >Value</label>
								        {/*{index === 0 && <div className="form-group__helper helperText">Your Deployment name can only contain alphanumeric and characters</div>}*/}
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
				        onClick={() => this.handleClickAddEnviroments(this.props.index)}
			        >+ Add Enviroment</div>
		        </div>
	        </div>
        );
    }
}

Enviroments.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object.isRequired,
	onChangeInputEnv: PropTypes.func.isRequired
};

export default Enviroments;
