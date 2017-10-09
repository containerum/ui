import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Scrollbars } from 'react-custom-scrollbars';

import Spinner from '../../Spinner';
import arrows from '../../../images/arrows.png';
import { GetReleasesGithub } from '../../../actions/GetReleasesGithubActions';

class CLI extends Component {
    componentDidMount() {
        this.props.onGetReleasesGithub();
    }
    render() {
        let isFetchingComponent = '';

        let buttonPlatformContent = 'CLI';
        let linkPlatform = 'https://github.com/containerum/chkit/releases/latest';
        let version = Object.keys(this.props.GetReleasesGithubReducer.data).length ? this.props.GetReleasesGithubReducer.data.tag_name : 'v.2.14';
        let size = '222202';

        const windowAgent = window ? window.navigator.userAgent : undefined;
        if (windowAgent) {
            const platformToLowerCase = windowAgent.toLowerCase();
            const platformMac = platformToLowerCase.indexOf('mac') + 1;
            const platformLinux = platformToLowerCase.indexOf('linux') + 1;
            const platformWindows = platformToLowerCase.indexOf('win') + 1;
            const platformX64 = platformToLowerCase.indexOf('64') + 1;
            const platformArm = platformToLowerCase.indexOf('arm') + 1;
            const objBrowserDownloadUrl = {
                linuxArm: {},
                linuxX64: {},
                linuxX86: {},
                macX64: {},
                winX64: {},
                winX86: {}
            };
            Object.keys(this.props.GetReleasesGithubReducer.data).length ? this.props.GetReleasesGithubReducer.data.assets.map((item) => {
                const currentLowerItem = item.browser_download_url.toLowerCase();
                const browserDownloadUrl = item.browser_download_url;
                if (currentLowerItem.indexOf('linux_arm') + 1) {
                    objBrowserDownloadUrl.linuxArm.url = browserDownloadUrl;
                    // console.log(item.size);
                    objBrowserDownloadUrl.linuxArm.size = item.size;
                } else if (currentLowerItem.indexOf('linux_x64') + 1) {
                    objBrowserDownloadUrl.linuxX64.url = browserDownloadUrl;
                    objBrowserDownloadUrl.linuxX64.size = item.size;
                } else if (currentLowerItem.indexOf('linux_x86') + 1) {
                    objBrowserDownloadUrl.linuxX86.url = browserDownloadUrl;
                    objBrowserDownloadUrl.linuxX86.size = item.size;
                } else if (currentLowerItem.indexOf('mac_x64') + 1) {
                    objBrowserDownloadUrl.macX64.url = browserDownloadUrl;
                    objBrowserDownloadUrl.macX64.size = item.size;
                } else if (currentLowerItem.indexOf('windows_x64') + 1) {
                    objBrowserDownloadUrl.winX64.url = browserDownloadUrl;
                    objBrowserDownloadUrl.winX64.size = item.size;
                } else if (currentLowerItem.indexOf('windows_x86') + 1) {
                    objBrowserDownloadUrl.winX86.url = browserDownloadUrl;
                    objBrowserDownloadUrl.winX86.size = item.size;
                }
            }) : [];
            if (platformMac) {
                buttonPlatformContent = 'CLI for MacOS';
                if (objBrowserDownloadUrl.macX64.url) linkPlatform = objBrowserDownloadUrl.macX64.url;
                if (objBrowserDownloadUrl.macX64.size) size = objBrowserDownloadUrl.macX64.size;
            } else if (platformLinux) {
                buttonPlatformContent = 'CLI for Linux';
                if (platformArm) {
                    if (objBrowserDownloadUrl.linuxArm.url) linkPlatform = objBrowserDownloadUrl.linuxArm.url;
                    if (objBrowserDownloadUrl.linuxArm.size) size = objBrowserDownloadUrl.linuxArm.size;
                } else if (platformX64) {
                    if (objBrowserDownloadUrl.linuxX64.url) linkPlatform = objBrowserDownloadUrl.linuxX64.url;
                    if (objBrowserDownloadUrl.linuxX64.size) size = objBrowserDownloadUrl.linuxX64.size;
                } else {
                    if (objBrowserDownloadUrl.linuxX86.url) linkPlatform = objBrowserDownloadUrl.linuxX86.url;
                    if (objBrowserDownloadUrl.linuxX86.size) size = objBrowserDownloadUrl.linuxX86.size;
                }
            } else if (platformWindows) {
                buttonPlatformContent = 'CLI for Windows';
                if (platformX64) {
                    if (objBrowserDownloadUrl.winX64.url) linkPlatform = objBrowserDownloadUrl.winX64.url;
                    if (objBrowserDownloadUrl.winX64.size) size = objBrowserDownloadUrl.winX64.size;
                } else {
                    if (objBrowserDownloadUrl.winX86.url) linkPlatform = objBrowserDownloadUrl.winX86.url;
                    if (objBrowserDownloadUrl.winX86.size) size = objBrowserDownloadUrl.winX86.size;
                }
            }
        }
        size = (size / 1048576).toFixed(2);
        if (this.props.GetReleasesGithubReducer.isFetching === false) {
            isFetchingComponent =
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
                            <a target="_blank" href={linkPlatform} className="block-item__download">
                                <span className="block-item__download-title">{buttonPlatformContent}</span>
                                <span className="block-item__download-note">Version {version} / {size} MB </span>
                                <span className="block-item__download-arrow">
                                <img src={arrows} alt="Download CLI" />
                            </span>
                            </a>
                            <a target="_blank" href="https://github.com/containerum/chkit/releases/latest" className="block-item__download block-item__download_alt">
                                <span className="block-item__download-title">or</span>
                                <span className="block-item__download-note">CLI for other platform</span>
                            </a>
                        </div>
                    </div>
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

CLI.propTypes = {
    GetReleasesGithubReducer: PropTypes.object,
    onGetReleasesGithub: PropTypes.func
};

function mapStateToProps(state) {
    return {
        GetReleasesGithubReducer: state.GetReleasesGithubReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetReleasesGithub: () => {
            dispatch(GetReleasesGithub());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CLI);
