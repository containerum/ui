import {
    CONVERT_TO_COMPANY_REQUEST,
    CONVERT_TO_COMPANY_SUCCESS,
    CONVERT_TO_COMPANY_FAILURE
} from '../../constants/ConvertToCompanyConstains';

export default function ConvertToCompanyReducer(state = {
    isFetching: false,
    errorMessage: ''
}, action) {
    switch (action.type) {
    case CONVERT_TO_COMPANY_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: ''
        });
    case CONVERT_TO_COMPANY_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case CONVERT_TO_COMPANY_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
