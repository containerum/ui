import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    CREATE_DEPLOYMENT_REQUEST,
    CREATE_DEPLOYMENT_SUCCESS,
    CREATE_DEPLOYMENT_FAILURE
} from '../../constants/CreateDeploymentConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function createDeployment(idName, data) {
    return dispatch => {
        dispatch(requestCreateDeployment());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        let labels = {};
        data.labels.map(item => {
            const key = item.key;
            const label = item.label;
	        labels = {
                ...labels,
		        [key]: label
            };
        });
        return axios.post(
            WEB_API + `/api/namespaces/${idName}/deployments`,
            {
                name: data.name,
                labels,
                replicas: 1,
                containers: [
                    {
                        image: "python",
                        name: "deplo5",
                        resources: {
                            requests: {
                                cpu: "100m",
                                memory: "128Mi"
                            }
                        },
                        ports: [
                            {
                                containerPort: 8080
                            },
                            {
                                containerPort: 443
                            },
                            {
                                containerPort: 5000
                            }
                        ],
                        env: [
                            {
                                value: "value",
                                name: "key"
                            }
                        ],
                        command: [
                            "git",
                            "pull",
                            "origin"
                        ]
                    }
                ]
            },
            {
                headers: {
                    'Authorization': token,
                    'X-User-Fingerprint': browser,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
            .then(response => {
                if (response.status === 201) {
                    dispatch(receiveCreateDeployment(response.data, response.status, idName));
                    if (typeof window !== 'undefined') {
                        browserHistory.push('/Namespaces');
                    }
                } else if (response.status === 401) {
                    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                        localStorage.removeItem('id_token');
                        browserHistory.push('/Login');
                    }
                } else {
                    dispatch(failCreateDeployment(response.data.message, response.status, idName));
                }
            }).catch(err => {dispatch(failCreateDeployment(err.toString(), 503, idName)); console.log(err)})
    };
}
function requestCreateDeployment() {
    return {
        type: CREATE_DEPLOYMENT_REQUEST,
        isFetching: true
    };
}

function receiveCreateDeployment(data, status, idName) {
    return {
        type: CREATE_DEPLOYMENT_SUCCESS,
        isFetching: false,
        data,
        status,
        idName
    };
}

function failCreateDeployment(message, status, idName) {
    return {
        type: CREATE_DEPLOYMENT_FAILURE,
        isFetching: false,
        message,
        status,
        idName
    };
}
