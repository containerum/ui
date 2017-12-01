import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getVolumes } from '../../actions/VolumesActions';
import { getProfileBalance } from '../../actions/BillingActions/getProfileBalanceAction';
import VolumesContainer from './VolumesContainer';

class Volumes extends Component {
    componentDidMount() {
	    this.props.onGetVolumes();
	    this.props.onGetProfileBalance();
    }
    render() {
        // console.log(this.props.VolumesReducer);
        return (
            <div>
                <div className="content-block">
                    <div className="container no-back">
                        <VolumesContainer/>
                    </div>
                </div>
            </div>
        );
    }
}

Volumes.propTypes = {
    errorMessage: PropTypes.string,
	onGetProfileBalance: PropTypes.func,
    onGetVolumes: PropTypes.func.isRequired,
    VolumesReducer: PropTypes.object
};

function mapStateToProps(state) {
    return {
        VolumesReducer: state.VolumesReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
	    onGetProfileBalance: () => {
		    dispatch(getProfileBalance());
	    },
        onGetVolumes: () => {
            dispatch(getVolumes());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Volumes);
