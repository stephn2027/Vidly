import http from './httpService';
import {apiUrl} from '../config.json';

const apiEndpoint = "/users" || apiUrl+"/auth";

export const registerUser = (user)=>{
    return http.post(apiEndpoint,{
        email : user.username,
        password: user.password,
        name: user.name,
    });

}