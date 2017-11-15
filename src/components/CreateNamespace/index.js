import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';
import Notification from '../Notification';
import CreateModal from '../CustomerModal/CreateModal';
import { getNamespaces } from '../../actions/NamespacesActions';
import { getNSTariffs } from '../../actions/NamespacesActions/getNSTariffsAction';
import { createNamespace } from '../../actions/NamespaceActions/createNamespaceAction';
import 'rc-tooltip/assets/bootstrap_white.css';

class CreateNamespace extends Component {
    constructor() {
        super();
        this.state = {
            isOpened: false,
            NSTariffName: '',
            NSTariffCpu: '',
            NSTariffMemory: '',
            NSTariffTraffic: '',
            NSTariffPrice: '',
            NSTariffPricePerDay: ''
        };
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.CreateNamespaceReducer.isFetching);
        if(nextProps.CreateNamespaceReducer.isFetching !== this.props.CreateNamespaceReducer.isFetching) {
            this.setState({
                ...this.state,
                isOpened: false
            });
        }
    }
    componentDidMount() {
        if (!this.props.NSTariffsReducer.data.length) {
            this.props.onGetNSTariffs();
        }
        if (!this.props.NamespacesReducer.data.length) {
            this.props.onGetNamespaces();
        }
    }
    handleClickTriff(label, cpu, memory, traffic, price, pricePerDay) {
        this.setState({
            ...this.state,
            isOpened: true,
            NSTariffName: label,
            NSTariffCpu: cpu,
            NSTariffMemory: memory,
            NSTariffTraffic: traffic,
            NSTariffPrice: price,
            NSTariffPricePerDay: pricePerDay
        });
    }
    render() {
        let haveFreeTariff = false;
        this.props.NamespacesReducer.data.map(item => {
            if (item.tariff === 'trial') {
                haveFreeTariff = true;
            }
        });
        let isFetchingNSTariffs = '';
        if (this.props.NSTariffsReducer.isFetching === false &&
            this.props.NamespacesReducer.isFetching === false) {
            isFetchingNSTariffs =
                <div className="content-block">
                    <div className="content-block-container container no-back mt-0 no-padding">
                        <div className="content-block-content mt-0">

                            <div className="namespace-plan mt-0">
                                <div className="namespace-plan-title">choose a namespace size</div>
                                {/*<div className="namespace-plan-content">Assign this Namespace an identifying name.*/}
                                    {/*Namespace name can only contain alphanumeric characters and dashes.</div>*/}
                            </div>

                            <div className="row">
                                {
                                    this.props.NSTariffsReducer.data.map((item, index) => {
                                        // console.log(item);
                                        const cpu = item.cpu_limit / 1000;
                                        const memory = item.memory_limit / 1024;
                                        const traffic = item.traffic ? item.traffic / 1024 : item.traffic;
                                        const price = item.price === 0 && item.label === 'trial' ? 'trial' : `$${item.price}`;
                                        const pricePerDay = item.price === 0 && item.label === 'trial' ? '30 days left' :
                                            `$${(item.price / 30).toFixed(2)} daily`;
                                        const label = item.label;
                                        return (
                                            <div className="col-md-3" key={index}>
                                                {/*<Tooltip*/}
                                                    {/*placement="top"*/}
                                                    {/*trigger={['click']}*/}
                                                    {/*overlay={<a href="#bottom">Enter the name</a>}*/}
                                                {/*>*/}
                                                    <div
                                                        id={label}
                                                        className={
                                                            haveFreeTariff && price === 'trial' ?
                                                                "namespace-plan-block-container hover-action-new disabled" :
                                                                label !== this.state.NSTariffName ?
                                                                    "namespace-plan-block-container hover-action-new" :
                                                                    "namespace-plan-block-container hover-action-new selected"
                                                        }
                                                        onClick={() => {
                                                            if (!(haveFreeTariff && price === 'trial')) {
                                                                this.handleClickTriff(label, cpu, memory, traffic, price, pricePerDay)
                                                            }
                                                        }}
                                                    >
                                                        <div className="row">
                                                            <div className={price === '$2' ? "col-md-6 namespace-plan-block-container-left namespace-plan-block2dollars" : "col-md-6 namespace-plan-block-container-left"}>
                                                                <div className="namespace-plan-block-price">{price}{price !== 'trial' ? <span className="namespace-plan-span-price">/mo</span>: ''}</div>
                                                                {
                                                                    item.price === 0 && item.label === "trial" ?
                                                                        '' : <div className="namespace-plan-block-month">{pricePerDay}</div>
                                                                }
                                                            </div>
                                                            <div className="col-md-6 namespace-plan-block-container-right">
                                                                <div className={price === '$2' ? "content-block-content card-block card-block2dollars" : "content-block-content card-block"}>
                                                                    <div className="content-block__info-item">
                                                                        <div className="content-block__info-name inline">RAM : </div>
                                                                        <div className="content-block__info-text inline">{memory} GB</div>
                                                                    </div>
                                                                    <div className="content-block__info-item">
                                                                        <div className="content-block__info-name inline">CPU : </div>
                                                                        <div className="content-block__info-text inline">{cpu}</div>
                                                                    </div>
                                                                    {/*<div className="content-block__info-item">*/}
                                                                        {/*<div className="content-block__info-name inline">Traffic : </div>*/}
                                                                        {/*<div className="content-block__info-text inline">{traffic} TB</div>*/}
                                                                    {/*</div>*/}
                                                                    {
                                                                        price !== '$2' ?
                                                                            <div className="content-block__info-item">
                                                                                <div className="content-block__info-name inline">Volume : </div>
                                                                                <div className="content-block__info-text inline">5 GB</div>
                                                                            </div> : ''
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                {/*</Tooltip>*/}
                                            </div>
                                        )
                                    })
                                }
                            </div>
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
                <CreateModal
                    type="Namespace"
                    tariff={this.state.NSTariffName}
                    data={{
                        cpu: this.state.NSTariffCpu,
                        memory: this.state.NSTariffMemory,
                        traffic: this.state.NSTariffTraffic,
                        price: this.state.NSTariffPrice,
                        pricePerDay: this.state.NSTariffPricePerDay,
                    }}
                    isOpened={this.state.isOpened}
                    onHandleCreate={this.props.onCreateNamespace}
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
    CreateNamespaceReducer: PropTypes.object,
    NamespacesReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        NSTariffsReducer: state.NSTariffsReducer,
        CreateNamespaceReducer: state.CreateNamespaceReducer,
        NamespacesReducer: state.NamespacesReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetNSTariffs: () => {
            dispatch(getNSTariffs());
        },
        onCreateNamespace: (inputNSName, NSTariffName) => {
            dispatch(createNamespace(inputNSName, NSTariffName));
        },
        onGetNamespaces: () => {
            dispatch(getNamespaces());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNamespace);
