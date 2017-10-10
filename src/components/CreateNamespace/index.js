import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';
import { getNSTariffs } from '../../actions/NamespacesActions/getNSTariffsAction';
import { createNamespace } from '../../actions/NamespaceActions/createNamespaceAction';

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
        const regexp = /^[a-zA-Z0-9-]+$/;
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
                                        const memory = item.memory_limit / 1000;
                                        const traffic = item.traffic;
                                        const price = item.price === 0 && item.label === "free" ? 'free' : `$${item.price}`;
                                        const label = item.label;
                                        return (
                                            <div className="col-md-3" key={index}>
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
                                                                    <div className="content-block__info-name inline">Trafic : </div>
                                                                    <div className="content-block__info-text inline">{traffic} TB</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            {/*<div className="col-md-3">*/}
                            {/*<div className="namespace-plan-block-container hover-action-new">*/}
                            {/*<div className="row">*/}
                            {/*<div className="col-md-6 namespace-plan-block-container-left">*/}
                            {/*<div className="namespace-plan-block-price">$999</div>*/}
                            {/*<div className="namespace-plan-block-month">per month</div>*/}
                            {/*</div>*/}
                            {/*<div className="col-md-6 namespace-plan-block-container-right">*/}
                            {/*<div className="content-block-content card-block">*/}
                            {/*<div className="content-block__info-item ">*/}
                            {/*<div className="content-block__info-name inline">RAM : </div>*/}
                            {/*<div className="content-block__info-text inline">32 GB</div>*/}
                            {/*</div>*/}
                            {/*<div className="content-block__info-item">*/}
                            {/*<div className="content-block__info-name inline">CPU : </div>*/}
                            {/*<div className="content-block__info-text inline">4</div>*/}
                            {/*</div>*/}
                            {/*<div className="content-block__info-item">*/}
                            {/*<div className="content-block__info-name inline">Trafic : </div>*/}
                            {/*<div className="content-block__info-text inline">10 TB</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}

                            {/*<div className="col-md-3">*/}
                            {/*<div className="namespace-plan-block-container hover-action-new disabled">*/}
                            {/*<div className="row">*/}
                            {/*<div className="col-md-6 namespace-plan-block-container-left">*/}
                            {/*<div className="namespace-plan-block-price">Free</div>*/}
                            {/*</div>*/}
                            {/*<div className="col-md-6 namespace-plan-block-container-right">*/}
                            {/*<div className="content-block-content card-block">*/}
                            {/*<div className="content-block__info-item ">*/}
                            {/*<div className="content-block__info-name inline">RAM : </div>*/}
                            {/*<div className="content-block__info-text inline">32 GB</div>*/}
                            {/*</div>*/}
                            {/*<div className="content-block__info-item">*/}
                            {/*<div className="content-block__info-name inline">CPU : </div>*/}
                            {/*<div className="content-block__info-text inline">4</div>*/}
                            {/*</div>*/}
                            {/*<div className="content-block__info-item">*/}
                            {/*<div className="content-block__info-name inline">Trafic : </div>*/}
                            {/*<div className="content-block__info-text inline">10 TB</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}

                            {/*<div className="col-md-3">*/}
                            {/*<div className="namespace-plan-block-container hover-action-new disabled">*/}
                            {/*<div className="row">*/}
                            {/*<div className="col-md-6 namespace-plan-block-container-left">*/}
                            {/*<div className="namespace-plan-block-waiting">coming<br />soon</div>*/}
                            {/*</div>*/}
                            {/*<div className="col-md-6 namespace-plan-block-container-right">*/}
                            {/*<div className="content-block-content card-block">*/}
                            {/*<div className="content-block__info-item ">*/}
                            {/*<div className="content-block__info-name inline">RAM : </div>*/}
                            {/*<div className="content-block__info-text inline">32 GB</div>*/}
                            {/*</div>*/}
                            {/*<div className="content-block__info-item">*/}
                            {/*<div className="content-block__info-name inline">CPU : </div>*/}
                            {/*<div className="content-block__info-text inline">4</div>*/}
                            {/*</div>*/}
                            {/*<div className="content-block__info-item">*/}
                            {/*<div className="content-block__info-name inline">Trafic : </div>*/}
                            {/*<div className="content-block__info-text inline">10 TB</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}

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
                        </div>
                    </div>
                </div>;
        } else {
            isFetchingNSTariffs = <Spinner />;
        }
        return (
            <div>
                { isFetchingNSTariffs }
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
