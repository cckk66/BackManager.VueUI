import { Module, VuexModule, getModule, MutationAction, Action} from 'vuex-module-decorators';
import store from '@/store';
import { login, logout } from '@/services/login';
import { setToken, removeToken, getToken, setLocalStorage, removeLocalStorage, getLocalStorage } from '@/utils/auth';
import { localStorageUserInfoKey } from '@/utils/constKey';
import { debug } from 'util';
export interface IUserState {
    token: string;
    loginName: string;
    niceName: string;
    userID: number;
    menuList: any[];
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    token: string = '';
    loginName: string = '';
    niceName: string = '';
    userID: number = 0;
    menuList: any[] = [];

    @MutationAction({ mutate: ['token', 'loginName', 'niceName', 'userID','menuList'] })
    async Login(userInfo: { username: string, password: string }) {
        const username = userInfo.username.trim();
        const data: any = await login(username, userInfo.password);
        setToken(data.token);
        setLocalStorage(localStorageUserInfoKey, {
            loginName: data.loginName,
            niceName: data.niceName,
            userID: data.ID,
        })
        return {
            token: data.token,
            loginName: data.loginName,
            niceName: data.niceName,
            userID: data.ID,
            menuList: data.menuList.data.router,
        };
    }

    @Action
    async GetUserInfo() {
        let userInfo = getLocalStorage(localStorageUserInfoKey);
        return userInfo;
    }

    @MutationAction({ mutate: ['token', 'loginName', 'niceName', 'userID', 'menuList'] })
    async Logout() {
        await logout;
        removeToken();
        removeLocalStorage(localStorageUserInfoKey);
        return {
            token: '',
            loginName: '',
            niceName: '',
            userID:0,
            menuList: [],
        };
    }

    @MutationAction({ mutate: ['token', 'loginName', 'niceName', 'userID', 'menuList'] })
    async FedLogout() {
        removeToken();
        removeLocalStorage(localStorageUserInfoKey);
        return {
            token: '',
            loginName: '',
            niceName: '',
            userID: 0,
            menuList: [],
        };
    }
}

export const UserModule = getModule(User);
