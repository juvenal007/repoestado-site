
import axios from 'axios';

const BaseUrl = process.env.REACT_APP_BASE_API_URL || 'http://localhost';

let api = axios.create({
    baseURL: BaseUrl
});

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status && !window.location.pathname.includes("logout") ) {
        return resetTokenAndReattemptRequest(error)
    } else {
        return Promise.reject(error);
    }
});

let isAlreadyFetchingAccessToken = false;

// This is the list of waiting requests that will retry after the JWT refresh complete
let subscribers = [];

async function resetTokenAndReattemptRequest(error) {
    try {
        const { response: errorResponse } = error;

        const access_token = localStorage.getItem('access_token')!==undefined?localStorage.getItem('access_token'):null;
        if (access_token === undefined || access_token === null) {
            // We can't refresh, throw the error anyway
            return Promise.reject(error);
        }
        // Proceed to the token refresh procedure
        // We create a new Promise that will retry the request,
        // clone all the request configuration from the failed
        // request in the error object.
        const retryOriginalRequest = new Promise(resolve => {
            // We need to add the request retry to the queue
            // since there another request that already attempt to
            // refresh the token
            addSubscriber(access_token => {
                errorResponse.config.headers.Authorization = 'Bearer ' + access_token;
                resolve(axios(errorResponse.config));
            });
        });
        if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true;
            const response = await axios({
                method: 'post',
                url: `${BaseUrl}auth/refresh`,
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                }
            }).catch(error => {
                window.location = "/logout";
                return Promise.reject(error);
            });
            if (!response.data) {
                window.location = "/logout";
                return Promise.reject(error);
            }

            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('access_token', response.data.access_token);
            isAlreadyFetchingAccessToken = false;
            onAccessTokenFetched(response.data.access_token);
        }
        return retryOriginalRequest;
    } catch (err) {
        return Promise.reject(err);
    }
}

function onAccessTokenFetched(access_token) {
    // When the refresh is successful, we start retrying the requests one by one and empty the queue
    subscribers.forEach(callback => callback(access_token));
    subscribers = [];
}

function addSubscriber(callback) {
    subscribers.push(callback);
}

export default api;