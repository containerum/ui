import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Common extends Component {
    render() {
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
					        required
					        value={this.props.item.name}
					        onChange={(e) => {
						        this.props.onChangeInputCommon({
							        containerName: e.target.value,
							        index: this.props.index - 1
						        });
					        }}
				        />
				        <label className="form-group__label" htmlFor="containerName">Container Name</label>
				        <div className="form-group__helper">Your Deployment name can only contain alphanumeric and characters</div>
			        </div>

			        <div className="form-group">
				        <input
					        className="form-group__input-text form-control"
					        id="dockerImage"
					        type="text"
					        required
					        value={this.props.item.image}
					        onChange={(e) => {
						        this.props.onChangeInputCommon({
							        dockerImage: e.target.value,
							        index: this.props.index - 1
						        });
					        }}
				        />
				        <label className="form-group__label" htmlFor="dockerImage">Docker Image</label>
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
