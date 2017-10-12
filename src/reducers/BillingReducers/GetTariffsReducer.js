import {
    GET_TARIFFS_REQUEST,
    GET_TARIFFS_SUCCESS,
    GET_TARIFFS_FAILURE
} from '../../constants/TariffsConstants';

export default function GetTariffsReducer(state = {
    isFetching: false,
    data: {},
    errorMessage: ''
}, action) {
    switch (action.type) {
        case GET_TARIFFS_REQUEST:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                data: {},
                errorMessage: ''
            });
        case GET_TARIFFS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                data: action.data
            });
        case GET_TARIFFS_FAILURE:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorMessage: action.message
            });
        default:
            return state;
    }
}
