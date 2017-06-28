import {
    EMAIL_SUBSCRIPTIONS_REQUEST,
    EMAIL_SUBSCRIPTIONS_SUCCESS,
    EMAIL_SUBSCRIPTIONS_FAILURE
} from '../constants/SubscriptionsEmailConstains';

export default function EmailSubscriptionsReducer(state = {
    isFetching: false,
    errorMessage: ''
}, action) {
    switch (action.type) {
    case EMAIL_SUBSCRIPTIONS_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    case EMAIL_SUBSCRIPTIONS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case EMAIL_SUBSCRIPTIONS_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state
    }
}