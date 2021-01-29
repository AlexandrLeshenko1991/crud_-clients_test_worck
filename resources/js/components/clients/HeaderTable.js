import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getClientWithFilters} from "../../redux/actions/clientsActions";

export const HeaderTable = () => {
    const dispatch = useDispatch()
    const sortFilters = useSelector(state => state.clients.sortFilters)

    const sortNameHandle = (type) => {
        let filters = sortFilters.map(i=>{
            if (i.key === 'sort_name')return {key: 'sort_name', value: type}
            return i
        })
        dispatch(getClientWithFilters(filters))
    }

    return <div className="d-flex flex-wrap flex-md-nowrap py-2 bg-dark text-light">
        <div className='col-md-1 col-12'>
            #
        </div>
        <div className='col-md-2 col-12'>
            name
            {sortFilters.find(i=>i.key === 'sort_name').value === 'desc'
                ? <button
                    type="button"
                    className="btn btn-primary btn-sm ml-1"
                    onClick={() => sortNameHandle('asc')}
                >
                    ^
                </button>
                : <button
                    type="button"
                    className="btn btn-primary btn-sm ml-1"
                    onClick={() => sortNameHandle('desc')}
                >˅</button>

            }
        </div>
        <div className='col-md-3 col-12'>
            last name
        </div>
        <div className='col-md-3 col-12'>
            profession
        </div>
        <div className='col-md-1 col-12'>
            age
        </div>
        <div className='col-md-2 col-12'>
            control
        </div>
    </div>
}
