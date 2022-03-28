import axios from "axios";
import { useHistory } from "react-router-dom";
import { AppConstants } from "../constants/app-constants";
import { PagePath } from "../constants/page-path";

export const appApi = axios.create({
    headers : {
     'Accept': 'application/json',
     'Authorization': `Bearer ${localStorage.getItem(AppConstants.token)}`,
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*'
    }
});

const refreshAccessTokenUrl = `${AppConstants.apiUrl_v1}/auth/refresh`;
async function refreshAccessToken(){
    return appApi.post(
        refreshAccessTokenUrl, 
        { refreshToken: localStorage.getItem(AppConstants.refreshToken)}
    );
}

appApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if(error.response.status == 401 && originalRequest.url == refreshAccessTokenUrl){
            localStorage.clear();
            const history = useHistory();
            history.push(PagePath.login);
        }
        else if((error.response.status == 403 || error.response.status == 401) && !originalRequest._retry){
            originalRequest._retry = true;            
            const refreshResponse = await refreshAccessToken();
            
            if(error.response.status == 401 && originalRequest.url == refreshAccessTokenUrl){
                localStorage.clear();
                const history = useHistory();
                history.push(PagePath.login);
            }
            else if(refreshResponse.data.result){
                localStorage.clear();
                localStorage.setItem(AppConstants.token, refreshResponse.data.result.accessToken);
                localStorage.setItem(AppConstants.refreshToken, refreshResponse.data.result.refreshToken);
            }

            return appApi(originalRequest);
        }

        console.log(error);
        return error;
    }
)