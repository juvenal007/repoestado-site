import axios from './axios';

export default (url, type, parameters, callback, pureParameters = false) => {
    let params = pureParameters?parameters:{data: parameters};
    let access_token = localStorage.getItem('access_token')!==undefined?localStorage.getItem('access_token'):null;
    let header = {};
    if(access_token!==null){
        header = {
            headers: {
                "Authorization": `Bearer ${access_token}`,
            }
        };
    }

    switch (type.toUpperCase()) {
        case 'GET':
		    axios.get(url, header).then(res => {
                let re = res.data.response;
                if(re.status)
                    callback(re.status, re.data, re.message);
                else
                    callback(re.status, re.data, re.message, re);
			}).catch(err => {
				console.log('ERROR_FETCH:', err);
				const data = err.response.data.hasOwnProperty("response")?err.response.data.response.data:null;
                const msg = err.response.data.hasOwnProperty("response")?err.response.data.response.message:err;
                callback(false, data, msg, err.response.data.response);
			});
            break;
        case 'POST':
            axios.post(url, params, header).then(res => {
                let re = res.data.response;
                if(re.status)
                    callback(re.status, re.data, re.message);
                else
                    callback(re.status, re.data, re.message, re);
            }).catch(err => {
                console.log('ERROR_FETCH:', err);
                if(err.hasOwnProperty("response")){
                    const data = err.response.data.hasOwnProperty("response")?err.response.data.response.data:null;
                    const msg = err.response.data.hasOwnProperty("response")?err.response.data.response.message:err;
                    callback(false, data, msg, err.response.data.response);
                }else{
                    callback(false, null, err, err);
                }
                
            });
            break;
        case 'PUT':
            axios.put(url, params, header).then(res => {
                let re = res.data.response;
                if(re.status)
                    callback(re.status, re.data, re.message);
                else
                    callback(re.status, re.data, re.message, re);
            }).catch(err => {
                console.log('ERROR_FETCH:', err);
                const data = err.response.data.hasOwnProperty("response")?err.response.data.response.data:null;
                const msg = err.response.data.hasOwnProperty("response")?err.response.data.response.message:err;
                callback(false, data, msg, err.response.data.response);
            });
            break;
        case 'DELETE':
            axios.delete(url, header).then(res => {
                let re = res.data.response;
                if(re.status)
                    callback(re.status, re.data, re.message);
                else
                    callback(re.status, re.data, re.message, re);
            }).catch(err => {
                console.log('ERROR_FETCH:', err);
                const data = err.response.data.hasOwnProperty("response")?err.response.data.response.data:null;
                const msg = err.response.data.hasOwnProperty("response")?err.response.data.response.message:err;
                callback(false, data, msg, err.response.data.response);
            });
            break;
        case 'LOGIN':
            axios.post(url, params).then(res => {
                let data = {
                    user: res.data.user,
                    access_token: res.data.access_token,
                }
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('access_token', data.access_token);
                callback(true, data, "Login exitoso!");
            }).catch(err => {
                console.log('ERROR_FETCH:', err.response);
                const data = err.response.data.hasOwnProperty("response")?err.response.data.response.data:null;
                const msg = err.response.data.hasOwnProperty("response")?err.response.data.response.message:err;
                callback(false, data, msg, err.response.data.response);
            });
            break;

        case 'LOGOUT':
            axios.post(url, {}, header).then(res => {
                localStorage.removeItem('user');
                localStorage.removeItem('access_token');
                callback(true, null, "Fin de sesión!");
            }).catch(err => {
                if(err.response.status === 401){
                    localStorage.removeItem('user');
                    localStorage.removeItem('access_token');
                    callback(true, null, "Fin de sesión!");
                    return;
                }
                console.log('ERROR_FETCH:', err.response);
                callback(false, null, null, err);
            });
            break;
        case 'MULTIPART':
            axios({
                method: 'POST',
                data: parameters,
                url: url,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${access_token}`,
                },
            }).then(res => {
                let re = res.data.response;
                if(re.status)
                    callback(re.status, re.data, re.message);
                else
                    callback(re.status, re.data, re.message, re);
            }).catch(err => {
                console.log('ERROR_FETCH:', err);
                const data = err.response.data.hasOwnProperty("response")?err.response.data.response.data:null;
                const msg = err.response.data.hasOwnProperty("response")?err.response.data.response.message:err;
                callback(false, data, msg, err.response.data.response);
            });
            break;
        default:
            callback(false, null, "METHOD NOT FOUND");
            break;
    }
}
