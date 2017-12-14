import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import icon from '../../../images/icon-create-dep.svg';

class Label extends Component {
    render() {
        return (
	        <div className="blockContainer blockContainerPadin" id="labels">
		        <div className="col-md-12">
			        <div className="containerTitle"><span>*</span> Label
				        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
			        </div>
			        <div className="containerSubTitle">Enter Labels</div>
		        </div>
		        <div className="row marLeft">
			        <div className="col-md-5 myColumn">
				        <div className="has-float-label">
					        <input className="form-control customInput" id="text1" type="text" placeholder=" " />
					        <label className="customLabel" htmlFor="text1">Key</label>
					        <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
				        </div>
			        </div>
			        <div className="col-md-5 myColumn">
				        <div className="has-float-label">
					        <input className="form-control customInput" id="text2" type="text" placeholder=" " />
					        <label className="customLabel" htmlFor="text2">Label</label>
					        <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
				        </div>
			        </div>
			        <div className="col-md-1">
				        <img src={icon} alt="" />
			        </div>
		        </div>

		        <div className="addBlockBtn">+ Add label</div>
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

export default Label;
