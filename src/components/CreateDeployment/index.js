import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createDeployment } from '../../actions/CreateDeploymentActions';
import icon from '../../images/icon-create-dep.svg';
import icon2 from '../../images/icon2-create-dep.svg';

class CreateDeployment extends Component {
    // componentDidMount() {
    // }
    handleSubmitDeployment() {
        this.props.onCreateDeployment(this.props.params.idName, 'python');
    }
    render() {
        return (
            <div className="content-block">
                <div className="container no-back">
                    <div className="row pageWidth">
                        <div className="col-md-3 sideMenu">
                            <div className="sideMenuHeader">name</div>
                            <div className="sideMenuHeader">labels</div>
                            <div className="sideMenuHeader">replicas</div>
                            <div className="sideMenuHeader">Container 1</div>
                            <ul className="nav flex-column">
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Info</a></li>
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Parameters</a></li>
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Image Ports</a></li>
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Commands</a></li>
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Enviroments</a></li>
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Volume</a></li>
                            </ul>

                            <div className="sideMenuHeader">Container 2</div>
                            <ul className="nav flex-column">
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Info</a></li>
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Parameters</a></li>
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Image Ports</a></li>
                                <li className="nav-item"><a className="nav-link sideMenuItem active" href="#">Commands</a></li>
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Enviroments</a></li>
                                <li className="nav-item"><a className="nav-link sideMenuItem" href="#">Volume</a></li>
                            </ul>
                            <div className="sideMenuHeader">Linked Services</div>
                            <ul className="nav flex-column linkedMenu"></ul>
                        </div>
                        <div className="col-md-9 pageContent">
                            <div className="blockContainer blockContainerPadin">
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

                            <div className="blockContainer blockContainerPadin">
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

                            <div className="blockContainer blockContainerPadin">
                                <div className="col-md-7">
                                    <div className="containerTitle"><span>*</span> Replicas
                                        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
                                    </div>
                                    <div className="containerSubTitle">Enter Replicas count</div>
                                    <div className="has-float-label">
                                        <input className="form-control customInput" id="text3" type="number" placeholder=" " />
                                        <label className="customLabel" htmlFor="text3">Count</label>
                                        <div className="helperText">Max 15 replicas</div>
                                    </div>
                                </div>
                            </div>

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

                            <div className="addBlockBtn addBlockBtnBig btnTooltipContainer linkedServBtn">+ Add Linked Services
                                <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
                            </div>
                            <img src={icon2} alt="" />

                            <div className="linkedServicesWrapper serviceWrapperOff">
                                <div className="blockContainer blockContainerPadin">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <div className="containerTitle marLeft20">Internal Service
                                                <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="serviceSwitcher serviceSwitcherOn"></div>
                                        </div>
                                    </div>

                                    <div className="serviceWrapper">
                                        <div className="row rowLine">
                                            <div className="col-md-6">
                                                <div className="has-float-label marTop40">
                                                    <input className="form-control customInput" id="text15" type="text" placeholder=" " />
                                                    <label className="customLabel" htmlFor="text15">* Service Name</label>
                                                    <div className="helperText">Your Internal Name is the same as the name of Deployment</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row rowWithoutLine">
                                            <div className="col-md-12">
                                                <div className="containerTitle containerBlockTitle"><span>*</span> Ports
                                                    <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="has-float-label">
                                                    <input className="form-control customInput" id="text16" type="text" placeholder=" " />
                                                    <label className="customLabel" htmlFor="text16">Port</label>
                                                    <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="has-float-label">
                                                    <input className="form-control customInput" id="text17" type="text" placeholder=" " />
                                                    <label className="customLabel" htmlFor="text17">Target Port</label>
                                                    <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="select-wrapper">
                                                    <div className="select-arrow-3"></div>
                                                    <div className="select-arrow-3"></div>
                                                    <select className="selectCustom">
                                                        <option value="">TCP</option>
                                                        <option value="">Option</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="addBlockBtn marLeft">+ Add Port</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="blockContainer blockContainerPadin">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <div className="containerTitle marLeft20">External Service
                                                <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="serviceSwitcher"></div>
                                        </div>
                                    </div>

                                    <div className="serviceWrapper serviceWrapperOff">
                                        <div className="row rowLine">
                                            <div className="col-md-6">
                                                <div className="has-float-label marTop40">
                                                    <input className="form-control customInput" id="text18" type="text" placeholder=" " />
                                                    <label className="customLabel" htmlFor="text18">* Service Name</label>
                                                    <div className="helperText">Your Internal Name is the same as the name of Deployment with «… ext-service» index</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row rowWithoutLine">
                                            <div className="col-md-12">
                                                <div className="containerTitle containerBlockTitle"><span>*</span> Ports
                                                    <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="has-float-label">
                                                    <input className="form-control customInput" id="text19" type="text" placeholder=" " />
                                                    <label className="customLabel" htmlFor="text19">Port</label>
                                                    <div className="helperText">Your Deployment name can only contain alphanumeric and characters</div>
                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="select-wrapper">
                                                    <div className="select-arrow-3"></div>
                                                    <div className="select-arrow-3"></div>
                                                    <select className="selectCustom">
                                                        <option value="">UDP</option>
                                                        <option value="">Option</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="addBlockBtn marLeft">+ Add Port</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="btnDeployment"
                                onClick={this.handleSubmitDeployment.bind(this)}
                            >Create deployment</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateDeployment.propTypes = {
    onCreateDeployment: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        CreateDeploymentReducer: state.CreateDeploymentReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateDeployment: (idName, name) => {
            dispatch(createDeployment(idName, name));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeployment);
