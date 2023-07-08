import {normalAxios} from '../api/axios';

const refresh = async() => {
    let user = localStorage.getItem('userData');

    const response = await normalAxios.post('/api/auth/refresh', {
        withCredentials: true
    });

    user.accessToken = response.data.accessToken;
    localStorage.setItem('userData',user);

    return response.data.accessToken;

};

export default refresh;