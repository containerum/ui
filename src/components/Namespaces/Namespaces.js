import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavLink from '../../components/NavLink';
import { getNamespaces } from '../../actions/NamespacesActions';
import NamespacesContainer from '../../containers/NamespacesContainer';

class Namespaces extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getNamespaces());
    }
    render() {
        let isFetchingComponent = "";
        if (this.props.NamespacesReducer.isFetching === false) {
            isFetchingComponent =
                <NamespacesContainer
                    namespacesDataReducer={this.props.NamespacesReducer.data}
                />
        } else {
            isFetchingComponent =
                <div className="dropdown-menu i-dropdown-box-shadow">
                    <NavLink className="dropdown-item c-dropdown-item-wrap i-pl-10" to="/CreateNewSpace">
                        <img className="c-dropdown-item-img" alt="dropdown-item-img" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUyIDUyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MiA1MjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiPgo8Zz4KCTxwYXRoIGQ9Ik0yNiwwQzExLjY2NCwwLDAsMTEuNjYzLDAsMjZzMTEuNjY0LDI2LDI2LDI2czI2LTExLjY2MywyNi0yNlM0MC4zMzYsMCwyNiwweiBNMjYsNTBDMTIuNzY3LDUwLDIsMzkuMjMzLDIsMjYgICBTMTIuNzY3LDIsMjYsMnMyNCwxMC43NjcsMjQsMjRTMzkuMjMzLDUwLDI2LDUweiIgZmlsbD0iIzI5MmIyYyIvPgoJPHBhdGggZD0iTTM4LjUsMjVIMjdWMTRjMC0wLjU1My0wLjQ0OC0xLTEtMXMtMSwwLjQ0Ny0xLDF2MTFIMTMuNWMtMC41NTIsMC0xLDAuNDQ3LTEsMXMwLjQ0OCwxLDEsMUgyNXYxMmMwLDAuNTUzLDAuNDQ4LDEsMSwxICAgczEtMC40NDcsMS0xVjI3aDExLjVjMC41NTIsMCwxLTAuNDQ3LDEtMVMzOS4wNTIsMjUsMzguNSwyNXoiIGZpbGw9IiMyOTJiMmMiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
                        <span className="c-dropdown-item-name">Create new space</span>
                    </NavLink>
                </div>;
        }
        let isIdDep = null;
        if (this.props.idDep) {
            isIdDep =
                <div className="btn-group">
                    <i className="arrow-right"></i>
                    <button
                        type="button"
                        className="btn c-nav-menu-btn"
                    >
                        <NavLink to={window.location.pathname.substring(0, window.location.pathname.indexOf(this.props.idDep) + this.props.idDep.length)}>
                            { this.props.idDep }
                        </NavLink>
                    </button>
                </div>
        }
        let isIdPod = null;
        if (this.props.idPod) {
            isIdPod =
                <div className="btn-group">
                    <i className="arrow-right"></i>
                    <button
                        type="button"
                        className="btn c-nav-menu-btn"
                    >
                        <NavLink to={window.location.pathname}>
                            { this.props.idPod }
                        </NavLink>
                    </button>
                </div>
        }

        return (
            <div className="mr-auto">
                <div className="btn-group mr-auto">
                    <button
                        type="button"
                        className="btn dropdown-toggle c-nav-menu-btn"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Personal space
                    </button>
                    { isFetchingComponent }
                </div>
                { isIdDep }
                { isIdPod }
            </div>
        );
    }
}

Namespaces.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    idDep: PropTypes.string,
    idPod: PropTypes.string,
};

function mapStateToProps (state) {
    const { NamespacesReducer } = state;
    const { errorMessage } = NamespacesReducer;

    return {
        errorMessage,
        NamespacesReducer
    }
}

export default connect(mapStateToProps)(Namespaces)
