import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';

import icon from '../../../../images/icon-create-dep.svg';

class Enviroments extends Component {
	componentDidMount() {
		this.props.item.env.map((item) => {
			if (item.value) {
				// console.log('item.containerPort', item.id, item.index);
				const envName = document.getElementById(`env-name-form-group__label${item.index}${item.id}`);
				// console.log('item.port', `port-name-form-group__label${this.props.index}${this.props.item.id}`);
				envName ? envName.classList.add('form-group__label-always-onfocus') : null;
			}
			if (item.name) {
				// console.log('item.containerPort', item.id, item.index);
				const port = document.getElementById(`env-value-form-group__label${item.index}${item.id}`);
				// console.log('item.port', `port-name-form-group__label${this.props.index}${this.props.item.id}`);
				port ? port.classList.add('form-group__label-always-onfocus') : null;
			}
		});
	}
	handleClickAddEnviroments(index) {
		const envs = this.props.item.env;
		envs.push({
			value: '',
			name: '',
			id: '_' + Math.random().toString(36).substr(2, 9),
			index
		});
		this.props.onChangeInputEnv(envs);
	}
	handleClickRemoveEnviroments(id, index) {
		const envs = this.props.item.env;
		if (envs.length > 1) {
			const nextLabels = envs.filter((item) => {
				return item.id !== id && item.index === index;
			});
			this.props.onChangeInputEnv(nextLabels);
		} else {
			this.props.onChangeInputEnv([{
				value: '',
				name: '',
				id,
				index
			}]);
		}
	}
	handleChangeInputEnviromentsName(e, id, index) {
		const envs = this.props.item.env;
		envs.filter(item => {
			if (item.id === id) {
				item.name = e.target.value;
				item.index = index;
			}
		});
		this.props.onChangeInputEnv(envs);
	}
	handleChangeInputEnviromentsValue(e, id, index) {
		const envs = this.props.item.env;
		envs.filter(item => {
			if (item.id === id) {
				item.value = e.target.value;
				item.index = index;
			}
		});
		this.props.onChangeInputEnv(envs);
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
											        document.getElementById(`env-name-form-group__label${this.props.index}${id}`).classList.remove('form-group__label-always-onfocus');
										        } else {
											        document.getElementById(`env-name-form-group__label${this.props.index}${id}`).classList.add('form-group__label-always-onfocus');
										        }
									        }}
								        />
								        <label
									        className="form-group__label"
									        htmlFor={`envName${index}${this.props.index}`}
									        id={`env-name-form-group__label${this.props.index}${id}`}
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
											        document.getElementById(`env-value-form-group__label${this.props.index}${id}`).classList.remove('form-group__label-always-onfocus');
										        } else {
											        document.getElementById(`env-value-form-group__label${this.props.index}${id}`).classList.add('form-group__label-always-onfocus');
										        }
									        }}
								        />
								        <label
									        className="form-group__label"
									        htmlFor={`envValue${index}${this.props.index}`}
									        id={`env-value-form-group__label${this.props.index}${id}`}
								        >Value</label>
								        {/*{index === 0 && <div className="form-group__helper helperText">Your Deployment name can only contain alphanumeric and characters</div>}*/}
							        </div>
						        </div>
						        <div
							        className="col-md-1"
							        onClick={() => this.handleClickRemoveEnviroments(id, this.props.index)}
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
	containers: PropTypes.array,
	onChangeInputEnv: PropTypes.func.isRequired
};

export default Enviroments;
