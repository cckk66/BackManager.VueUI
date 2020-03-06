import Vue from 'vue';
import Vuex from 'vuex';
import { IAppState } from './modules/app';
import { IUserState } from './modules/user';
import { IGlobal } from './modules/global';

Vue.use(Vuex);

export interface IRootState {
    app: IAppState;
    user: IUserState;
    global: IGlobal;
}

export default new Vuex.Store<IRootState>({});
