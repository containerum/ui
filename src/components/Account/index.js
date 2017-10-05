import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Scrollbars } from 'react-custom-scrollbars';

import Profile from './Profile';
import Password from './Password';
// import CliToken from './CliToken';
// import Subscription from './Subscription';
// import DeleteAccount from './DeleteAccount';
// import ConvertCompany from './ConvertCompany';
// import Tokens from './Tokens';
import AccountSidebar from './AccountSidebar';
import Spinner from '../Spinner';
import { getProfile } from '../../actions/ProfileActions/getProfileActions';
import arrows from '../../images/arrows.png';

import './Account.css';

class Account extends Component {
    componentDidMount() {
        const cliBlock = document.querySelector('.block-item__copy-string');
        if (!!this.props.GetProfileReducer.data.login) {
            this.props.onLoadProfileData();
        }
    }
    render() {
        const email = Object.keys(this.props.GetProfileReducer.data).length ?
            this.props.GetProfileReducer.data.data.email : '';
        let isFetchingComponent = '';
        if (this.props.GetProfileReducer.isFetching === false) {
            isFetchingComponent =
                <div>
                    <div className="content-block ">
                        <div className=" container no-back">
                            <div className="row double two-columns">
                                <AccountSidebar />
                                <div className="col-md-9 col-lg-9 col-xl-10">
                                    <div className="content-block">
                                        <div className="content-block-container container container-fluid">
                                            <Profile email={email} />
                                            <Password />
                                            {/*<div className="block-item" id="tokens">*/}
                                                {/*<div className="block-item__title">Tokens</div>*/}
                                                {/*<form action="" className="" method="">*/}
                                                    {/*<div className="row">*/}
                                                        {/*<div className="col-md-6">*/}
                                                            {/*<div className="light-text">Token provides another way to log into your private Namespace</div>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="row">*/}
                                                        {/*<div className="block-item__tokens col-md-12">*/}
                                                            {/*<table className="block-item__tokens-table content-block__table table">*/}
                                                                {/*<tbody>*/}
                                                                {/*<tr>*/}
                                                                    {/*<td>Name 1</td>*/}
                                                                    {/*<td>#zdeschtotodolzchnobit</td>*/}
                                                                    {/*<td className=" dropdown no-arrow">*/}
                                                                        {/*<i className="content-block-table__more ion-more dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>*/}

                                                                        {/*<ul className="dropdown-menu dropdown-menu-right" role="menu">*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                        {/*</ul>*/}
                                                                    {/*</td>*/}
                                                                {/*</tr>*/}
                                                                {/*<tr>*/}
                                                                    {/*<td>Name 2</td>*/}
                                                                    {/*<td>#zdeschtotodolzchnobit</td>*/}
                                                                    {/*<td className=" dropdown no-arrow">*/}
                                                                        {/*<i className="content-block-table__more ion-more dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>*/}

                                                                        {/*<ul className="dropdown-menu dropdown-menu-right" role="menu">*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                        {/*</ul>*/}
                                                                    {/*</td>*/}
                                                                {/*</tr>*/}
                                                                {/*<tr>*/}
                                                                    {/*<td>Name 3</td>*/}
                                                                    {/*<td>#zdeschtotodolzchnobit</td>*/}
                                                                    {/*<td className=" dropdown no-arrow">*/}
                                                                        {/*<i className="content-block-table__more ion-more dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>*/}

                                                                        {/*<ul className="dropdown-menu dropdown-menu-right" role="menu">*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                        {/*</ul>*/}
                                                                    {/*</td>*/}
                                                                {/*</tr>*/}
                                                                {/*<tr>*/}
                                                                    {/*<td>Name 4</td>*/}
                                                                    {/*<td>#zdeschtotodolzchnobit</td>*/}
                                                                    {/*<td className=" dropdown no-arrow">*/}
                                                                        {/*<i className="content-block-table__more ion-more dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>*/}

                                                                        {/*<ul className="dropdown-menu dropdown-menu-right" role="menu">*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                        {/*</ul>*/}
                                                                    {/*</td>*/}
                                                                {/*</tr>*/}
                                                                {/*<tr>*/}
                                                                    {/*<td>Name 5</td>*/}
                                                                    {/*<td>#zdeschtotodolzchnobit</td>*/}
                                                                    {/*<td className=" dropdown no-arrow">*/}
                                                                        {/*<i className="content-block-table__more ion-more dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>*/}

                                                                        {/*<ul className="dropdown-menu dropdown-menu-right" role="menu">*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                        {/*</ul>*/}
                                                                    {/*</td>*/}
                                                                {/*</tr>*/}
                                                                {/*<tr>*/}
                                                                    {/*<td>Name 6</td>*/}
                                                                    {/*<td>#zdeschtotodolzchnobit</td>*/}
                                                                    {/*<td className=" dropdown no-arrow">*/}
                                                                        {/*<i className="content-block-table__more ion-more dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>*/}

                                                                        {/*<ul className="dropdown-menu dropdown-menu-right" role="menu">*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                            {/*<a className="dropdown-item" href="#">Dropdown item</a>*/}
                                                                        {/*</ul>*/}
                                                                    {/*</td>*/}
                                                                {/*</tr>*/}
                                                                {/*</tbody>*/}
                                                            {/*</table>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="row ">*/}
                                                        {/*<div className="col-md-6">*/}
                                                            {/*<div className="form-group ">*/}
                                                                {/*<input type="text" className="form-group__input-text form-control" id="new-name" />*/}
                                                                    {/*<label className="form-group__label" htmlFor="new-name"></label>*/}
                                                                    {/*<div className="form-group__helper"></div>*/}
                                                            {/*</div>*/}
                                                        {/*</div>*/}
                                                        {/*<div className="col-md-6">*/}
                                                            {/*<div className="form-group pt-0">*/}
                                                                {/*<input type="submit" value="Add" className="button_blue btn btn-outline-primary" />*/}
                                                            {/*</div>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                                                {/*</form>*/}
                                            {/*</div>*/}
                                            <div className="block-item" id="cli">
                                                <div className="block-item__title">CLI</div>
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <div className="light-text">You can download our CLI Tool for your operating system. For fast authentication use the token below.</div>
                                                        {/*<Scrollbars autoHide className="block-item__copy-string">*/}
                                                            {/*<div className="block-item__content-string">chkit config --set-token anvbdfjxbckshdbmmjghgtnkmnokjlllanvbdfjxbckshdbmmjghgtnkmnokjlllanvbdfjxbckshdbmmjghgtnkmnokjlllanvbdfjxbckshdbmmjghgtnkmnokjlllanvbdfjxbckshdbmmjghgtnkmnokjlllanvbdfjxbckshdbmmjghgtnkmnokjlllanvbdfjxbckshdbmmjghgtnkmnokjlll</div>*/}
                                                        {/*</Scrollbars>*/}
                                                        {/*<div className="normal-text">Copy and paste into installed CLI client</div>*/}
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="block-item__sub-title">Download</div>
                                                        <a href="#" className="block-item__download">
                                                            <span className="block-item__download-title">CLI for Windows</span>
                                                            <span className="block-item__download-note">Version 0.56 / 75 MB </span>
                                                            <span className="block-item__download-arrow">
                                                                <img src={arrows} alt="Download CLI" />
                                                            </span>
                                                        </a>
                                                        <a href="#" className="block-item__download block-item__download_alt">
                                                            <span className="block-item__download-title">or</span>
                                                            <span className="block-item__download-note">CLI for other platform</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<div className="block-item" id="company-account">*/}
                                                {/*<div className="block-item__title">Company account</div>*/}
                                                {/*<div className="row">*/}
                                                    {/*<div className="col-md-6">*/}
                                                        {/*<div className="light-text">Warning: this will totaly delete your Apps and Data</div>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="col-md-6">*/}
                                                        {/*<form action="" className="" method="">*/}
                                                            {/*<div className="form-group pt-0">*/}
                                                                {/*<input type="text" className="form-group__input-text form-control" id="company-name" />*/}
                                                                    {/*<label className="form-group__label" htmlFor="company-name">Company name</label>*/}
                                                                    {/*<div className="form-group__helper"></div>*/}
                                                            {/*</div>*/}
                                                            {/*<div className="form-group ">*/}
                                                                {/*<input type="text" className="form-group__input-text form-control" id="tax-code" />*/}
                                                                    {/*<label className="form-group__label" htmlFor="tax-code">Tax code</label>*/}
                                                                    {/*<div className="form-group__helper"></div>*/}
                                                            {/*</div>*/}
                                                            {/*<div className="form-group pt-0">*/}
                                                                {/*<input type="submit" value="Convert" className="button_blue btn btn-outline-primary" />*/}
                                                            {/*</div>*/}
                                                        {/*</form>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                            {/*<div className="block-item" id="subscriptions">*/}
                                                {/*<div className="block-item__title">E-mail subscriptions</div>*/}
                                                {/*<div className="row">*/}
                                                    {/*<div className="col-md-6">*/}
                                                        {/*<div className="light-text">If you are not interested in receiving this content, please uncheck the box below to unsubscribe</div>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="col-md-6">*/}
                                                        {/*<form action="" className="" method="">*/}
                                                            {/*<div className="form-group form-group-inline pt-0">*/}
                                                                {/*<div className="row double-2 input-group">*/}
                                                                    {/*<div className="col-md-10">*/}
                                                                        {/*<input type="checkbox" className="form-group__hidden-input" id="system-notification" />*/}
                                                                            {/*<label className="form-group__label form-group__label__inline" htmlFor="system-notification">System e-mail notifications</label>*/}
                                                                            {/*<div className="form-group__helper form-group__helper__inline">You can not turn them off</div>*/}
                                                                    {/*</div>*/}
                                                                    {/*<div className="col-md-2">*/}
                                                                        {/*<div className="form-group__switcher"></div>*/}
                                                                    {/*</div>*/}
                                                                {/*</div>*/}
                                                            {/*</div>*/}
                                                            {/*<div className="form-group form-group-inline pt-0">*/}
                                                                {/*<div className="row double-2 input-group">*/}
                                                                    {/*<div className="col-md-10">*/}
                                                                        {/*<input type="checkbox" className="form-group__hidden-input" id="newsletter-subscription" />*/}
                                                                            {/*<label className="form-group__label form-group__label__inline" htmlFor="newsletter-subscription">Our newsletter subscription</label>*/}
                                                                            {/*<div className="form-group__helper form-group__helper__inline">We will not spam you</div>*/}
                                                                    {/*</div>*/}
                                                                    {/*<div className="col-md-2">*/}
                                                                        {/*<div className="form-group__switcher"></div>*/}
                                                                    {/*</div>*/}
                                                                {/*</div>*/}
                                                            {/*</div>*/}
                                                            {/*<div className="form-group form-group-inline pt-0">*/}
                                                                {/*<div className="row double-2 input-group">*/}
                                                                    {/*<div className="col-md-10">*/}
                                                                        {/*<input*/}
                                                                            {/*type="checkbox"*/}
                                                                            {/*className="form-group__hidden-input"*/}
                                                                            {/*id="funny-cat"*/}
                                                                            {/*// checked*/}
                                                                        {/*/>*/}
                                                                            {/*<label className="form-group__label form-group__label__inline" htmlFor="funny-cat">Funny cat video feed</label>*/}
                                                                            {/*<div className="form-group__helper form-group__helper__inline">You can not turn them off</div>*/}
                                                                    {/*</div>*/}
                                                                    {/*<div className="col-md-2">*/}
                                                                        {/*<div className="form-group__switcher form-group__switcher_on"></div>*/}
                                                                    {/*</div>*/}
                                                                {/*</div>*/}
                                                            {/*</div>*/}
                                                        {/*</form>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                            <div className="block-item" id="delete-account">
                                                <div className="block-item__title">Delete Account</div>
                                                <div className="light-text">This action will delete your Apps and Dat</div>
                                                <div className="block-item__buttons"><a href="" className="button_red btn btn-outline-primary">Delete</a> </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix"> </div>
                            </div>
                        </div>
                    </div>
                    {/*<Tokens />*/}
                    {/*<CliToken />*/}
                    {/*<ConvertCompany />*/}
                    {/*<Subscription />*/}
                    {/*<DeleteAccount />*/}
                </div>;
        } else {
            isFetchingComponent = <Spinner />;
        }
        return (
            <div>
                { isFetchingComponent }
            </div>
        );
    }
}

Account.propTypes = {
    onLoadProfileData: PropTypes.func,
    GetProfileReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        GetProfileReducer: state.GetProfileReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadProfileData: () => {
            dispatch(getProfile());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
