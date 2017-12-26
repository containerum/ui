import React, { Component } from 'react';
import PropTypes from "prop-types";
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Replicas extends Component {
    render() {
        return (
	        <div className="blockContainer blockContainerPadin" id="replicas">
		        <div className="col-md-7">
			        <div className="containerTitle"><span>*</span> Replicas
				        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
			        </div>
			        <div className="containerSubTitle">Enter Replicas count</div>
			        <div className="form-group">
				        <input
					        className="form-group__input-text form-control"
					        id="replica"
					        value={this.props.value}
					        type="number"
					        required
					        min="1"
					        max="15"
					        onChange={(e) => (this.props.onChangeInputReplicas(e.target.value))}
				        />
				        <label className="form-group__label" htmlFor="replica">Count</label>
				        <div className="form-group__helper">Max 15 replicas</div>
			        </div>
		        </div>
	        </div>
        );
    }
}

Replicas.propTypes = {
	onChangeInputReplicas: PropTypes.func.isRequired,
	value: PropTypes.string
};

export default Replicas;
