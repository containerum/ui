import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

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
				        <input className="form-control customInput" id="text" type="text" placeholder=" " />
				        <label className="customLabel" htmlFor="text">Name</label>
				        <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
			        </div>
		        </div>
	        </div>
        );
    }
}

// CreateDeployment.propTypes = {
//     onCreateDeployment: PropTypes.func.isRequired
// };
//
// function mapStateToProps(state) {
//     return {
//         CreateDeploymentReducer: state.CreateDeploymentReducer
//     };
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         onCreateDeployment: (idName, name) => {
//             dispatch(createDeployment(idName, name));
//         }
//     };
// };

export default Name;
