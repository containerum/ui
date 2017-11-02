import {
    DELETE_VOLUME_REQUEST,
    DELETE_VOLUME_SUCCESS,
    DELETE_VOLUME_FAILURE
} from '../../constants/VolumeConstants';

export default function DeleteVolumeReducer(state = {
    isFetching: false,
    status: 0,
    errorMessage: '',
    idVolume: ''
}, action) {
    switch (action.type) {
    case DELETE_VOLUME_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: '',
            status: 0,
            idVolume: ''
        });
    case DELETE_VOLUME_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            status: action.status,
            idVolume: action.idVolume
        });
    case DELETE_VOLUME_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message,
            status: action.status
        });
    default:
        return state;
    }
}
