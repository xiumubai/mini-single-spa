import { Application } from '../types'
import { isFunction, nextTick } from './utils'

export const appMaps = new Map<string, Application>()

let currentAppName: null | string = null
export function getCurrentAppName() {
    return currentAppName
}

export function getCurrentApp() {
    return currentAppName && appMaps.get(currentAppName)
}

export function temporarySetCurrentAppName(name: string | null) {
    if (currentAppName !== name) {
        currentAppName = name
        // eslint-disable-next-line no-return-assign
        nextTick(() => currentAppName = null)
    }
}

export function setCurrentAppName(name: string | null) {
    currentAppName = name
}

export function getApp(name: string) {
    return appMaps.get(name)
}

// 当前子应用是否激活
export function isActive(app: Application) {
    return isFunction(app.activeRule) && (app.activeRule as Function)(window.location)
}