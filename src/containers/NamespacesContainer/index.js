import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavLink from '../../components/NavLink';

class NamespacesContainer extends Component {
    render() {
        // let dropdownDivider = null;
        // if(this.props.namespacesDataReducer.length) {
        //     dropdownDivider = <div className="dropdown-divider"></div>;
        // }
        return (
            <div className="dropdown-menu i-dropdown-box-shadow">
                {
                    this.props.namespacesDataReducer.map(function(item, index) {
                        return (
                            <NavLink key={index} className="dropdown-item c-dropdown-item-wrap" to={`/Namespaces/${item.name}`}>
                                <span
                                    // className="c-dropdown-item-name"
                                >
                                    {item.name}
                                </span>
                            </NavLink>
                        );
                    })
                }
                {/*{ dropdownDivider }*/}
                {/*<NavLink className="dropdown-item c-dropdown-item-wrap i-pl-10" to={window.location.pathname}>*/}
                    {/*<img className="c-dropdown-item-img" alt="dropdown-item-img" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUyIDUyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MiA1MjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiPgo8Zz4KCTxwYXRoIGQ9Ik0yNiwwQzExLjY2NCwwLDAsMTEuNjYzLDAsMjZzMTEuNjY0LDI2LDI2LDI2czI2LTExLjY2MywyNi0yNlM0MC4zMzYsMCwyNiwweiBNMjYsNTBDMTIuNzY3LDUwLDIsMzkuMjMzLDIsMjYgICBTMTIuNzY3LDIsMjYsMnMyNCwxMC43NjcsMjQsMjRTMzkuMjMzLDUwLDI2LDUweiIgZmlsbD0iIzI5MmIyYyIvPgoJPHBhdGggZD0iTTM4LjUsMjVIMjdWMTRjMC0wLjU1My0wLjQ0OC0xLTEtMXMtMSwwLjQ0Ny0xLDF2MTFIMTMuNWMtMC41NTIsMC0xLDAuNDQ3LTEsMXMwLjQ0OCwxLDEsMUgyNXYxMmMwLDAuNTUzLDAuNDQ4LDEsMSwxICAgczEtMC40NDcsMS0xVjI3aDExLjVjMC41NTIsMCwxLTAuNDQ3LDEtMVMzOS4wNTIsMjUsMzguNSwyNXoiIGZpbGw9IiMyOTJiMmMiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />*/}
                    {/*<span className="c-dropdown-item-name">Create new space</span>*/}
                {/*</NavLink>*/}
            </div>
        );
    }
}

NamespacesContainer.propTypes = {
    namespacesDataReducer: PropTypes.array
};

export default NamespacesContainer;
