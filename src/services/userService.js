import http from './httpService';


const apiEndpoint = "/users";

export const registerUser = (user)=>{
    return http.post(apiEndpoint,{
        email : user.username,
        password: user.password,
        name: user.name,
    });

}