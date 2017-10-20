import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import ScrollableAnchor from 'react-scrollable-anchor';

import Spinner from '../Spinner';
import Notification from '../Notification';
import { getNSTariffs } from '../../actions/NamespacesActions/getNSTariffsAction';
import { createNamespace } from '../../actions/NamespaceActions/createNamespaceAction';
import 'rc-tooltip/assets/bootstrap_white.css';

class CreateNamespace extends Component {
    constructor() {
        super();
        this.state = {
            NSTariffName: '',
            inputNSName: ''
        };
    }
    componentDidMount() {
        if (!this.props.NSTariffsReducer.data.length) {
            this.props.onGetNSTariffs();
        }
    }
    handleChangeInput(e) {
        const regexp = /^[a-z][a-z0-9-]*$|^$/;
        const inputValue = e.target.value.trim();
        if (inputValue.search(regexp) !== -1) {
            this.setState({
                ...this.state,
                inputNSName: inputValue
            });
        }
    }
    handleClickTriff(label) {
        this.setState({
            ...this.state,
            NSTariffName: label
        });
    }
    handleSubmitNSTariffs(e) {
        e.preventDefault();
        if (this.state.NSTariffName && this.state.inputNSName.length >= 2) {
            this.props.onCreateNamespace(this.state.inputNSName, this.state.NSTariffName);
            // console.log(this.state.NSTariffName, this.state.inputNSName)
        }
    }
    render() {
        // console.log(this.props.NSTariffsReducer);
        // console.log(this.props.CreateNamespaceReducer);
        let isFetchingNSTariffs = '';
        if (this.props.NSTariffsReducer.isFetching === false) {
            isFetchingNSTariffs =
                <div className="content-block">
                    <div className="content-block-container container no-back mt-0 no-padding">
                        <div className="content-block-content mt-0">

                            <div className="namespace-plan mt-0">
                                <div className="namespace-plan-first-step">1 / 2</div>
                                <div className="namespace-plan-title">choose a namespace plan</div>
                            </div>

                            <div className="row">
                                {
                                    this.props.NSTariffsReducer.data.map((item, index) => {
                                        // console.log(item);
                                        const cpu = item.cpu_limit / 1000;
                                        const memory = item.memory_limit / 1024;
                                        const traffic = item.traffic ? item.traffic / 1024 : item.traffic;
                                        const price = item.price === 0 && item.label === "free" ? 'free' : `$${item.price}`;
                                        const label = item.label;
                                        return (
                                            <div className="col-md-3" key={index}>
                                                <Tooltip
                                                    placement="top"
                                                    trigger={['click']}
                                                    overlay={<a href="#bottom">Enter the name</a>}
                                                >
                                                    <div
                                                        id={label}
                                                        className={label === this.state.NSTariffName ?
                                                            "namespace-plan-block-container hover-action-new selected" :
                                                            "namespace-plan-block-container hover-action-new"}
                                                        onClick={labelName => this.handleClickTriff(label)}
                                                    >
                                                        <div className="row">
                                                            <div className="col-md-6 namespace-plan-block-container-left">
                                                                <div className="namespace-plan-block-price">{price}</div>
                                                            </div>
                                                            <div className="col-md-6 namespace-plan-block-container-right">
                                                                <div className="content-block-content card-block">
                                                                    <div className="content-block__info-item">
                                                                        <div className="content-block__info-name inline">RAM : </div>
                                                                        <div className="content-block__info-text inline">{memory} GB</div>
                                                                    </div>
                                                                    <div className="content-block__info-item">
                                                                        <div className="content-block__info-name inline">CPU : </div>
                                                                        <div className="content-block__info-text inline">{cpu}</div>
                                                                    </div>
                                                                    <div className="content-block__info-item">
                                                                        <div className="content-block__info-name inline">Traffic : </div>
                                                                        <div className="content-block__info-text inline">{traffic} TB</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tooltip>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <ScrollableAnchor id={'bottom'}>
                                <form
                                    className="col-md-6 namespace-plan"
                                    onSubmit={this.handleSubmitNSTariffs.bind(this)}
                                >
                                    <div className="namespace-plan-first-step">2 / 2</div>
                                    <div className="namespace-plan-title">choose a Name</div>
                                    <div className="namespace-plan-info">Assign this Namespace an identifying name.
                                        Namespace name can only contain alphanumeric characters and dashes.</div>
                                    <input
                                        type="text"
                                        className="form-control namespace-plan-input"
                                        name="name"
                                        placeholder="Name"
                                        value={this.state.inputNSName}
                                        onChange={this.handleChangeInput.bind(this)}
                                    />
                                    <button
                                        className="btn namespace-plan-create-btn"
                                        type="submit"
                                    >Create</button>
                                </form>
                            </ScrollableAnchor>
                        </div>
                    </div>
                </div>;
        } else {
            isFetchingNSTariffs = <Spinner />;
        }
        let isFetchingCreateNS = '';
        if (this.props.CreateNamespaceReducer.isFetching) {
            isFetchingCreateNS = <Spinner />;
        }
        return (
            <div>
                <Notification
                    status={this.props.CreateNamespaceReducer.status}
                    name={this.props.CreateNamespaceReducer.idName}
                    errorMessage={this.props.CreateNamespaceReducer.errorMessage}
                />
                { isFetchingNSTariffs }
                { isFetchingCreateNS }
            </div>
        );
    }
}

CreateNamespace.propTypes = {
    onGetNSTariffs: PropTypes.func.isRequired,
    NSTariffsReducer: PropTypes.object,
    CreateNamespaceReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        NSTariffsReducer: state.NSTariffsReducer,
        CreateNamespaceReducer: state.CreateNamespaceReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetNSTariffs: () => {
            dispatch(getNSTariffs());
        },
        onCreateNamespace: (inputNSName, NSTariffName) => {
            dispatch(createNamespace(inputNSName, NSTariffName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNamespace);
