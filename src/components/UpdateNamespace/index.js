import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';

import Spinner from '../Spinner';
import Notification from '../Notification';
import { getNSTariffs } from '../../actions/NamespacesActions/getNSTariffsAction';
import { updateNamespace } from '../../actions/NamespaceActions/updateNamespaceAction';
import 'rc-tooltip/assets/bootstrap_white.css';

class UpdateNamespace extends Component {
    constructor() {
        super();
        this.state = {
            NSTariffName: ''
        };
    }
    componentDidMount() {
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
        // this.props.onUpdateNamespace(this.state.inputNSName, this.state.NSTariffName);
        console.log(this.state.NSTariffName)
    }
    render() {
        console.log(this.props.params);
        // console.log(this.props.UpdateNamespaceReducer);
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
    UpdateNamespaceReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        NSTariffsReducer: state.NSTariffsReducer,
        UpdateNamespaceReducer: state.UpdateNamespaceReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetNSTariffs: () => {
            dispatch(getNSTariffs());
        },
        onUpdateNamespace: (inputNSName, NSTariffName) => {
            dispatch(updateNamespace(inputNSName, NSTariffName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNamespace);
