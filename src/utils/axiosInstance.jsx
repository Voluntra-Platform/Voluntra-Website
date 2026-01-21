import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://3.111.42.62/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
}); 

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refresh = localStorage.getItem("refresh_token");

            if (refresh) {
                try {
                    const res = await axios.post("http://3.111.42.62/api/auth/jwt/refresh/", { refresh });
                    const newAccess = res.data.access;

                    localStorage.setItem("access_token", newAccess);
                    originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
                    
                    return axiosInstance(originalRequest);
                } catch (err) {
                    console.error("Token refresh failed:", err);
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("user_data");
                    window.location.href = "/"; // force logout
                }
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;