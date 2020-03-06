import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import { GlobalModule, IHeader } from '@/store/modules/global';
const baseURL = `${process.env.VUE_APP_URL}${process.env.VUE_APP_API_URL}`;
const service = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});
// Request interceptors
service.interceptors.request.use(
    (config) => {
        let requestHeaders = GlobalModule.requestHeaders;
        if (requestHeaders.length > 0) {
            requestHeaders.forEach((m: IHeader) => {
                config.headers[m.key] = m.value
            });
            GlobalModule.clearRequestHeaders();
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);
// Response interceptors
service.interceptors.response.use(
    (response) => {
        const res = response.data
        const stateCode = res.stateCode
        const stateEnum = {
            'tip': 0, // 提示
            'success': 1, // 成功
            'error': 2, // 出错
            'noLogin': 3, // 没有登陆
            'noPermission': 4, // 没有权限
            'warning': 5, // 警告
        }
        switch (stateCode) {
            case stateEnum.success:
                return res.apiData
            case stateEnum.error:
            case stateEnum.noPermission:
            case stateEnum.warning:
                Message({
                    message: res.message,
                    type: 'error',
                    duration: 5 * 1000
                })
                return Promise.reject(res)
        }
    },
    (error) => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    },
);
export default service;
