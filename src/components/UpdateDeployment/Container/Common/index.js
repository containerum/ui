import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Common extends Component {
	componentDidMount() {
		if (this.props.item.name) {
			const containerName = document.getElementById(`container-name-form-group__label${this.props.item.id}`);
			containerName ? containerName.classList.add('form-group__label-always-onfocus') : null;
		}
		if (this.props.item.image) {
			const dockerImage = document.getElementById(`docker-image-form-group__label${this.props.item.id}`);
			dockerImage ? dockerImage.classList.add('form-group__label-always-onfocus') : null;
		}
	}
    render() {
    	// console.log('item', this.props.item.id);
        return (
	        <div className="row rowLine">
		        <div className="col-md-7">
			        <div
				        className="containerTitle containerBlockTitle"
				        id={`container${this.props.index}-info`}
			        ><span>*</span> Common
				        {/*<Tooltip*/}
					        {/*placement='top'*/}
					        {/*trigger={['hover']}*/}
					        {/*overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>}*/}
				        {/*>*/}
					        {/*<span className="myTooltip" data-toggle="tooltip">?</span>*/}
				        {/*</Tooltip>*/}
			        </div>
			        <div className="form-group">
				        <input
					        className="form-group__input-text form-control customInput"
					        id={`containerName${this.props.index}`}
					        type="text"
					        pattern="[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*"
					        required title="Container name can only contain letters, numbers and characters"
					        value={this.props.item.name}
					        onChange={(e) => {
						        this.props.onChangeInputCommon({
							        containerName: e.target.value,
							        index: this.props.index - 1
						        });
						        if (e.target.value.length === 0) {
							        document.getElementById(`container-name-form-group__label${this.props.item.id}`).classList.remove('form-group__label-always-onfocus');
						        } else {
							        document.getElementById(`container-name-form-group__label${this.props.item.id}`).classList.add('form-group__label-always-onfocus');
						        }
					        }}
				        />
				        <label
					        className="form-group__label"
					        id={`container-name-form-group__label${this.props.item.id}`}
					        htmlFor={`containerName${this.props.index}`}
				        >Container Name</label>
				        <div className="form-group__helper">Container name can only contain letters, numbers and characters</div>
			        </div>

			        <div className="form-group">
				        <input
					        className="form-group__input-text form-control customInput"
					        id={`dockerImage${this.props.index}`}
					        type="text"
					        pattern="(?:.+/)?([^:]+)(?::.+)?*"
					        required title="Example: redis or redis:latest or redis:4.0.7-alpine"
					        value={this.props.item.image}
					        onChange={(e) => {
						        this.props.onChangeInputCommon({
							        dockerImage: e.target.value,
							        index: this.props.index - 1
						        });
						        if (e.target.value.length === 0) {
							        document.getElementById(`docker-image-form-group__label${this.props.item.id}`).classList.remove('form-group__label-always-onfocus');
						        } else {
							        document.getElementById(`docker-image-form-group__label${this.props.item.id}`).classList.add('form-group__label-always-onfocus');
						        }
					        }}
				        />
				        <label
					        className="form-group__label"
					        id={`docker-image-form-group__label${this.props.item.id}`}
					        htmlFor={`dockerImage${this.props.index}`}
				        >Docker Image</label>
				        <div className="form-group__helper">Example: redis or redis:latest or redis:4.0.7-alpine</div>
			        </div>
		        </div>
	        </div>
        );
    }
}

Common.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object.isRequired,
	onChangeInputCommon: PropTypes.func.isRequired
};

export default Common;
