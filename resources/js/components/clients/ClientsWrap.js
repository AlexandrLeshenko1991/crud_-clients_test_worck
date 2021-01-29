import React, {useEffect} from 'react'
import {Loader} from "../Loader";
import {useDispatch, useSelector} from "react-redux";
import {fetchClients} from "../../redux/actions/clientsActions";
import {Client} from "./Client";
import {HeaderTable} from "./HeaderTable";
import {Paginator} from "./Paginator";
import {SearchGroup} from "./SearchGroup";
import {EditForm} from "./EditForm";

export const ClientsWrap = () => {
    const dispatch = useDispatch()
    const clients = useSelector(state => state.clients.clients)
    const editForm = useSelector(state => state.clients.editForm)
    const links = useSelector(state => state.clients.links)
    const loading = useSelector(state => state.app.loading)
    const alert = useSelector(state => state.app.alert)


    useEffect(() => {
        dispatch(fetchClients())
    }, []);

    if (loading) {
        return <Loader/>
    }

    if (editForm){
        return <EditForm client = {clients.find(i=>i.id === editForm)} />
    }

    return <>
        {!!alert.length &&
        <div className="alert alert-warning mb-2" role="alert">
            {alert.map((i, index) => <li key={index}>{i}</li>)}
        </div>}
        <SearchGroup/>
        <HeaderTable/>
        {clients.length
            ? clients.map(client => <Client client={client} key={client.id}/>)
            : <> No Clients </>
        }
        {clients.length && <Paginator links={links}/>}

    </>

}
