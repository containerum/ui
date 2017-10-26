import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import n from '../../../images/n.png';
import { deleteNamespace } from "../../../actions/NamespaceActions/deleteNamespaceAction";
import Notification from '../../Notification';
import CustomerModal from '../../CustomerModal';

class NamespaceInfo extends Component {
    constructor() {
        super();
        this.state = {
            isOpened: false,
            NSName: ''
        }
    }
    handleClickDeletingNamespace(idName) {
        this.setState({
            isOpened: true,
            NSName: idName
        });
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.DeleteNamespaceReducer) {
            this.setState({
                ...this.state,
                NSName: '',
                isOpened: false
            });
        }
        if (nextProps.DeleteNamespaceReducer.status === 202 && nextProps.DeleteNamespaceReducer.idName) {
            browserHistory.push('/Namespaces');
        }
    }
    render() {
        const NamespacesReducer = this.props.NamespacesReducer.data ? this.props.NamespacesReducer.data : [];
        const currentNSArr = NamespacesReducer.find(item => {
            if (item.name === this.props.idName) {
                return item;
            }
        });
        const NSname = currentNSArr ? currentNSArr.name : '';
        const NSmemory = currentNSArr ? currentNSArr.memory : '';
        const NSmemoryLimit = currentNSArr ? currentNSArr.memory_limit : '';
        const NScpu = currentNSArr ? currentNSArr.cpu : '';
        const NScpuLimit = currentNSArr ? currentNSArr.cpu_limit : '';
        return (
            <div>
                <Notification
                    status={this.props.DeleteNamespaceReducer.status}
                    name={this.props.DeleteNamespaceReducer.idName}
                    errorMessage={this.props.DeleteNamespaceReducer.errorMessage}
                />
                <div className="content-block">
                    <div className="content-block-container content-block_common-statistic container">
                        <div className="content-block-header">
                            <div className="content-block-header-label">
                                <div className="content-block-header-label__text content-block-header-label_main">{NSname}</div>
                                <div className="content-block-header-label__descript">namespace</div>
                            </div>
                            <div className="content-block-header-extra-panel">
                                <div className="content-block-header-extra-panel dropdown no-arrow">
                                    <i
                                        className="content-block-header__more ion-more dropdown-toggle"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    > </i>
                                    <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                        <button
                                            className="dropdown-item text-danger"
                                            onClick={name => this.handleClickDeletingNamespace(this.props.idName)}
                                        >Delete</button>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="content-block-content">
                            <div className="content-block__r-img"><img src={n} /></div>
                            <div className="content-block__info-item">
                                <div className="content-block__info-name">RAM ( Usage / Total ) : </div>
                                <div className="content-block__info-text">{NSmemory} / {NSmemoryLimit} MB</div>
                            </div>
                            <div className="content-block__info-item">
                                <div className="content-block__info-name">CPU ( Usage / Total ) : </div>
                                <div className="content-block__info-text">{NScpu} / {NScpuLimit} m</div>
                            </div>
                            {/*<div className="content-block__info-item">*/}
                            {/*<div className="content-block__info-name">Volume ( Usage / Total ) :</div>*/}
                            {/*<div className="content-block__info-text">500 / 631 GB</div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>

                <CustomerModal
                    type="Namespace"
                    name={this.state.NSName}
                    isOpened={this.state.isOpened}
                    onHandleDelete={this.props.onDeleteNamespace}
                />
            </div>
        );
    }
}

NamespaceInfo.propTypes = {
    params: PropTypes.object
};

function mapStateToProps(state) {
    return {
        NamespacesReducer: state.NamespacesReducer,
        DeleteNamespaceReducer: state.DeleteNamespaceReducer
    };

}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteNamespace: (idName) => {
            dispatch(deleteNamespace(idName));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NamespaceInfo);
