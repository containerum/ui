import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getVolumes } from '../../actions/VolumesActions';
import VolumesContainer from './VolumesContainer';
import Spinner from '../Spinner';

class Volumes extends Component {
    componentDidMount() {
        // if (!this.props.VolumesReducer.data.length) {
            this.props.onGetVolumes();
        // }
    }
    render() {
        // console.log(this.props.VolumesReducer);
        let isFetchingComponent = '';
        if (this.props.VolumesReducer.isFetching === false) {
            isFetchingComponent = <VolumesContainer/>;
        } else {
            isFetchingComponent = <Spinner />;
        }

        return (
            <div>
                <div className="content-block">
                    <div className="container no-back">
                        { isFetchingComponent }
                    </div>
                </div>
            </div>
        );
    }
}

Volumes.propTypes = {
    errorMessage: PropTypes.string,
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
        onGetVolumes: () => {
            dispatch(getVolumes());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Volumes);
