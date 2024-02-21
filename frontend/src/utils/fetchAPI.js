import axios from 'axios';

// Add backend api url
export const baseURL = 'http://dev-todo-app.com/api/v1/';

axios.interceptors.request.use(
    (config) => {
        let token = JSON.parse(localStorage.getItem('user'))?.token

        if (token) {
            config.headers.Authorization = "Bearer " + token
        }
        config.baseURL = baseURL
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status == 401) {
        localStorage.removeItem('user')
        window.location.href = '/login';
    }
    return Promise.reject(error);
})

export function post(url, data, contentType = "application/json", method = "POST") {
    return axios({
        method: method,
        url: url,
        data: data,
        headers: {
            'Content-Type': contentType,
            '_method': method
        }
    })
}

export function put(url, data, contentType = "application/json") {
    return axios({
        method: 'PUT',
        url: url,
        data: data,
        headers: {
            'Content-Type': contentType,
        }
    })
}

export function get(url) {
    return axios({
        method: 'GET',
        url: url,
    })
}

export function getWithParams(url, params) {
    return axios({
        method: 'GET',
        url: url,
        params: params,
    })
}

export function del(url) {
    return axios({
        method: 'DELETE',
        url: url,
    })
}
