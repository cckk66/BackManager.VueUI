import request from '@/utils/request';
import { stringify } from 'querystring';


// 获取表单
export const getsysGroup = (id: number) => {
    return request({
        url: '/sysGroup/getsysGroup?id=' + id,
        method: 'get',
    })
}

//保持分组
export const saveSysGroup = (data: any) => {
    return request({
        url: data.ID > 0 ?
            "/sysgroup/SysGroupUpdate" :
            '/sysgroup/SysGroupAdd',
        method: 'post',
        data: data,
    })
}

//保持分组
export const getSysGroupPage = (queryCondition: any) => {
    return request({
        url: '/sysGroup/sysGroupPage',
        method: 'post',
        data: queryCondition,
    })
}


// 获取表单
export const getGroupMenuDto = (GroupID: number) => {
    return request({
        url: '/sysGroup/GetGroupMenuDto?GroupID=' + GroupID,
        method: 'get',
    })
}

// 保存授权
export const saveGroupMenuPower = (GroupID: number, queryCondition: any[]) => {
    return request({
        url: '/sysGroup/saveGroupMenuPower',
        method: 'post',
        data: {
            GroupID: GroupID,
            GroupMenuDtos: queryCondition,
        }
    })
}