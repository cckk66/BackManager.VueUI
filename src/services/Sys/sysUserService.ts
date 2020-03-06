import request from '@/utils/request';


// 获取表单
export const getsysUser = (id: number) => {
    return request({
        url: '/sysUser/getsysUser?id=' + id,
        method: 'get',
    })
}

//保持分组
export const savesysUser = (data: any) => {
    return request({
        url: data.ID > 0 ?
            "/sysUser/sysUserUpdate" :
            '/sysUser/sysUserAdd',
        method: 'post',
        data: data,
    })
}

//保持分组
export const getsysUserPage = (queryCondition: any) => {
    return request({
        url: '/sysUser/sysUserPage',
        method: 'post',
        data: queryCondition,
    })
}


//保持分组
export const getMatrixCard = (userID: number) => {
    return request({
        url: '/sysUser/getMatrixCard?userID=' + userID,
        method: 'get',
    })
}
