import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import MiniSpinner from '../../MiniSpinner';
import { getTokens } from '../../../actions/TokensActions/getTokensAction';
import { addToken } from '../../../actions/TokensActions/addTokenAction';

class Tokens extends Component {
    componentDidMount() {
        this.props.onGetTokens();
    }
    handleSubmitToken(e) {
        e.preventDefault();
        console.log(this.refs.token.value);
        const addingToken = this.refs.token.value;
        this.props.onAddToken(addingToken);
    }
    render() {
        // const tokenButtonText = this.props.TokenReducer.isFetching ? <MiniSpinner /> : 'Add new Token';
        // const isActiveTokenButton = this.props.TokenReducer.isFetching ?
        //     'btn btn-block c-btn-green disabled' :
        //     'btn btn-block c-btn-green';
        // const isActiveTokenState = !!this.props.TokenReducer.isFetching;
        return (
            <div className="card mt-3">
                <div className="card-block c-table-card-block">
                    <table className="table i-table-card">
                        <tbody>
                            <tr>
                                <td className="first-td-width">
                                    <h2 id="tokens">
                                        <a name="tokens" className="anchor" href="#tokens">Token`s</a>
                                    </h2> <br/>
                                    <p>Token provide an another way to logging into a virtual private Namespace</p>
                                </td>
                                <td>
                                    {this.props.TokensReducer.data.map((item, index) => {
                                        return <div key={index}>{item.id}</div>;
                                    })}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                </td>
                                <td style={{ width: '400px' }}>
                                    <form onSubmit={this.handleSubmitToken.bind(this)}>
                                        <div className="form-group i-mb-20 c-has-feedback-left">
                                            {/*{this.props.TokensReducer.data.map((item, index) => {*/}
                                            {/*return <div key={index}>{item.id}</div>;*/}
                                            {/*})}*/}
                                            {/*<label className="sr-only" htmlFor="inlineFormInputCompanyName">Add new Token</label>*/}
                                            {/*<div className="form-group i-mb-20 c-has-feedback-left">*/}
                                            {/*<input*/}
                                            {/*ref="token"*/}
                                            {/*id="token"*/}
                                            {/*required="required"*/}
                                            {/*type="token"*/}
                                            {/*className="form-control"*/}
                                            {/*placeholder="Name"*/}
                                            {/*/>*/}
                                            {/*<i className="c-form-control-icon fa fa-tag fa-1"></i>*/}
                                            {/*</div>*/}
                                        </div>
                                        {/*<button*/}
                                        {/*type="submit"*/}
                                        {/*className="btn btn-block c-btn-green"*/}
                                        {/*// className={isActiveTokenButton}*/}
                                        {/*// disabled={isActiveTokenState}*/}
                                        {/*>*/}
                                        {/*/!*{tokenButtonText}*!/*/}
                                        {/*Add new Token*/}
                                        {/*</button>*/}
                                    </form>
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

Tokens.propTypes = {
    onGetTokens: PropTypes.func.isRequired,
    onAddToken: PropTypes.func,
    TokenReducer: PropTypes.object,
    TokensReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        TokensReducer: state.TokensReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetTokens: () => {
            dispatch(getTokens());
        },
        onAddToken: () => {
            dispatch(addToken());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tokens);
