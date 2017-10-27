import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

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
