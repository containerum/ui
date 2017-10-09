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
            <div className="block-item" id="tokens">
                <div className="block-item__title">Tokens</div>
                <form action="" className="" method="">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="light-text">Token provides another way to log into your private Namespace</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="block-item__tokens col-md-12">
                            <table className="block-item__tokens-table content-block__table table">
                                <tbody>
                                <tr>
                                    <td>Name 1</td>
                                    <td>#zdeschtotodolzchnobit</td>
                                    <td className=" dropdown no-arrow">
                                        <i
                                            className="content-block-table__more ion-more dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        > </i>

                                        <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Name 2</td>
                                    <td>#zdeschtotodolzchnobit</td>
                                    <td className=" dropdown no-arrow">
                                        <i
                                            className="content-block-table__more ion-more dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        > </i>

                                        <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Name 3</td>
                                    <td>#zdeschtotodolzchnobit</td>
                                    <td className=" dropdown no-arrow">
                                        <i
                                            className="content-block-table__more ion-more dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        > </i>

                                        <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Name 4</td>
                                    <td>#zdeschtotodolzchnobit</td>
                                    <td className=" dropdown no-arrow">
                                        <i
                                            className="content-block-table__more ion-more dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        > </i>

                                        <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Name 5</td>
                                    <td>#zdeschtotodolzchnobit</td>
                                    <td className=" dropdown no-arrow">
                                        <i
                                            className="content-block-table__more ion-more dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        > </i>

                                        <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Name 6</td>
                                    <td>#zdeschtotodolzchnobit</td>
                                    <td className=" dropdown no-arrow">
                                        <i
                                            className="content-block-table__more ion-more dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        > </i>

                                        <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                            <a className="dropdown-item" href="#">Dropdown item</a>
                                        </ul>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md-6">
                            <div className="form-group ">
                                <input type="text" className="form-group__input-text form-control" id="new-name" />
                                <label className="form-group__label" htmlFor="new-name"> </label>
                                <div className="form-group__helper"> </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group pt-0">
                                <input type="submit" value="Add" className="button_blue btn btn-outline-primary" />
                            </div>
                        </div>
                    </div>
                </form>
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
