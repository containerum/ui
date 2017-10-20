import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import arrows from '../../images/arrows.png';
import { GetReleasesGithub } from '../../actions/GetReleasesGithubActions';
import { getPlatform } from '../../functions/getPlatform';

class Footer extends Component {
    componentDidMount() {
        if (!Object.keys(this.props.GetReleasesGithubReducer.data).length) {
            this.props.onGetReleasesGithub();
        }
    }
    render() {
        const {
            linkPlatform
        } = getPlatform(this.props.GetReleasesGithubReducer.data);
        return (
            <footer className="footer">
                <div className="footer-wrapper">
                    <div className="footer-container container">
                        <div className="footer__logo">Created by Exon Lab</div>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={linkPlatform}
                            className="footer__download_cli"
                        >
                            Download CLI <img src={arrows} alt="Download CLI" />
                        </a>
                        <a
                            target="_blank"
                            href="https://containerum.com/documentation"
                            className="footer__help"
                        >
                            Docs
                        </a>
                    </div>
                </div>
            </footer>
        );
    }
}

Footer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
