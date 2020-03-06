import request from '@/utils/request';


//菜单分页
export const getSysMenuPage = (queryCondition: any) => {
    return request({
        url: '/sysMenu/sysMenuPage',
        method: 'post',
        data: queryCondition,
    })
}

//报错菜单排序
export const saveMenuSort = (queryCondition: any) => {
    return request({
        url: '/sysMenu/saveMenuSort',
        method: 'post',
        data: queryCondition,
    })
}


