import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavLink from '../../containers/NavLink';
import { getNamespaces } from '../../actions/NamespacesActions';

class HeaderDropDown extends Component {
    componentDidMount() {
        if (!this.props.NamespacesReducer.data.length) {
            this.props.onGetNamespaces();
        }
    }
    render() {
        let mainContent = '';
        let isIdName = '';
        let isIdOutName = '';
        if (this.props.idName) {
            isIdName =
                <li className="breadcrumbs__li nav-item dropdown">
                    <div
                        style={{cursor: 'pointer'}}
                        // to={`/Namespaces/${this.props.idName}`}
                        className="breadcrumbs__link dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >{this.props.idName}</div>
                    <ul className="dropdown-menu dropdown-menu-left" role="menu">
                        {
                            this.props.NamespacesReducer.data.map((item, index) => {
                                return (
                                    <NavLink
                                        key={index}
                                        className="dropdown-item"
                                        to={`/Namespaces/${item.name}`}
                                    >{item.name}</NavLink>
                                );
                            })
                        }
                    </ul>
                </li>;
            isIdOutName =
                <li className="breadcrumbs__li nav-item dropdown">
                    <NavLink
                        to={`/Namespaces/${this.props.idName}`}
                        className="breadcrumbs__link"
                    >{this.props.idName}</NavLink>
                </li>;
        }
        let isIdService = '';
        if (this.props.idService) {
            isIdService =
                <div className="d-flex">
                    <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">/</li>
                    <li className="breadcrumbs__li nav-item">
                        <NavLink
                            to={`/Namespaces/${this.props.idName}/Services/${this.props.idService}`}
                            className="breadcrumbs__link"
                        >{this.props.idService}</NavLink>
                    </li>
                </div>
        }
        let isIdDep = '';
        if (this.props.idDep && !this.props.idPod) {
            isIdDep =
                <div className="d-flex">
                    <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">/</li>
                    <li className="breadcrumbs__li nav-item">
                        <NavLink
                            to={`/Namespaces/${this.props.idName}/Deployments/${this.props.idDep}`}
                            className="breadcrumbs__link"
                        >{this.props.idDep}</NavLink>
                    </li>
                </div>
        }
        let idPod = '';
        if (this.props.idPod) {
            idPod =
                <div className="d-flex">
                    <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">/</li>
                    <li className="breadcrumbs__li nav-item">
                        <NavLink
                            to={`/Namespaces/${this.props.idName}/Deployments/${this.props.idDep}`}
                            className="breadcrumbs__link"
                        >{this.props.idDep}</NavLink>
                    </li>
                    <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">/</li>
                    <li className="breadcrumbs__li nav-item">
                        <NavLink
                            to={`/Namespaces/${this.props.idName}/Deployments/${this.props.idDep}/Pods/${this.props.idPod}`}
                            className="breadcrumbs__link"
                        >{this.props.idPod}</NavLink>
                    </li>
                </div>
        }
	    let IdCreate = '';
	    if (this.props.IdCreate === "service") {
		    IdCreate =
			    <div className="d-flex">
				    <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">/</li>
				    <li className="breadcrumbs__li nav-item">
					    <div className="breadcrumbs__link">Create Service</div>
				    </li>
			    </div>
	    } else if (this.props.IdCreate === "deployment") {
		    IdCreate =
			    <div className="d-flex">
				    <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">/</li>
				    <li className="breadcrumbs__li nav-item">
					    <div className="breadcrumbs__link">Create Deployment</div>
				    </li>
			    </div>
        }
	    let IdUpdate = '';
	    if (this.props.IdUpdate === "service") {
		    IdUpdate =
			    <div className="d-flex">
				    <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">/</li>
				    <li className="breadcrumbs__li nav-item">
					    <div className="breadcrumbs__link">Update {this.props.typeOfUpdateService} Service</div>
				    </li>
			    </div>
	    } else if (this.props.IdUpdate === "deployment") {
		    IdUpdate =
			    <div className="d-flex">
				    <li className="breadcrumbs__li breadcrumbs__li_spacer nav-item">/</li>
				    <li className="breadcrumbs__li nav-item">
					    <div className="breadcrumbs__link">Update Deployment</div>
				    </li>
			    </div>
        }
        if (this.props.idPod ||
            this.props.idDep ||
            this.props.idService) {
            mainContent =
                <div className="header-bottom">
                    <div className="header-bottom-container container">
                        <ul className="breadcrumbs nav">
                            {isIdOutName}
                            {isIdService}
                            {isIdDep}
                            {idPod}
                        </ul>
                    </div>
                </div>
        } else {
            mainContent =
                <div className="header-bottom">
                    <div className="header-bottom-container container">
                        <ul className="breadcrumbs nav">
                            {isIdName}
                            {isIdService}
                            {isIdDep}
                            {idPod}
	                        {IdCreate}
	                        {IdUpdate}
                        </ul>
                    </div>
                </div>
        }
        return (
            <div>
                { mainContent }
            </div>
        );
    }
}

HeaderDropDown.propTypes = {
    idName: PropTypes.string,
    idDep: PropTypes.string,
    idPod: PropTypes.string,
    idService: PropTypes.string,
	IdCreate: PropTypes.string,
	IdUpdate: PropTypes.string,
	typeOfUpdateService: PropTypes.string,
    NamespacesReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        NamespacesReducer: state.NamespacesReducer
    };

}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetNamespaces: () => {
            dispatch(getNamespaces());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDropDown);
