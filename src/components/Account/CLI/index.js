import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Scrollbars } from 'react-custom-scrollbars';
import ReactGA from 'react-ga';

import Spinner from '../../Spinner';
import arrows from '../../../images/arrows.png';
import { GetReleasesGithub } from '../../../actions/GetReleasesGithubActions';
import { getPlatform } from '../../../functions/getPlatform';

class CLI extends Component {
    componentDidMount() {
        if (!Object.keys(this.props.GetReleasesGithubReducer.data).length) {
            this.props.onGetReleasesGithub();
        }
    }
    handleClickAnaliticsDownloadCLIAccount() {
        ReactGA.event({
            category: 'UI',
            action: 'UI_account_CLI_download'
        });
    }
    render() {
        let isFetchingComponent = '';
        const {
            buttonPlatformContent,
            linkPlatform,
            version,
            size
        } = getPlatform(this.props.GetReleasesGithubReducer.data);
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
                            <a
                                target="_blank"
                                href={linkPlatform}
                                className="block-item__download"
                                onClick={() => this.handleClickAnaliticsDownloadCLIAccount()}
                            >
                                <span className="block-item__download-title">{buttonPlatformContent}</span>
                                <span className="block-item__download-note">Version {version} / {size} MB </span>
                                <span className="block-item__download-arrow">
                                    <img src={arrows} alt="" />
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
