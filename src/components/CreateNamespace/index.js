import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

// import Spinner from '../Spinner';
import Notification from '../Notification';
import CreateModal from '../CustomerModal/CreateModal';
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
	        NSTariffVolume: '',
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
        ReactGA.event({
            category: 'UI',
            action: 'UI_create_NS'
        });
    }
    handleClickTriff(label, cpu, memory, volume, price, pricePerDay) {
        this.setState({
            ...this.state,
            isOpened: true,
            NSTariffName: label,
            NSTariffCpu: cpu,
            NSTariffMemory: memory,
            NSTariffVolume: volume,
            NSTariffPrice: price,
            NSTariffPricePerDay: pricePerDay
        });
    }
    render() {
        let isFetchingNSTariffs = '';
        if (this.props.NSTariffsReducer.isFetching === false) {
            isFetchingNSTariffs =
                <div className="content-block">
                    <div className="content-block-container container no-back mt-0 no-padding">
                        <div className="content-block-content mt-0">

                            <div className="namespace-plan mt-0">
                                <div className="namespace-plan-title">choose a namespace size</div>
                            </div>
                            <div className="row">
				                {
					                this.props.NSTariffsReducer.data.map((item, index) => {
						                // console.log(item);
						                const cpu = item.cpu_limit / 1000;
						                const memory = item.memory_limit / 1024;
						                const volume = item.volume_size ? Math.ceil(item.volume_size) : item.volume_size;
						                const price = `$${item.price}`;
						                const pricePerDay = `$${(item.price / 30).toFixed(2)} daily`;
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
	                                                    label !== this.state.NSTariffName ?
		                                                    "namespace-plan-block-container hover-action-new" :
		                                                    "namespace-plan-block-container hover-action-new selected"
									                }
                                                    onClick={() => {
	                                                    this.handleClickTriff(label, cpu, memory, volume, price, pricePerDay);
									                }}
                                                >
                                                    <div className="row">
                                                        <div className={price === '$1' ?
                                                            "col-md-6 namespace-plan-block-container-left namespace-plan-block2dollars" :
                                                            "col-md-6 namespace-plan-block-container-left"}>
                                                            <div className="namespace-plan-block-price">{price}<span className="namespace-plan-span-price">/mo</span></div>
                                                            <div className="namespace-plan-block-month">{pricePerDay}</div>
                                                        </div>
                                                        <div className="col-md-6 namespace-plan-block-container-right">
                                                            <div className={price === '$1' ?
                                                                "content-block-content card-block card-block2dollars" :
                                                                "content-block-content card-block"}>
                                                                <div className="content-block__info-item">
                                                                    <div className="content-block__info-name inline">RAM : </div>
                                                                    <div className="content-block__info-text inline">{memory} GB</div>
                                                                </div>
                                                                <div className="content-block__info-item">
                                                                    <div className="content-block__info-name inline">CPU : </div>
                                                                    <div className="content-block__info-text inline">{cpu}</div>
                                                                </div>
												                {
													                price !== '$1' ?
                                                                        <div className="content-block__info-item">
                                                                            <div className="content-block__info-name inline">Volume : </div>
                                                                            <div className="content-block__info-text inline">{volume} GB</div>
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
            isFetchingNSTariffs =
                <div className="content-block">
                    <div className="content-block-container container no-back mt-0 no-padding">
                        <div className="content-block-content mt-0">

                            <div className="namespace-plan mt-0">
                                <div className="namespace-plan-title">choose a namespace size</div>
                            </div>
                            <div className="row">
				                {
					                new Array(8).fill().map((item, index) => {
						                return (
                                            <div key={index} className="col-md-3">
                                                <div className="namespace-plan-block-placeholder">
                                                    <img src={require('../../images/add-ns-block.svg')} alt=""/>
                                                </div>
                                            </div>
						                )
					                })
				                }
                            </div>
                        </div>
                    </div>
                </div>;
        }
        if (this.props.CreateNamespaceReducer.isFetching) {
	        isFetchingNSTariffs =
                <div className="content-block">
                    <div className="container no-back">
                        <div className="row double">
		                    {
			                    new Array(3).fill().map((item, index) => {
				                    return (
                                        <div key={index} className="col-md-4 align-middle">
                                            <img className="content-block-container-img" src={require('../../images/ns-1.svg')} alt="ns"/>
                                        </div>
				                    )
			                    })
		                    }
                        </div>
                    </div>
                </div>;
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
                        volume: this.state.NSTariffVolume,
                        price: this.state.NSTariffPrice,
                        pricePerDay: this.state.NSTariffPricePerDay,
                    }}
                    isOpened={this.state.isOpened}
                    onHandleCreate={this.props.onCreateNamespace}
                />
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
        onCreateNamespace: (inputNSName, NSTariffName, price) => {
            dispatch(createNamespace(inputNSName, NSTariffName, price));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNamespace);
