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
        let isFetchingComponent = '';
        if (this.props.NamespacesReducer.isFetching === false) {
            isFetchingComponent =
                <NamespacesContainer
                    namespacesDataReducer={this.props.NamespacesReducer.data}
                />;
        } else {
            // isFetchingComponent =
            //     <div className="dropdown-menu i-dropdown-box-shadow">
            //         <NavLink className="dropdown-item c-dropdown-item-wrap i-pl-10" to={window.location.pathname}>
            //             <img className="c-dropdown-item-img" alt="dropdown-item-img" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUyIDUyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MiA1MjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiPgo8Zz4KCTxwYXRoIGQ9Ik0yNiwwQzExLjY2NCwwLDAsMTEuNjYzLDAsMjZzMTEuNjY0LDI2LDI2LDI2czI2LTExLjY2MywyNi0yNlM0MC4zMzYsMCwyNiwweiBNMjYsNTBDMTIuNzY3LDUwLDIsMzkuMjMzLDIsMjYgICBTMTIuNzY3LDIsMjYsMnMyNCwxMC43NjcsMjQsMjRTMzkuMjMzLDUwLDI2LDUweiIgZmlsbD0iIzI5MmIyYyIvPgoJPHBhdGggZD0iTTM4LjUsMjVIMjdWMTRjMC0wLjU1My0wLjQ0OC0xLTEtMXMtMSwwLjQ0Ny0xLDF2MTFIMTMuNWMtMC41NTIsMC0xLDAuNDQ3LTEsMXMwLjQ0OCwxLDEsMUgyNXYxMmMwLDAuNTUzLDAuNDQ4LDEsMSwxICAgczEtMC40NDcsMS0xVjI3aDExLjVjMC41NTIsMCwxLTAuNDQ3LDEtMVMzOS4wNTIsMjUsMzguNSwyNXoiIGZpbGw9IiMyOTJiMmMiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
            //             <span className="c-dropdown-item-name">Create new space</span>
            //         </NavLink>
            //     </div>;
        }
        let isIdDep = null;
        if (this.props.idDep) {
            isIdDep =
                <div className="btn-group">
                    <div className="i-label-navigator">
                        <svg
                            x="0px" y="0px" width="20px"
                            height="20px" viewBox="0 0 24 24"
                            focusable="false" fill="#636c72">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                        </svg>
                    </div>
                    <NavLink to={window.location.pathname.substring(0, window.location.pathname.indexOf(this.props.idDep) + this.props.idDep.length)}>
                        <button
                            type="button"
                            className="btn c-nav-menu-btn"
                        >
                            { this.props.idDep }
                        </button>
                    </NavLink>
                </div>;
        }
        let isIdPod = null;
        if (this.props.idPod) {
            isIdPod =
                <div className="btn-group">
                    <div className="i-label-navigator">
                        <svg
                            x="0px" y="0px" width="20px"
                            height="20px" viewBox="0 0 24 24"
                            focusable="false" fill="#636c72">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                        </svg>
                    </div>
                    <NavLink to={window.location.pathname}>
                        <button
                            type="button"
                            className="btn c-nav-menu-btn"
                        >
                            { this.props.idPod }
                        </button>
                    </NavLink>
                </div>;
        }
        let isIdService = null;
        if (this.props.idService) {
            isIdService =
                <div className="btn-group">
                    <div className="i-label-navigator">
                        <svg
                            x="0px" y="0px" width="20px"
                            height="20px" viewBox="0 0 24 24"
                            focusable="false" fill="#636c72">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                        </svg>
                    </div>
                    <NavLink to={window.location.pathname}>
                        <button
                            type="button"
                            className="btn c-nav-menu-btn"
                        >
                            { this.props.idService }
                        </button>
                    </NavLink>
                </div>;
        }
        let mainContent = '';
        if (this.props.idPod || this.props.idDep || this.props.idService) {
            mainContent = <div className="btn-group mr-auto">
                <NavLink to={`/Namespaces/${this.props.idName}`}>
                    <button
                        type="button"
                        className="btn c-nav-menu-btn"
                    >
                        Personal space
                    </button>
                </NavLink>
            </div>;
        } else {
            mainContent = <div className="btn-group mr-auto">
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
            </div>;
        }

        return (
            <div className="mr-auto">
                { mainContent }
                { isIdDep }
                { isIdPod }
                { isIdService }
            </div>
        );
    }
}

Namespaces.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    idName: PropTypes.string,
    idDep: PropTypes.string,
    idPod: PropTypes.string,
    idService: PropTypes.string,
    NamespacesReducer: PropTypes.object
};

function mapStateToProps(state) {
    const { NamespacesReducer } = state;
    const { errorMessage } = NamespacesReducer;

    return {
        errorMessage,
        NamespacesReducer
    };
}

export default connect(mapStateToProps)(Namespaces);
