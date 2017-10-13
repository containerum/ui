import {
    GET_PROFILE_BALANCE_REQUEST,
    GET_PROFILE_BALANCE_SUCCESS,
    GET_PROFILE_BALANCE_FAILURE
} from '../../constants/BillingConstants';

export default function GetProfileBalanceReducer(state = {
    isFetching: false,
    data: {},
    errorMessage: ''
}, action) {
    switch (action.type) {
        case GET_PROFILE_BALANCE_REQUEST:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorMessage: '',
                data: {}
            });
        case GET_PROFILE_BALANCE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                data: action.data
            });
        case GET_PROFILE_BALANCE_FAILURE:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorMessage: action.message
            });
        default:
            return state;
    }
}
