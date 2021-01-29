import {combineReducers} from 'redux'
import {clientReducer} from './clientReducer'
import {appReducer} from './appReducer'

export const clientRootReducer = combineReducers({
    clients: clientReducer,
    app: appReducer
})
