import axios from "axios";
import { appConstants } from "../constants/appConstants";

export const appApi = axios.create({
    headers : {
     'Accept': 'application/json',
     'Authorization': `Bearer ${localStorage.getItem(appConstants.token)}`,
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*'
    }
});

async function refreshAccessToken(){
    return appApi.post(
        `${appConstants.apiUrl}/auth/refresh`, 
        { refreshToken: localStorage.getItem(appConstants.refreshToken)}
    );
}

appApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if(error.response.status === 403 && !originalRequest._retry){
            originalRequest._retry = true;            
            const refreshResponse = await refreshAccessToken();
            // localStorage.setItem(appConstants.token, refreshResponse.data.token);
            return appApi(originalRequest);
        }
        else if(error.response === 401){
            // redirect ot login?
        }
    }
)