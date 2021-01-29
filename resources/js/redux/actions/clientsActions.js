import {
    ADD_CLIENT_FILTER, DELETE_CLIENT_SUCCESS,
    EDIT_FORM_HIDE,
    EDIT_FORM_SHOW, EDIT_FORM_SUCCESS_TRUE,
    FETCH_CLIENTS, HIDE_ALERT,
    HIDE_LOADER, HIDE_LOADER_BTN, SHOW_ALERT,
    SHOW_LOADER,
    SHOW_LOADER_BTN
} from '../types'

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}

export function showLoaderBtn() {
    return {
        type: SHOW_LOADER_BTN
    }
}

export function hideLoaderBtn() {
    return {
        type: HIDE_LOADER_BTN
    }
}

export function editClientForm(data) {
    return async dispatch => {
        try {
            dispatch(showLoaderBtn())
            let url = '/api/client/'+data.id
            const response = await axios.put(url, data);

            if (response.data.success){

                dispatch({ type: EDIT_FORM_SUCCESS_TRUE, payload: response.data.response })
                dispatch({ type: SHOW_ALERT, payload: ['record updated successfully'] })

                setTimeout(()=>{dispatch({ type: HIDE_ALERT })}, 1500)
            }else {
                let messages = Object.values(response.data.response)
                messages = messages.map(i => i.length > 0 ? i.join(',') : i.join(''));
                dispatch({ type: SHOW_ALERT, payload: messages })
                setTimeout(()=>{dispatch({ type: HIDE_ALERT })}, 1500)
            }
            dispatch(hideLoaderBtn())

        } catch (e) {
            dispatch(hideLoaderBtn())
            dispatch({ type: SHOW_ALERT, payload: ['oops something went wrong'] })
            setTimeout(()=>{dispatch({ type: HIDE_ALERT })}, 1500)
        }
    }
}

export function deleteClient(id) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            let url = '/api/client/'+id
            const response = await axios.delete(url);

            if (response.data.success){
                dispatch({ type: DELETE_CLIENT_SUCCESS, payload: id })
                dispatch({ type: SHOW_ALERT, payload: ['record delete successfully'] })
                setTimeout(()=>{dispatch({ type: HIDE_ALERT })}, 1500)
            }else {
                throw new Error('');
            }
            dispatch(hideLoader())

        } catch (e) {
            dispatch(hideLoader())
            dispatch({ type: SHOW_ALERT, payload: ['oops something went wrong'] })
            setTimeout(()=>{dispatch({ type: HIDE_ALERT })}, 1500)
        }
    }
}

export function showEditForm(id) {

    return {
        type: EDIT_FORM_SHOW,
        payload: id
    }
}

export function hideEditForm() {
    return {
        type: EDIT_FORM_HIDE
    }
}


export function addFilters(filterItem) {
    return {type: ADD_CLIENT_FILTER, payload: filterItem}
}

export function getClientWithFilters(filterItem) {
    let url = '/api/client'
    return async dispatch => {
        try {
            dispatch( addFilters(filterItem) )
            dispatch(showLoader())

            let options = filterItem.filter(i=> i.value )
            if (options.length){
                let params = options.map(i => {
                    return i.key + '=' + i.value
                }).join('&')
                url = url + '?' + params
            }
            const response = await axios.get(url);
            dispatch({type: FETCH_CLIENTS, payload: response.data})
            dispatch(hideLoader())
        } catch (e) {
            dispatch(hideLoader())
        }
    }
}

export function fetchClients( options = []) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            let url = '/api/client'
            const response = await axios.get(url);
            dispatch({type: FETCH_CLIENTS, payload: response.data})
            dispatch(hideLoader())
        } catch (e) {
            dispatch(hideLoader())
        }
    }
}
