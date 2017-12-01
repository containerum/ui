import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import service from '../../../images/service.png';
import { getServices } from '../../../actions/ServicesActions';
import NotFoundServices from '../NotFoundServices';

class ServicesContains extends Component {
    constructor() {
        super();
        this.state = {
            countOfServices: 0
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.DeleteServiceReducer.isFetching === false &&
            nextProps.DeleteServiceReducer.status === 202 &&
            nextProps.DeleteServiceReducer.serviceName &&
	        nextProps.DeleteServiceReducer.serviceName !==
	        this.props.DeleteServiceReducer.serviceName) {
            const id = `item_${nextProps.DeleteServiceReducer.serviceName}`;
            if (typeof window !== 'undefined') {
                const el = document.getElementById(id);
                el ? el.remove() : el;
	            el ? this.setState({
		            ...this.state,
		            countOfServices: this.state.countOfServices + 1
	            }) : null;
            }
        }
    }
	componentWillUnmount() {
		this.props.onGetServices(this.props.idName);
		this.setState({
			...this.state,
			countOfServices: 0
		})
	}
    handleClickService(name) {
        if (typeof window !== 'undefined') {
            browserHistory.push('/Namespaces/' + this.props.idName + '/Services/' + name);
        }
    }
    handleClose(e) {
        e.stopPropagation();
    }
    handleClickDeletingService(name) {
        this.props.onDeleteService(name);
    }
    render() {
        // console.log(this.props.ServicesReducer.data);
        // console.log(this.state.countOfServices);
        let isServicesEmpty = '';
        if (this.props.ServicesReducer.data.length &&
	        this.state.countOfServices !== this.props.ServicesReducer.data.length) {
            isServicesEmpty =
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
        } else if (this.props.ServicesReducer.isFetching ||
	        this.props.DeleteNamespaceReducer.isFetching) {
	        isServicesEmpty =
                <div style={{
			        height: '270px',
			        margin: '0 30px',
			        borderRadius: '2px',
			        backgroundColor: '#f6f6f6'
		        }} />
        } else {
            isServicesEmpty = <NotFoundServices/>
        }
        return (
            <div>
                <div className="content-block-content full">
                    <div className="tab-content">
                        <div className="tab-pane services active">
	                        { isServicesEmpty }
                        </div>
                    </div>
                </div>
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
        DeleteServiceReducer: state.DeleteServiceReducer,
	    DeleteNamespaceReducer: state.DeleteNamespaceReducer
    };

}

const mapDispatchToProps = (dispatch) => {
	return {
		onGetServices: (idName) => {
			dispatch(getServices(idName));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesContains);
