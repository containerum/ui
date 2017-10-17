import {
    PAY_FOR_REQUEST,
    PAY_FOR_SUCCESS,
    PAY_FOR_FAILURE
} from '../../constants/BillingConstants';

export default function PayForReducer(state = {
    isFetching: false,
    data: '',
    errorMessage: '',
    status: 0
}, action) {
    switch (action.type) {
        case PAY_FOR_REQUEST:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                data: '',
                errorMessage: ''
            });
        case PAY_FOR_SUCCESS:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                data: action.data
            });
        case PAY_FOR_FAILURE:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorMessage: action.message,
                status: action.status
            });
        default:
            return state;
    }
}
