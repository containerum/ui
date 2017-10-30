import {
    UPDATE_VOLUME_REQUEST,
    UPDATE_VOLUME_SUCCESS,
    UPDATE_VOLUME_FAILURE
} from '../../constants/VolumeConstants';

export default function UpdateVolumeReducer(state = {
    isFetching: false,
    data: {},
    status: '',
    method: '',
    idVolume: '',
    errorMessage: ''
}, action) {
    switch (action.type) {
    case UPDATE_VOLUME_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: {},
            errorMessage: '',
            status: '',
            method: '',
            idVolume: ''
        });
    case UPDATE_VOLUME_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data,
            status: action.status,
            method: action.method,
            idVolume: action.idVolume
        });
    case UPDATE_VOLUME_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message,
            status: action.status,
            idVolume: action.idVolume
        });
    default:
        return state;
    }
}
