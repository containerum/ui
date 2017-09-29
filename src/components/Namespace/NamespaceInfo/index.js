import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import n from '../../../images/n.png';

class NamespaceInfo extends Component {
    handleClickDeletingNamespace(idName) {
        // this.props.onDeletingNamespace(idName);
        console.log(idName);
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
        const NScpu = currentNSArr ? currentNSArr.cpu / 1000 : '';
        const NScpuLimit = currentNSArr ? currentNSArr.cpu_limit / 1000 : '';
        return (
            <div className="content-block">
                <div className="content-block-container content-block_common-statistic container">
                    <div className="content-block-header">
                        <div className="content-block-header-label">
                            <div className="content-block-header-label__text content-block-header-label_main">{NSname}</div>
                            <div className="content-block-header-label__descript">namespace</div>
                        </div>
                        {/*<div className="content-block-header-extra-panel">*/}
                            {/*<div className="content-block-header-extra-panel dropdown no-arrow">*/}
                                {/*<i*/}
                                    {/*className="content-block-header__more ion-more dropdown-toggle"*/}
                                    {/*data-toggle="dropdown"*/}
                                    {/*aria-haspopup="true"*/}
                                    {/*aria-expanded="false"*/}
                                {/*> </i>*/}
                                {/*<ul className="dropdown-menu dropdown-menu-right" role="menu">*/}
                                    {/*<button*/}
                                        {/*className="dropdown-item text-danger"*/}
                                        {/*onClick={name => this.handleClickDeletingNamespace(this.props.idName)}*/}
                                    {/*>Delete</button>*/}
                                {/*</ul>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                    <div className="content-block-content">
                        <div className="content-block__r-img"><img src={n} /></div>
                        <div className="content-block__info-item">
                            <div className="content-block__info-name">RAM ( Usage / Total ) : </div>
                            <div className="content-block__info-text">{NSmemory} / {NSmemoryLimit} MB</div>
                        </div>
                        <div className="content-block__info-item">
                            <div className="content-block__info-name">CPU ( Usage / Total ) : </div>
                            <div className="content-block__info-text">{NScpu} / {NScpuLimit}</div>
                        </div>
                        {/*<div className="content-block__info-item">*/}
                            {/*<div className="content-block__info-name">Volume ( Usage / Total ) :</div>*/}
                            {/*<div className="content-block__info-text">500 / 631 GB</div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        );
    }
}

NamespaceInfo.propTypes = {
    params: PropTypes.object
};

function mapStateToProps(state) {
    return {
        NamespacesReducer: state.NamespacesReducer
    };

}

export default connect(mapStateToProps)(NamespaceInfo);
