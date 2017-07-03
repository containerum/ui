import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class BackPanel extends Component {
    handleOnClickBack() {
        browserHistory.push('/Namespaces/default');
    }
    render() {
        console.log(document.referrer);
        return (
            <div className="mr-auto">
                <div className="btn-group">
                    <div onClick={this.handleOnClickBack.bind(this)}>
                        <div className="i-label-back">
                            <svg
                                transform="rotate(180)"
                                x="0px" y="0px" width="20px"
                                height="20px" viewBox="0 0 24 24"
                                focusable="false" fill="#636c72">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                            </svg>
                        </div>
                        <button
                            type="button"
                            className="btn c-nav-menu-btn"
                        >
                            Panel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BackPanel;
