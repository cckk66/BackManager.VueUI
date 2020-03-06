import { Module, VuexModule, getModule, MutationAction, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { setLocalRouter } from '@/utils/auth'
export interface IHeader {
    key: string,
    value: string,
}

export interface IGlobal {
    routers: any[],
    requestHeaders: IHeader[],
    newMessageCount: number
}

@Module({ dynamic: true, store, name: 'global' })
class Global extends VuexModule implements IGlobal {
    public routers: any[] = [];
    //自定义提交Headers
    public requestHeaders: IHeader[] = [];

    //系统最新消息
    public newMessageCount: number = 0;

    @MutationAction({ mutate: ['routers'] })
    async setRouters(rs: any[]) {
        setLocalRouter(rs); // 存储路由到localStorage
        return {
            routers: rs,
        };
    }

    @MutationAction({ mutate: ['newMessageCount'] })
    async setNewMessageCount(newMessageCount: number) {
        return {
            newMessageCount: newMessageCount,
        };
    }


    //自定义请求Headers
    @Mutation
    setRequestHeaders(rHeaders: IHeader[]) {
        this.requestHeaders = rHeaders
    }

    @Action({ commit: 'setRequestHeaders' })
    clearRequestHeaders(): IHeader[] {
        return [];
    }

}

export const GlobalModule = getModule(Global);
