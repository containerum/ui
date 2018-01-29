import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';

import icon from '../../../images/icon-create-dep.svg';
import Common from './Common';
import Parameters from './Parameters';
import ImagePorts from './ImagePorts';
import Commands from './Commands';
import Enviroments from './Enviroments';
import Volume from './Volume';

class Container extends Component {
	onChangeInputCommon(common) {
		this.props.onChangeInputCommon(common);
	}
	onChangeInputParameters(parameters) {
		this.props.onChangeInputParameters(parameters);
	}
	onChangeInputImagePorts(imagePorts) {
		this.props.onChangeInputImagePorts(imagePorts);
	}
	onChangeInputCommands(commands) {
		this.props.onChangeInputCommands(commands);
	}
	onChangeInputEnv(env) {
		this.props.onChangeInputEnv(env);
	}
	onChangeSelectVolume(volume, index) {
		this.props.onChangeSelectVolume(volume, index);
	}
    render() {
        return (
        	<div>
		        {
			        this.props.containers.map((item, index) => {
			        	const fixedIndex = index + 1;
			        	let id = item.id;
				        return (
					        <div
						        className="blockContainer blockAddContainerPadin"
						        key={id}
					        >
						        <div className="col-md-12">
							        <div className="containerTitle marLeft20" id={`container${fixedIndex}`}>Container {fixedIndex}
								        {/*<Tooltip*/}
									        {/*placement='top'*/}
									        {/*trigger={['hover']}*/}
									        {/*overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>}*/}
								        {/*>*/}
									        {/*<span className="myTooltip" data-toggle="tooltip">?</span>*/}
								        {/*</Tooltip>*/}
							        </div>
							        {
								        this.props.containersCount !== 1 &&
								        <button
									        type="button"
									        className="close"
									        style={{marginTop: '-10px'}}
									        onClick={() => {
										        this.props.onChangeContainerRemoveCount(id)
									        }}
								        >
									        <span aria-hidden="true">
							                    <img
								                    src={icon}
								                    alt="delete"
								                    style={{width: '12px', height: '15px'}}
							                    />
									        </span>
								        </button>
							        }
							        <Common
								        onChangeInputCommon={(common) =>
							                this.onChangeInputCommon(common)}
								        index={fixedIndex}
								        item={item}
							        />

							        <Parameters
								        onChangeInputParameters={(parameters) =>
									        this.onChangeInputParameters(parameters)}
								        index={fixedIndex}
								        item={item}
							        />

							        <ImagePorts
								        onChangeInputImagePorts={(imagePorts) =>
							                this.onChangeInputImagePorts(imagePorts)}
								        index={fixedIndex}
								        item={item}
							        />

							        <Commands
								        onChangeInputCommands={(commands) =>
									        this.onChangeInputCommands(commands)}
								        index={fixedIndex}
								        item={item}
							        />

							        <Enviroments
								        onChangeInputEnv={(env) =>
									        this.onChangeInputEnv(env)}
								        index={fixedIndex}
								        item={item}
							        />

							        <Volume
								        onChangeSelectVolume={(volume, index) =>
									        this.onChangeSelectVolume(volume, index)}
								        volumes={this.props.volumes}
								        idName={this.props.idName}
								        isContainersMore={this.props.containersCount === fixedIndex &&
								        this.props.containersCount < 3}
								        index={fixedIndex}
							        />

							        {
								        this.props.containersCount === fixedIndex &&
								        this.props.containersCount < 3 &&
								        <div
									        className="addBlockBtn addBlockBtnBig text-md-center"
									        onClick={() => {
										        this.props.onChangeContainerCount()
									        }}
								        >+ Add container</div>
							        }
						        </div>
					        </div>
				        )
			        })
		        }
	        </div>
        );
    }
}

Container.propTypes = {
	containersCount: PropTypes.number.isRequired,
	onChangeContainerCount: PropTypes.func.isRequired,
	onChangeContainerRemoveCount: PropTypes.func.isRequired,
	onChangeInputCommon: PropTypes.func.isRequired,
	onChangeInputParameters: PropTypes.func.isRequired,
	onChangeInputImagePorts: PropTypes.func.isRequired,
	onChangeInputEnv: PropTypes.func.isRequired,
	onChangeSelectVolume: PropTypes.func.isRequired,
	volumes: PropTypes.array.isRequired,
	containers: PropTypes.array.isRequired,
	idName: PropTypes.string.isRequired
};

export default Container;
