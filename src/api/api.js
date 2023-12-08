import {Service} from '@/utils/request.js'
export function getConfigsByProductId(productId) {
    return Service({
        url: '/manager/getConfigsByProductId',
        params: { productId: productId }
    })
}
export function getAllAndroidPlugins() {
    return Service({
        url: '/manager/getAndroidPlugin ',
        method: 'get',
    })
}
export function getSuccess(params) {
    return Service({
        url: '/success/' + params,
        method: 'get'
    })
}
export function getTableData(params) {
    return Service({
        url: '/countByType/' + params,
        method: 'get'
    })
}
export function getIspData() {
    return Service({
        url: '/SuccessByIsp',
        method: 'get'
    })
}

export function getMapData() {
    return Service({
        url: '/map',
        method: 'get'
    })
}
export function addNewAndroidPlugin(data) {
    return Service({
        url: '/manager/addAndroidPlguin',
        data: JSON.stringify(data)
    })
}