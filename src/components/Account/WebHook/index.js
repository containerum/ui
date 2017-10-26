import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import copy from 'copy-text-to-clipboard';

import Spinner from '../../Spinner';
import Notification from '../../Notification';
import { deleteImageToken } from '../../../actions/TokensActions/deleteImageTokenAction';
import { getImageTokens } from '../../../actions/TokensActions/getImageTokensAction';
import { createImageTokens } from '../../../actions/TokensActions/createImageTokensAction';

class WebHook extends Component {
    constructor() {
        super();
        this.state = {
            isTokenExists: false,
            token: '10e2730e60be4ab64f48e6cf626f729d',
            copied: false,
        };
    }
    componentDidMount() {
        // if (!Object.keys(this.props.GetImageTokensReducer.data).length) {
            this.props.onGetImageTokens();
        // }
        if (this.props.GetImageTokensReducer.data.token) {
            this.setState({
                ...this.state,
                isTokenExists: true,
                token: this.props.GetImageTokensReducer.data.token
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.GetImageTokensReducer.data.token) {
            this.setState({
                ...this.state,
                isTokenExists: true,
                token: nextProps.GetImageTokensReducer.data.token
            });
        }
        if (nextProps.DeleteImageTokensReducer.isFetching === false &&
            nextProps.DeleteImageTokensReducer.status === 202 &&
            nextProps.DeleteImageTokensReducer.status !== this.props.DeleteImageTokensReducer.status &&
            nextProps.DeleteImageTokensReducer.WebHook === 'WebHook') {
            this.setState({
                ...this.state,
                isTokenExists: false,
                token: '10e2730e60be4ab64f48e6cf626f729d'
            });
        } else if (nextProps.CreateImageTokensReducer.isFetching === false &&
            nextProps.CreateImageTokensReducer.status === 201 &&
            nextProps.CreateImageTokensReducer.status !== this.props.CreateImageTokensReducer.status &&
            nextProps.CreateImageTokensReducer.WebHook === 'WebHook') {
            this.setState({
                ...this.state,
                isTokenExists: true,
                token: nextProps.CreateImageTokensReducer.data.token
            });
        }
    }
    handleSubmitGetImageTokens(e) {
        e.preventDefault();
        this.props.onCreateImageTokens();
    }
    handleClickCopy() {
        copy(`curl -X POST https://web.api.containerum.io:5000/api/set/image/${this.state.token} -H 'content-type: application/json' -d '{"image": "IMAGE_NAME","deployment_name": "DEPLOY_NAME","namespace": "NAMESPACE_NAME","container_name": "CONTAINER_NAME"}'`);
    }
    handleClickDeletingWebHook() {
        this.props.onDeleteImageToken();
    }
    render() {
        // console.log(this.props.GetImageTokensReducer);
        let isFetchingComponent = '';
        if (this.props.GetImageTokensReducer.isFetching === false) {
        isFetchingComponent =
                <div className="block-item" id="webhooks">
                    <div className="block-item__title">WebHook</div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="light-text">Token provides another way to log into your private Namespace</div>
                        </div>
                    </div>
                    {
                        this.state.isTokenExists ?
                            <div className="row">
                                <div className="block-item__tokens col-md-12">
                                    <table className="block-item__tokens-table content-block__table table">
                                        <tbody>
                                        <tr>
                                            <td>https://web.api.containerum.io:5000/api/set/image/{this.state.token}</td>
                                            <td className=" dropdown no-arrow">
                                                <i className="content-block-table__more ion-more dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> </i>
                                                <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                                    <button
                                                        className="dropdown-item text-danger"
                                                        onClick={() => this.handleClickDeletingWebHook()}
                                                    >Delete</button>
                                                </ul>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> :
                            <div className="row">
                                <form
                                    className="block-item__tokens-block col-md-6"
                                    onSubmit={this.handleSubmitGetImageTokens.bind(this)}
                                >
                                    <div className="form-group pt-0">
                                        <button
                                            type="submit"
                                            className="button_blue btn btn-outline-primary"
                                        >Create WebHook</button>
                                    </div>
                                </form>
                            </div>
                    }
                    <div className="row">
                        <div className="col-md-12">
                            <div className="normal-text">WebHook Example:</div>
                            <Scrollbars autoHide className="block-item__copy-string">
                                <button
                                    aria-label="Copy to clipboard"
                                    className="btn btn-sm pull-right"
                                    data-copied-hint="Copied!"
                                    type="button"
                                    onClick={this.handleClickCopy.bind(this)}
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="octicon octicon-clippy"
                                        height="16"
                                        version="1.1"
                                        viewBox="0 0 14 16" width="14">
                                        <path
                                            fillRule="evenodd"
                                            d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"
                                        > </path>
                                    </svg>
                                </button>
                                <div className="block-item__content-string">
                                    curl -X POST \<br/>
                                    https://web.api.containerum.io:5000/api/set/image/{this.state.token} \<br/>
                                    -H 'content-type: application/json' \<br/>
                                    -d '&#123;<br/>
                                    &nbsp;&nbsp;"image": "IMAGE_NAME",<br/>
                                    &nbsp;&nbsp;"deployment_name": "DEPLOY_NAME",<br/>
                                    &nbsp;&nbsp;"namespace": "NAMESPACE_NAME",<br/>
                                    &nbsp;&nbsp;"container_name": "CONTAINER_NAME"<br/>
                                    &#125;'
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                </div>;
        } else {
            isFetchingComponent = <Spinner />;
        }
        let isFetchingDeleteToken = '';
        if (this.props.DeleteImageTokensReducer.isFetching ||
            this.props.CreateImageTokensReducer.isFetching) {
            isFetchingDeleteToken = <Spinner />;
        }
        return (
            <div>
                <Notification
                    status={this.props.DeleteImageTokensReducer.status}
                    name={this.props.DeleteImageTokensReducer.WebHook}
                    errorMessage={this.props.DeleteImageTokensReducer.errorMessage}
                />
                <Notification
                    status={this.props.CreateImageTokensReducer.status}
                    name={this.props.CreateImageTokensReducer.WebHook}
                    errorMessage={this.props.CreateImageTokensReducer.errorMessage}
                />
                { isFetchingDeleteToken }
                { isFetchingComponent }
            </div>
        );
    }
}

WebHook.propTypes = {
    GetImageTokensReducer: PropTypes.object,
    CreateImageTokensReducer: PropTypes.object,
    DeleteImageTokensReducer: PropTypes.object,
    onGetImageTokens: PropTypes.func
};

function mapStateToProps(state) {
    return {
        GetImageTokensReducer: state.GetImageTokensReducer,
        CreateImageTokensReducer: state.CreateImageTokensReducer,
        DeleteImageTokensReducer: state.DeleteImageTokensReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetImageTokens: () => {
            dispatch(getImageTokens());
        },
        onCreateImageTokens: () => {
            dispatch(createImageTokens());
        },
        onDeleteImageToken: () => {
            dispatch(deleteImageToken());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebHook);
