import {
    COUPON_PAY_REQUEST,
    COUPON_PAY_SUCCESS,
    COUPON_PAY_FAILURE
} from '../../constants/BillingConstants';

export default function CouponPayReducer(state = {
    isFetching: false,
    data: '',
	coupon: '',
    errorMessage: '',
    status: 0
}, action) {
    switch (action.type) {
        case COUPON_PAY_REQUEST:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                data: '',
                errorMessage: '',
	            status: 0
            });
        case COUPON_PAY_SUCCESS:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                data: action.data,
	            coupon: action.coupon,
	            status: action.status
            });
        case COUPON_PAY_FAILURE:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                errorMessage: action.message,
                status: action.status
            });
        default:
            return state;
    }
}
