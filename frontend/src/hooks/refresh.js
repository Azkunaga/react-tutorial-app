import {normalAxios,authAxios} from '../api/axios';

const refresh = async() => {
    let user = JSON.parse(localStorage.getItem('userData'));

    const response = await normalAxios.post('/api/auth/refresh', {
        withCredentials: true
    });

    user.accessToken = response.data.accessToken;
    localStorage.setItem('userData',JSON.stringify(user));

    return response.data.accessToken;

};

export default refresh;