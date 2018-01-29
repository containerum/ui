import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import NavLink from '../../../components/NavLink';
import { GetReleasesGithub } from '../../../actions/GetReleasesGithubActions';
import { getPlatform } from '../../../functions/getPlatform';

class ButtonCreateDeployment extends Component {
    componentDidMount() {
        if (!Object.keys(this.props.GetReleasesGithubReducer.data).length) {
            this.props.onGetReleasesGithub();
        }
    }
    render() {
        const { linkPlatform } = getPlatform(this.props.GetReleasesGithubReducer.data);
        return (
            <div className="container-fluid pt-3 pb-5">
                <h5>Deployments</h5>
                <div className="row">
                    <div className="col-12">
                        <div className="card i-card-border mt-3">
                            <div className="card-block c-table-card-block">
                                <div className="table table-hover c-table-card i-table-card">
                                    <div className="i-table-tbody">
                                        <div className="i-row-table">
                                            <div className="i-td-table">
                                                Deployment is a controller that contains one or several containers, united into Pods. <br /> <br />
                                                To create a new Deployment use our <a className="documentation-link" href={linkPlatform}>CLI Tool</a> and refer to our <a className="documentation-link" href="https://containerum.com/documentation/Start-Guide" target="_blank">Documentation</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ButtonCreateDeployment.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonCreateDeployment);
