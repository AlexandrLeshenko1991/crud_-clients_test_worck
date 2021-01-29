import {
    ADD_CLIENT_FILTER,
    DELETE_CLIENT_SUCCESS,
    EDIT_FORM_HIDE,
    EDIT_FORM_SHOW,
    EDIT_FORM_SUCCESS_TRUE,
    FETCH_CLIENTS
} from './types'

const initialState = {
    clients: [],
    links: [],
    sortFilters: [
        {key: 'sort_name', value: null},
        {key: 'name', value: null},
        {key: 'page', value: null},
    ],
    currentPage: 1,
    editForm: false,
    lastPage: null,
}

export const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CLIENTS:
            return {
                ...state,
                clients: action.payload.data,
                links: action.payload.links,
                currentPage: action.payload.current_page,
                lastPage: action.payload.last_page,
            }
        case EDIT_FORM_SUCCESS_TRUE:
            return {
                ...state,
                clients: state.clients.map(i => {
                    return i.id === action.payload.id
                        ? action.payload
                        : i
                }),
            }
        case DELETE_CLIENT_SUCCESS:
            return {
                ...state,
                clients: state.clients.filter(i => i.id != action.payload),
            }
        case EDIT_FORM_SHOW:
            return {
                ...state,
                editForm: action.payload
            }
        case EDIT_FORM_HIDE:
            return {
                ...state,
                editForm: false
            }
        case ADD_CLIENT_FILTER:
            return {
                ...state,
                sortFilters: action.payload
            }
        default:
            return state
    }
}
