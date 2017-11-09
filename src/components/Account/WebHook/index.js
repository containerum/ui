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
            nameValue: '',
            patternValue: '.*'
        };
    }
    componentDidMount() {
        this.props.onGetImageTokens();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.DeleteImageTokensReducer.isFetching === false &&
            nextProps.DeleteImageTokensReducer.status === 202 &&
            nextProps.DeleteImageTokensReducer.status !== this.props.DeleteImageTokensReducer.status &&
            nextProps.DeleteImageTokensReducer.WebHook === 'WebHook') {
            this.props.onGetImageTokens();
            this.setState({
                ...this.state,
                patternValue: '.*',
                nameValue: ''
            });
        } else if (nextProps.CreateImageTokensReducer.isFetching === false &&
            nextProps.CreateImageTokensReducer.status === 201 &&
            nextProps.CreateImageTokensReducer.status !== this.props.CreateImageTokensReducer.status &&
            nextProps.CreateImageTokensReducer.WebHook === 'WebHook') {
            this.props.onGetImageTokens();
            this.setState({
                ...this.state,
                patternValue: '.*',
                nameValue: ''
            });
        }
    }
    handleSubmitGetImageTokens(e) {
        e.preventDefault();
        this.props.onCreateImageTokens(this.state.nameValue, this.state.patternValue);
    }
    handleClickDeletingWebHook(label) {
        this.props.onDeleteImageToken(label);
    }
    handleChangePattern(e) {
        this.setState({
            ...this.state,
            patternValue: e.target.value
        });
    }
    handleChangeName(e) {
        this.setState({
            ...this.state,
            nameValue: e.target.value
        });
    }
    render() {
        if (typeof window !== 'undefined') {
            const elementName = document.getElementById('webhook-name');
            if (this.state.nameValue.length !== 0) {
                elementName ?
                    elementName.classList.add('form-group__label-always-onfocus') : '';
            } else {
                elementName ?
                    elementName.classList.remove('form-group__label-always-onfocus') : '';
            }
        }
        let isFetchingComponent = '';
        if (this.props.GetImageTokensReducer.isFetching === false) {
            const data = this.props.GetImageTokensReducer.data.length ?
                this.props.GetImageTokensReducer.data : [];
            const firstToken = this.props.GetImageTokensReducer.data.length ?
                this.props.GetImageTokensReducer.data[0].token : '10e2730e60be4ab64f48e6cf626f729d';
            isFetchingComponent =
                <div className="block-item" id="webhooks">
                    <div className="block-item__title">WebHook</div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="light-text">Here you can configure a CD Webhook to automate updating images
                                in your containers.</div>
                        </div>
                    </div>
                    {
                        this.props.GetImageTokensReducer.data.length ?
                            <div className="row">
                                <div className="block-item__tokens col-md-12">
                                    <table className="block-item__tokens-table content-block__table table">
                                        <tbody>
                                        {
                                            data.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="td-label-wrapper">{item.label}</td>
                                                        <td className="td-label-wrapper">{item.regexp}</td>
                                                        <td>{item.token}</td>
                                                        <td className=" dropdown no-arrow">
                                                            <i className="content-block-table__more ion-more dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> </i>
                                                            <ul className="dropdown-menu dropdown-menu-right" role="menu"><button
                                                                className="dropdown-item text-danger"
                                                                onClick={label => this.handleClickDeletingWebHook(item.label)}
                                                            >Delete</button>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div> : ''
                    }
                    <form
                        onSubmit={this.handleSubmitGetImageTokens.bind(this)}
                        className="row mt-2"
                    >
                        <div className="col-md-3">
                            <div className="form-group ">
                                <input
                                    type="text"
                                    className="form-group__input-text form-control"
                                    onChange={this.handleChangeName.bind(this)}
                                    value={this.state.nameValue}
                                    id="webhook-name-value"
                                    required
                                />
                                <label
                                    className="form-group__label"
                                    htmlFor="webhook-name"
                                    id="webhook-name"
                                >Name</label>
                                <div className="form-group__helper"> </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group ">
                                <input
                                    type="text"
                                    className="form-group__input-text form-control"
                                    onChange={this.handleChangePattern.bind(this)}
                                    id="webhook-pattern-value"
                                    required
                                    value={this.state.patternValue}
                                />
                                <label
                                    className="form-group__label form-group__label-always-onfocus"
                                    htmlFor="webhook-pattern"
                                    id="webhook-pattern"
                                >Pattern</label>
                                <div className="form-group__helper"> </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group pt-0">
                                <button
                                    type="submit"
                                    className="button_blue btn btn-outline-primary"
                                >Add</button>
                            </div>
                        </div>
                    </form>
                    <br />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="normal-text">WebHook Example:</div>
                            <Scrollbars autoHide className="block-item__copy-string">
                                <div className="block-item__content-string">
                                    curl -X POST \<br/>
                                    https://web.api.containerum.io:5000/api/set/image/{firstToken} \<br/>
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
                    <br />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="normal-text">WebHook for Docker Hub Example:</div>
                            <Scrollbars autoHide className="block-item__copy-string block-item__copy-string-docker">
                                <div className="block-item__content-string block-item__content-string-docker">
                                    http://web.api.containerum.io:5000/api/namespaces/&#123;NAMESPACE_NAME&#125;/deployments/&#123;DEPLOY_NAME&#125;/containers/&#123;CONTAINER_NAME&#125;/set/image/{firstToken}
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                </div>
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
        onCreateImageTokens: (label, regexp) => {
            dispatch(createImageTokens(label, regexp));
        },
        onDeleteImageToken: (label) => {
            dispatch(deleteImageToken(label));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebHook);
