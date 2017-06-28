import axios from 'axios';

import {
    CONVERT_TO_COMPANY_REQUEST,
    CONVERT_TO_COMPANY_SUCCESS,
    CONVERT_TO_COMPANY_FAILURE
} from '../../constants/ConvertToCompanyConstains';

import {
    WEB_API
} from '../../constants/WebApi';

export function convertToCompany(data) {
    return dispatch => {
        dispatch(requestConvertToCompany());
        console.log(data);
        return axios.post(
            WEB_API + '/api/convert_company',
            { code: data.code, company: data.company },
            {
                validateStatus: (status) =>
                status >= 200 && status <= 505
            }
        )
        .then(response => {
            if (response.status === 200) {
                console.log(response);
                dispatch(receiveConvertToCompany());
            } else {
                dispatch(errorConvertToCompany(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestConvertToCompany() {
    return {
        type: CONVERT_TO_COMPANY_REQUEST,
        isFetching: true
    }
}

function receiveConvertToCompany(data) {
    return {
        type: CONVERT_TO_COMPANY_SUCCESS,
        isFetching: false,
        data
    }
}

function errorConvertToCompany(message) {
    return {
        type: CONVERT_TO_COMPANY_FAILURE,
        isFetching: false,
        message
    }
}
