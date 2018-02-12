import axios from 'axios';
import { browserHistory } from 'react-router';
import cloneDeep from 'clone-deep';

import {
    UPDATE_DEPLOYMENT_REQUEST,
    UPDATE_DEPLOYMENT_SUCCESS,
    UPDATE_DEPLOYMENT_FAILURE
} from '../../constants/UpdateDeploymentConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function updateDeployment(idName, idDep, data) {
    return dispatch => {
        dispatch(requestUpdateDeployment());
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

        // let labels = {};
        // data.labels.map(item => {
        //     const key = item.key;
        //     const label = item.label;
	     //    labels = {
        //         ...labels,
		 //        [key]: label
        //     };
        // });

	    // console.log('containers', {
		 //    name: data.name,
		 //    labels: data.labels,
		 //    replicas: data.replicas,
		 //    containers: splitContainers
	    // });

        return axios.put(
            WEB_API + `/api/namespaces/${idName}/deployments/${idDep}`,
            {
                name: data.name,
                labels: data.labels,
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
                if (response.status === 202) {
                    dispatch(receiveUpdateDeployment(response.data, response.status, response.config.method, data.name));
                    if (typeof window !== 'undefined') {
                        browserHistory.push('/Namespaces');
                    }
                } else if (response.status === 401) {
                    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                        localStorage.removeItem('id_token');
                        browserHistory.push('/Login');
                    }
                } else {
                    dispatch(failUpdateDeployment(response.data.message, response.status, data.name));
                }
            }).catch(err => {dispatch(failUpdateDeployment(err.toString(), 503, data.name)); console.log(err)})
    };
}
function requestUpdateDeployment() {
    return {
        type: UPDATE_DEPLOYMENT_REQUEST,
        isFetching: true
    };
}

function receiveUpdateDeployment(data, status, method, idDep) {
    return {
        type: UPDATE_DEPLOYMENT_SUCCESS,
        isFetching: false,
        data,
	    method,
        status,
        idDep
    };
}

function failUpdateDeployment(message, status, idDep) {
    return {
        type: UPDATE_DEPLOYMENT_FAILURE,
        isFetching: false,
        message,
        status,
        idDep
    };
}
