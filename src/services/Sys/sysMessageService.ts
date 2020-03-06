import request from '@/utils/request';


// 获取表单
export const getsysMessage = (id: number) => {
    return request({
        url: '/sysMessage/getsysMessage?id=' + id,
        method: 'get',
    })
}

//保持分组
export const savesysMessage = (data: any) => {
    return request({
        url: data.ID > 0 ?
            "/sysMessage/sysMessageUpdate" :
            '/sysMessage/sysMessageAdd',
        method: 'post',
        data: data,
    })
}

//保持分组
export const getsysMessagePage = (queryCondition: any) => {
    return request({
        url: '/sysMessage/sysMessagePage',
        method: 'post',
        data: queryCondition,
    })
}
// 获取表单
export const getNewSysMessageCount = () => {
    return request({
        url: '/sysMessage/getNewSysMessageCount',
        method: 'get',
    })
}

