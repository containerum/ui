import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';

import Spinner from '../Spinner';
import Notification from '../Notification';
import { getNSTariffs } from '../../actions/NamespacesActions/getNSTariffsAction';
import { updateNamespace } from '../../actions/NamespaceActions/updateNamespaceAction';
import { getNamespace } from '../../actions/NamespaceActions/getNamespaceAction';
import 'rc-tooltip/assets/bootstrap_white.css';

class UpdateNamespace extends Component {
    constructor() {
        super();
        this.state = {
            NSTariffName: ''
        };
    }
    componentDidMount() {
        this.props.onGetNamespace(this.props.params.idName);
        if (!this.props.NSTariffsReducer.data.length) {
            this.props.onGetNSTariffs();
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
        if (this.state.NSTariffName) {
            this.props.onUpdateNamespace(this.props.params.idName, this.state.NSTariffName);
        }
    }
    render() {
        // console.log(this.props.UpdateNamespaceReducer);
        let isFetchingNSTariffs = '';
        if (this.props.NSTariffsReducer.isFetching === false) {
            const active = this.props.GetNamespaceReducer.data.tariff;
            const arrayTariff = this.props.NSTariffsReducer.data;
            // let notActiveItems = [];
            // let ActiveItems = [];
            // arrayTariff.map((item, index) => {
            //     if (arrayTariff[index].label === active) {
            //         notActiveItems = arrayTariff.slice(0, index + 1);
            //         ActiveItems = arrayTariff.slice(index + 1);
            //     } else {
            //         notActiveItems = arrayTariff.slice(0, 1);
            //         ActiveItems = arrayTariff.slice(1);
            //     }
            // });
            isFetchingNSTariffs =
                <div className="content-block">
                    <div className="content-block-container container no-back mt-0 no-padding">
                        <div className="content-block-content mt-0">

                            <div className="namespace-plan mt-0">
                                <div className="namespace-plan-first-step">{this.props.params.idName}</div>
                                <div className="namespace-plan-title">choose a namespace plan</div>
                            </div>

                            <div className="row">
                                {
                                    arrayTariff.map((item, index) => {
                                        const cpu = item.cpu_limit / 1000;
                                        const memory = item.memory_limit / 1024;
                                        const traffic = item.traffic ? item.traffic / 1024 : item.traffic;
                                        const price = item.price === 0 && item.label === 'free' ? 'free' : `$${item.price}`;
                                        const label = item.label;
                                        const isActiveTariff = label === active;
                                        const isFreeNotActive = active !== 'free';
                                        return (
                                            <div className="col-md-3" key={index}>
                                                <Tooltip
                                                    placement="top"
                                                    trigger={['hover']}
                                                    overlay={<span>Current Namespace size</span>}
                                                    overlayClassName={isActiveTariff ? '' : 'display-none'}
                                                >
                                                <div
                                                    id={label}
                                                    className={
                                                        isActiveTariff || isFreeNotActive && item.label === 'free' ?
                                                            "namespace-plan-block-container hover-action-new disabled" :
                                                        label !== this.state.NSTariffName ?
                                                            "namespace-plan-block-container hover-action-new" :
                                                            "namespace-plan-block-container hover-action-new selected"
                                                    }
                                                    onClick={() => {
                                                        if (!isActiveTariff && item.label !== 'free') {
                                                            // console.log(isActiveTariff, item.label !== 'free');
                                                            this.handleClickTriff(label)
                                                        }
                                                    }}
                                                >
                                                    <div className="row">
                                                        <div className="col-md-6 namespace-plan-block-container-left">
                                                            <div className="namespace-plan-block-price">{isActiveTariff ? 'Active' : price}</div>
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
                            <form
                                className="col-md-6 namespace-plan"
                                onSubmit={this.handleSubmitNSTariffs.bind(this)}
                            >
                                <button
                                    className="btn namespace-plan-create-btn"
                                    type="submit"
                                >Resize</button>
                            </form>
                        </div>
                    </div>
                </div>;
        } else {
            isFetchingNSTariffs = <Spinner />;
        }
        let isFetchingCreateNS = '';
        if (this.props.UpdateNamespaceReducer.isFetching) {
            isFetchingCreateNS = <Spinner />;
        }
        return (
            <div>
                <Notification
                    status={this.props.UpdateNamespaceReducer.status}
                    name={this.props.UpdateNamespaceReducer.idName}
                    errorMessage={this.props.UpdateNamespaceReducer.errorMessage}
                />
                { isFetchingNSTariffs }
                { isFetchingCreateNS }
            </div>
        );
    }
}

UpdateNamespace.propTypes = {
    onGetNSTariffs: PropTypes.func.isRequired,
    NSTariffsReducer: PropTypes.object,
    UpdateNamespaceReducer: PropTypes.object,
    GetNamespaceReducer: PropTypes.object,
    params: PropTypes.object
};

function mapStateToProps(state) {
    return {
        NSTariffsReducer: state.NSTariffsReducer,
        UpdateNamespaceReducer: state.UpdateNamespaceReducer,
        GetNamespaceReducer: state.GetNamespaceReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetNSTariffs: () => {
            dispatch(getNSTariffs());
        },
        onUpdateNamespace: (inputNSName, NSTariffName) => {
            dispatch(updateNamespace(inputNSName, NSTariffName));
        },
        onGetNamespace: (NSTariffName) => {
            dispatch(getNamespace(NSTariffName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNamespace);
