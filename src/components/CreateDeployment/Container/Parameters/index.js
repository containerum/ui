import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Parameters extends Component {
    render() {
        return (
	        <div
		        className="row rowLine"
		        id={`container${this.props.index}-parameters`}
	        >
		        <div className="col-md-12">
			        <div className="containerTitle containerBlockTitle"><span>*</span> Parameters
				        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
			        </div>
		        </div>
		        <div className="col-md-5 myColumn">
			        <div className="form-group">
				        <input
					        className="form-group__input-text form-control"
					        id="cpu"
					        type="text"
					        pattern="[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*"
					        required title="error"
					        value={this.props.item.resources.requests.cpu}
					        onChange={(e) => {
						        this.props.onChangeInputParameters({
							        cpu: e.target.value,
							        index: this.props.index - 1
						        });
						        if (e.target.value.length === 0) {
							        document.getElementById(`cpu-name-form-group__label${this.props.index}`).classList.remove('form-group__label-always-onfocus');
						        } else {
							        document.getElementById(`cpu-name-form-group__label${this.props.index}`).classList.add('form-group__label-always-onfocus');
						        }
					        }}
				        />
				        <label
					        className="form-group__label"
					        id={`cpu-name-form-group__label${this.props.index}`}
					        htmlFor="cpu"
				        >CPU</label>
				        <div className="form-group__helper helperText">Example: 0,3 or 300m<br /><a href="">Documentation…</a></div>
			        </div>
		        </div>

		        <div className="col-md-5 myColumn">
			        <div className="form-group">
				        <input
					        className="form-group__input-text form-control"
					        id="ram"
					        type="text"
					        required
					        value={this.props.item.resources.requests.memory}
					        onChange={(e) => {
						        this.props.onChangeInputParameters({
							        memory: e.target.value,
							        index: this.props.index - 1
						        });
						        if (e.target.value.length === 0) {
							        document.getElementById(`ram-name-form-group__label${this.props.index}`).classList.remove('form-group__label-always-onfocus');
						        } else {
							        document.getElementById(`ram-name-form-group__label${this.props.index}`).classList.add('form-group__label-always-onfocus');
						        }
					        }}
				        />
				        <label
					        className="form-group__label"
					        htmlFor="ram"
					        id={`ram-name-form-group__label${this.props.index}`}
				        >RAM</label>
				        <div className="form-group__helper helperText">Example: 0,5Gi or 512Mi or 512<br /><a href="">Documentation…</a></div>
			        </div>
		        </div>
	        </div>
        );
    }
}

Parameters.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object.isRequired,
	onChangeInputParameters: PropTypes.func.isRequired
};

export default Parameters;
