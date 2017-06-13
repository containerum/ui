import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getServices } from '../../actions/ServicesActions';
import Posts from './Posts';
// import Spinner from '../Spinner';

class Services extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getServices(this.props.idName));
    }
    render() {
        let isFetchingComponent = "";
        if (this.props.ServicesReducer.isFetching === false) {
            isFetchingComponent =
                <Posts
                    servicesDataReducer={this.props.ServicesReducer.data}
                    servicesErrorMessageReducer={this.props.ServicesReducer.errorMessage}
                    servicesStatusErrorReducer={this.props.ServicesReducer.statusError}
                    idName={this.props.idName}
                />
        }
        // else {
        //     isFetchingComponent = <Spinner />
        // }

        return (
            <div>
                { isFetchingComponent }
            </div>
        );
    }
}

Services.propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    idName: PropTypes.string
};

function mapStateToProps (state) {
    const { ServicesReducer } = state;
    const { errorMessage } = ServicesReducer;

    return {
        errorMessage,
        ServicesReducer
    }
}

export default connect(mapStateToProps)(Services)
