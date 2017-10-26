import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import service from '../../../images/service.png';
import NotFoundServices from '../NotFoundServices';

class ServicesContains extends Component {
    constructor() {
        super();
        this.state = {
            countOfServices: 0
        }
    }
    componentDidMount() {
        this.setState({
            countOfServices: this.props.ServicesReducer.data ?
                this.props.ServicesReducer.data.length : 0
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.DeleteServiceReducer.isFetching === false &&
            nextProps.DeleteServiceReducer.status === 202 &&
            nextProps.DeleteServiceReducer.serviceName) {
            this.setState({
                countOfServices: this.state.countOfServices - 1
            });
            const id = `item_${nextProps.DeleteServiceReducer.serviceName}`;
            const el = document.getElementById(id);
            el ? el.remove() : el;
        }
    }
    handleClickService(name) {
        browserHistory.push('/Namespaces/' + this.props.idName + '/Services/' + name);
    }
    handleClose(e) {
        e.stopPropagation();
    }
    handleClickDeletingService(name) {
        this.props.onDeleteService(name);
    }
    render() {
        let isServicesEmpty = '';
        if (this.state.countOfServices) {
            isServicesEmpty =
                <div className="content-block-content full">
                    <div className="tab-content">
                        <div className="tab-pane services active">
                            <table className="content-block__table table" width="1170">
                                <thead>
                                <tr>
                                    <td className="td-1"> </td>
                                    <td className="td-2">Name</td>
                                    <td className="td-2">Type</td>
                                    <td className="td-2">Domain</td>
                                    <td className="td-7"> </td>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.ServicesReducer.data.map((item, index) => {
                                        const type = '' + item.labels.external === 'true' ? 'External' : 'Internal';
                                        const domain = item.domain_hosts[0] ? item.domain_hosts[0] : '-';
                                        const id = `item_${item.name}`;
                                        return (
                                            <tr
                                                key={index}
                                                className="tr-table-hover"
                                                id={id}
                                                onClick={name => this.handleClickService(item.name)}
                                            >
                                                <td className="td-1"><img src={service} /></td>
                                                <td className="td-2">{item.name}</td>
                                                <td className="td-2">{type}</td>
                                                <td className="td-2">{domain}</td>
                                                <td className="td-7 dropdown no-arrow" onClick={this.handleClose.bind(this)}>
                                                    <i
                                                        className="content-block-table__more ion-more dropdown-toggle"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    > </i>
                                                    <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                                        <button
                                                            className="dropdown-item text-danger"
                                                            onClick={name => this.handleClickDeletingService(item.name)}
                                                        >Delete</button>
                                                    </ul>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        } else {
            isServicesEmpty = <NotFoundServices/>
        }
        return (
            <div>
                { isServicesEmpty }
            </div>
        );
    }
}

ServicesContains.propTypes = {
    idName: PropTypes.string.isRequired,
    onDeleteService: PropTypes.func
};

function mapStateToProps(state) {
    return {
        ServicesReducer: state.ServicesReducer,
        DeleteServiceReducer: state.DeleteServiceReducer
    };

}

export default connect(mapStateToProps)(ServicesContains);
