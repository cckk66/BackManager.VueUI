import { localStorageRouterKey, cookieTokenKey } from '@/utils/constKey';
import Cookies from 'js-cookie';


export function getToken() {
    return Cookies.get(cookieTokenKey);
};

export function setToken(token: string) {
    return Cookies.set(cookieTokenKey, token);
};

export function removeToken() {
    return Cookies.remove(cookieTokenKey);
};


export const setLocalStorage = (name: string, data: any) => { // localStorage 存储数组对象的方法
    
    sessionStorage.setItem(name, JSON.stringify(data));
  
};
export const removeLocalStorage= (key: string) => {
    sessionStorage.removeItem(key)
}
export const getLocalStorage = (name: string) => {
    let lsjson: string | null = sessionStorage.getItem(name);
    if (lsjson) {
        return JSON.parse(lsjson);
    }
    return [];
};

export const setLocalRouter = (data: any[]) => { // localStorage 存储数组对象的方法
    setLocalStorage(localStorageRouterKey, data);
};

export const getLocalRouter = () => {
    return getLocalStorage(localStorageRouterKey);
};



