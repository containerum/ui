import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Container extends Component {
    render() {
        return (
	        <div className="blockContainer blockAddContainerPadin">
		        <div className="col-md-12">
			        <div className="containerTitle marLeft20">Container 1
				        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
			        </div>
			        <div className="row rowLine">
				        <div className="col-md-7">
					        <div className="containerTitle containerBlockTitle"><span>*</span> Common
						        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
					        </div>
					        <div className="has-float-label marBot40">
						        <input className="form-control customInput" id="text4" type="text" placeholder=" " />
						        <label className="customLabel" htmlFor="text4">Container Name</label>
						        <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
					        </div>
					        <div className="has-float-label">
						        <input className="form-control customInput" id="text5" type="text" placeholder=" " />
						        <label className="customLabel" htmlFor="text5">Docker Image</label>
						        <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
					        </div>
				        </div>
			        </div>

			        <div className="row rowLine">
				        <div className="col-md-12">
					        <div className="containerTitle containerBlockTitle"><span>*</span> Parameters
						        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
					        </div>
				        </div>
				        <div className="col-md-5 myColumn">
					        <div className="has-float-label">
						        <input className="form-control customInput" id="text6" type="text" placeholder=" " />
						        <label className="customLabel" htmlFor="text6">CPU</label>
						        <div className="helperText">Example: 0,3 or 300m<br /><a href="">Documentation…</a></div>
					        </div>
				        </div>
				        <div className="col-md-5 myColumn">
					        <div className="has-float-label">
						        <input className="form-control customInput" id="text7" type="text" placeholder=" " />
						        <label className="customLabel" htmlFor="text7">RAM</label>
						        <div className="helperText">Example: 0,5Gi or 512Mi or 512<br /><a href="">Documentation…</a></div>
					        </div>
				        </div>
			        </div>

			        <div className="row rowLine">
				        <div className="col-md-12">
					        <div className="containerTitle containerBlockTitle">Image Ports
						        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
					        </div>
				        </div>
				        <div className="col-md-5 myColumn">
					        <div className="has-float-label">
						        <input className="form-control customInput" id="text8" type="text" placeholder=" " />
						        <label className="customLabel" htmlFor="text8">Port</label>
						        <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
					        </div>
				        </div>
				        <div className="col-md-5 myColumn">
					        <div className="has-float-label">
						        <input className="form-control customInput" id="text9" type="text" placeholder=" " />
						        <label className="customLabel" htmlFor="text9">Target Port</label>
						        <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
					        </div>
				        </div>

				        <div className="col-md-12">
					        <div className="addBlockBtn marLeft">+ Add Image Port</div>
				        </div>
			        </div>

			        <div className="row rowLine">
				        <div className="col-md-12">
					        <div className="containerTitle containerBlockTitle">Commands
						        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
					        </div>
				        </div>
				        <div className="col-md-11">
					        <div className="has-float-label">
						        <input className="form-control customInput" id="text10" type="text" placeholder=" " />
						        <label className="customLabel" htmlFor="text10">Port</label>
						        <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
					        </div>
				        </div>
			        </div>
			        <div className="row rowLine">
				        <div className="col-md-12">
					        <div className="containerTitle containerBlockTitle">Enviroments
						        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
					        </div>
				        </div>
				        <div className="col-md-5 myColumn">
					        <div className="has-float-label">
						        <input className="form-control customInput" id="text11" type="text" placeholder=" " />
						        <label className="customLabel" htmlFor="text11">Key</label>
						        <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
					        </div>
				        </div>
				        <div className="col-md-5 myColumn">
					        <div className="has-float-label">
						        <input className="form-control customInput" id="text12" type="text" placeholder=" " />
						        <label className="customLabel" htmlFor="text12">Value</label>
						        <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
					        </div>
				        </div>

				        <div className="col-md-12">
					        <div className="addBlockBtn marLeft">+ Add Enviroment</div>
				        </div>
			        </div>

			        <div className="row rowLine">
				        <div className="col-md-12">
					        <div className="containerTitle containerBlockTitle">Volume
						        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
					        </div>
				        </div>

				        <div className="col-md-4 myCol31">
					        <div className="select-wrapper">
						        <div className="select-arrow-3"></div>
						        <div className="select-arrow-3"></div>
						        <select className="selectCustom">
							        <option value="">Name_volume</option>
							        <option value="">Option</option>
						        </select>
					        </div>
					        <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
				        </div>

				        <div className="col-md-4 myCol31">
					        <div className="has-float-label inputSubpath">
						        <span className="inputSubpathSign">/</span>
						        <input className="form-control customInput" id="text13" type="text" placeholder=" " />
						        <label className="customLabel" htmlFor="text13">Subpath</label>
					        </div>
				        </div>

				        <div className="col-md-4 myCol31 marLeftt10">
					        <div className="has-float-label">
						        <input className="form-control customInput" id="text14" type="text" placeholder=" " />
						        <label className="customLabel" htmlFor="text14">Path</label>
					        </div>
				        </div>

				        <div className="col-md-12">
					        <div className="addBlockBtn marLeft">+ Add Volume</div>
				        </div>
			        </div>

			        <div className="addBlockBtn addBlockBtnBig text-md-center">+ Add container</div>

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

export default Container;
