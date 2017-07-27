import axios from 'axios';

import {
    CHECK_RELATION_REQUEST,
    CHECK_RELATION_SUCCESS,
    CHECK_RELATION_FAILURE
} from '../../constants/CheckRelationWithAccountConstants';

// import { LOGINUser } from '../LoginActions';

export function checkRelationWithGoogleAccount(code) {
    return dispatch => {
        dispatch(requestCheckRelationWithAccount());
        const clientID = '862f80ac6b993a4561b2';
        const clientSecret = 'b95cf15f8a2efb8e06da871e88e9548772ba1ee1';
        const api = 'https://github.com/login/oauth/access_token';

        return axios.post(
            api,
            { code, client_id: clientID, client_secret: clientSecret },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'multipart/form-data'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200) {
                console.log(response);
                // dispatch(LOGINUser(creds));
                dispatch(receiveCheckRelationWithAccount(response.data));
            } else {
                console.log(response);
                dispatch(failCheckRelationWithAccount(response.data.message));
            }
        }).catch(err => console.log(err));
    };
}

function requestCheckRelationWithAccount() {
    return {
        type: CHECK_RELATION_REQUEST,
        isFetching: true
    };
}

function receiveCheckRelationWithAccount(data) {
    return {
        type: CHECK_RELATION_SUCCESS,
        isFetching: false,
        data
    };
}

function failCheckRelationWithAccount(message) {
    return {
        type: CHECK_RELATION_FAILURE,
        isFetching: false,
        message
    };
}
