import {
    VOLUMES_TARIFFS_REQUEST,
    VOLUMES_TARIFFS_SUCCESS,
    VOLUMES_TARIFFS_FAILURE
} from '../../constants/VolumesConstants';

export default function VolumesTariffsReducer(state = {
    isFetching: false,
    data: [],
    errorMessage: ''
}, action) {
    switch (action.type) {
    case VOLUMES_TARIFFS_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: ''
        });
    case VOLUMES_TARIFFS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case VOLUMES_TARIFFS_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
