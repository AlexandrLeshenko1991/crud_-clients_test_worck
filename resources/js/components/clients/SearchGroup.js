import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getClientWithFilters} from "../../redux/actions/clientsActions";


export const SearchGroup = () => {
    const dispatch = useDispatch()
    const sortFilters = useSelector(state => state.clients.sortFilters)
    const [name, setName] = useState(sortFilters.find(i=>i.key === 'name').value || '');

    const findNameHandle = (e) => {
        let filters = sortFilters.map(i=>{
            if (i.key === 'name')return {key: 'name', value: name}
            return i
        })
        dispatch(getClientWithFilters(filters))
    }

    return <div className="d-flex py-2 mb-3">
        <div className="w-50 d-flex">
            <input type="text" className="form-control col-6"
                   value={name}
                   onChange={e => setName(e.target.value)}/>
            <button className="btn btn-outline-secondary ml-2 col-6"
                    type="button"
                    onClick={findNameHandle}
            >Search name</button>
        </div>
    </div>
}
