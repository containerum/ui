import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { GetReleasesGithub } from '../../../actions/GetReleasesGithubActions';
import { getPlatform } from '../../../functions/getPlatform';

class NotFoundServices extends Component {
    componentDidMount() {
        if (!Object.keys(this.props.GetReleasesGithubReducer.data).length) {
            this.props.onGetReleasesGithub();
        }
    }
    render() {
        const { linkPlatform } = getPlatform(this.props.GetReleasesGithubReducer.data);
        return (
            <div>
                <div className="content-block-content full">
                    <div className="tab-content">
                        <div className="tab-pane deployments active">
                            <table className="content-block__table table" width="1170">
                                <thead>
                                <tr>
                                    <td className="td-1">
                                        Service provides internal and/or external access to a Pod. <br/> <br/>
                                        To create a new Deployment use our <a className="documentation-link" href={linkPlatform}>CLI Tool</a> and refer to our <a className="documentation-link" href="https://containerum.com/documentation/Start-Guide" target="_blank">Documentation</a>
                                    </td>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NotFoundServices.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundServices);
