import {
    HIDE_ALERT,
    HIDE_ALERT_EDIT,
    HIDE_LOADER,
    HIDE_LOADER_BTN,
    SHOW_ALERT, SHOW_ALERT_EDIT,
    SHOW_LOADER,
    SHOW_LOADER_BTN
} from './types'

const initialState = {
    loading: false,
    loadingBtn: false,
    alert: [],
    auth: !!window.LaravelApiToken
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {...state, loading: true}
        case HIDE_LOADER:
            return {...state, loading: false}
        case SHOW_LOADER_BTN:
            return {...state, loadingBtn: true}
        case HIDE_LOADER_BTN:
            return {...state, loadingBtn: false}
        case SHOW_ALERT:
            return {...state, alert: action.payload}
        case HIDE_ALERT:
            return {...state, alert: []}
        default: return state
    }
}
