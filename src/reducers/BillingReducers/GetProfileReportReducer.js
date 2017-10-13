import {
    GET_PROFILE_REPORT_REQUEST,
    GET_PROFILE_REPORT_SUCCESS,
    GET_PROFILE_REPORT_FAILURE
} from '../../constants/BillingConstants';

export default function GetProfileReportReducer(state = {
    isFetching: false,
    data: [],
    errorMessage: ''
}, action) {
    switch (action.type) {
        case GET_PROFILE_REPORT_REQUEST:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorMessage: '',
                data: {}
            });
        case GET_PROFILE_REPORT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                data: action.data
            });
        case GET_PROFILE_REPORT_FAILURE:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorMessage: action.message
            });
        default:
            return state;
    }
}
