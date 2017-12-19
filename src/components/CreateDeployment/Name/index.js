import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Name extends Component {
    render() {
        return (
	        <div className="blockContainer blockContainerPadin" id="name">
		        <div className="col-md-7">
			        <div className="containerTitle"><span>*</span> Name
				        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
			        </div>
			        <div className="containerSubTitle">Enter Deployment name</div>
			        <div className="has-float-label">
				        <input
					        className="form-control
					        customInput"
					        id="text"
					        type="text"
					        placeholder=" "
					        onChange={(e) => (this.props.onChangeInputName(e.target.value))}
				        />
				        <label className="customLabel" htmlFor="text">Name</label>
				        <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
			        </div>
		        </div>
	        </div>
        );
    }
}

Name.propTypes = {
	onChangeInputName: PropTypes.func.isRequired
};

export default Name;
