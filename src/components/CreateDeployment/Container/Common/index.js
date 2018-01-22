import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Common extends Component {
    render() {
    	// console.log('item', this.props.item);
        return (
	        <div className="row rowLine">
		        <div className="col-md-7">
			        <div
				        className="containerTitle
										        containerBlockTitle"
				        id={`container${this.props.index}-info`}
			        ><span>*</span> Common
				        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
			        </div>
			        <div className="form-group">
				        <input
					        className="form-group__input-text form-control"
					        id="containerName"
					        type="text"
					        pattern="[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*"
					        required title="error"
					        value={this.props.item.name}
					        onChange={(e) => {
						        this.props.onChangeInputCommon({
							        containerName: e.target.value,
							        index: this.props.index - 1
						        });
						        if (e.target.value.length === 0) {
							        document.getElementById(`container-name-form-group__label${this.props.index}`).classList.remove('form-group__label-always-onfocus');
						        } else {
							        document.getElementById(`container-name-form-group__label${this.props.index}`).classList.add('form-group__label-always-onfocus');
						        }
					        }}
				        />
				        <label
					        className="form-group__label"
					        id={`container-name-form-group__label${this.props.index}`}
					        htmlFor="containerName"
				        >Container Name</label>
				        <div className="form-group__helper">Your Deployment name can only contain alphanumeric and characters</div>
			        </div>

			        <div className="form-group">
				        <input
					        className="form-group__input-text form-control"
					        id="dockerImage"
					        type="text"
					        pattern="[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*"
					        required title="error"
					        value={this.props.item.image}
					        onChange={(e) => {
						        this.props.onChangeInputCommon({
							        dockerImage: e.target.value,
							        index: this.props.index - 1
						        });
						        if (e.target.value.length === 0) {
							        document.getElementById(`docker-image-form-group__label${this.props.index}`).classList.remove('form-group__label-always-onfocus');
						        } else {
							        document.getElementById(`docker-image-form-group__label${this.props.index}`).classList.add('form-group__label-always-onfocus');
						        }
					        }}
				        />
				        <label
					        className="form-group__label"
					        id={`docker-image-form-group__label${this.props.index}`}
					        htmlFor="dockerImage"
				        >Docker Image</label>
				        <div className="form-group__helper">Your Deployment name can only contain alphanumeric and characters</div>
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
