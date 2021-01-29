import React from 'react'
import {deleteClient, showEditForm} from "../../redux/actions/clientsActions";
import {useDispatch, useSelector} from "react-redux";

export const Client = ({client}) => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.app.auth)

    return <div className="d-flex flex-md-nowrap flex-wrap py-1">
        <div className='col-md-1 col-12'>
            {client.id}
        </div>
        <div className='col-md-2 col-12'>
            {client.name}
        </div>
        <div className='col-md-3 col-12'>
            {client.last_name}
        </div>
        <div className='col-md-3 col-12'>
            {client.profession}
        </div>
        <div className='col-md-1 col-12'>
            {client.age}
        </div>
        <div className='col-md-2 col-12'>
            {auth ? <>
                    <button type="button" className="btn btn-primary btn-sm mr-2"
                            onClick={() => {dispatch(showEditForm(client.id))}}
                    >edit
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => {dispatch(deleteClient(client.id))}}
                    >X</button>
                </>
                : <><span>-</span></>}
        </div>
    </div>
}
