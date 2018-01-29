import axios from 'axios';
import { browserHistory } from 'react-router';
import cloneDeep from 'clone-deep';

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

	    const splitContainers = cloneDeep(data.containers);
	    splitContainers.map(item => {
		    delete item.id;
		    if (item.ports[0].containerPort) {
			    item.ports.map(includePorts => {
				    delete includePorts.id;
				    delete includePorts.index;
			    });
		    } else {
			    item.ports = [];
		    }
		    if (item.env[0].value) {
			    item.env.map(includeEnvs => {
				    delete includeEnvs.id;
				    delete includeEnvs.index;
			    });
		    } else {
			    item.env = [];
		    }
		    if (item.volumeMounts.length) {
			    item.volumeMounts.map(volumeMountsEnvs => {
				    if (!volumeMountsEnvs.subPath) {
					    delete volumeMountsEnvs.subPath;
				    }
				    delete volumeMountsEnvs.id;
				    delete volumeMountsEnvs.index;
			    });
		    } else {
			    item.volumeMounts = [];
		    }
		    if (!item.command.length) {
			    delete item.command;
		    	// item.command = [];
		    }
        });

        let labels = {};
        data.labels.map(item => {
            const key = item.key;
            const label = item.label;
	        labels = {
                ...labels,
		        [key]: label
            };
        });

	    // console.log('containers', {
		 //    name: data.name,
		 //    labels,
		 //    replicas: data.replicas,
		 //    containers: splitContainers
	    // });

        return axios.post(
            WEB_API + `/api/namespaces/${idName}/deployments`,
            {
                name: data.name,
                labels,
                replicas: data.replicas,
                containers: splitContainers
            },
            {
                headers: {
                    'Authorization': token,
                    'User-Client': browser,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=-1, private'
                },
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
            .then(response => {
                if (response.status === 201) {
                    dispatch(receiveCreateDeployment(response.data, response.status, data.name));
                    if (typeof window !== 'undefined') {
                        browserHistory.push('/Namespaces');
                    }
                } else if (response.status === 401) {
                    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                        localStorage.removeItem('id_token');
                        browserHistory.push('/Login');
                    }
                } else {
                    dispatch(failCreateDeployment(response.data.message, response.status, data.name));
                }
            }).catch(err => {dispatch(failCreateDeployment(err.toString(), 503, data.name)); console.log(err)})
    };
}
function requestCreateDeployment() {
    return {
        type: CREATE_DEPLOYMENT_REQUEST,
        isFetching: true
    };
}

function receiveCreateDeployment(data, status, idDep) {
    return {
        type: CREATE_DEPLOYMENT_SUCCESS,
        isFetching: false,
        data,
        status,
        idDep
    };
}

function failCreateDeployment(message, status, idDep) {
    return {
        type: CREATE_DEPLOYMENT_FAILURE,
        isFetching: false,
        message,
        status,
        idDep
    };
}
