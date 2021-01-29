import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {editClientForm, hideEditForm} from "../../redux/actions/clientsActions";


export const EditForm = ({client}) => {
    const dispatch = useDispatch()
    const loadingBtn = useSelector(state => state.app.loadingBtn)
    const alert = useSelector(state => state.app.alert)

    const [name, setName] = useState(client.name);
    const [lastName, setLastName] = useState(client.last_name);
    const [profession, setProfession] = useState(client.profession);
    const [age, setAge] = useState(client.age);

    const editFormHandler = () => {
        dispatch(editClientForm({
            id: client.id,
            name: name,
            last_name: lastName,
            profession: profession,
            age: age
        }))
    }


    return <div className="py-2 mb-3">
        <div className={'w-50'}>
            <button className="btn btn-warning mb-3"
                    type="button"
                    onClick={() => dispatch(hideEditForm())}
            >back
            </button>
        </div>
        {!!alert.length &&
        <div className="alert alert-warning mb-2" role="alert">
            {alert.map((i, index) => <li key={index}>{i}</li>)}
        </div>}
        <div className="d-flex flex-column">
            <input type="text" className="form-control mb-2"
                   placeholder={'name'}
                   value={name}
                   onChange={e => setName(e.target.value)}/>
            <input type="text" className="form-control mb-2"
                   placeholder={'last name'}
                   value={lastName}
                   onChange={e => setLastName(e.target.value)}/>
            <input type="text" className="form-control mb-2"
                   placeholder={'profession'}
                   value={profession}
                   onChange={e => setProfession(e.target.value)}/>
            <input type="text" className="form-control mb-2"
                   placeholder={'age'}
                   value={age}
                   onChange={e => setAge(e.target.value)}/>


            {loadingBtn
                ? <button className="btn btn-primary" type="button" disabled><span
                    className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </button>
                : <button className="btn btn-outline-primary"
                          type="button"
                          onClick={editFormHandler}
                >
                    Edit
                </button>
            }

        </div>
    </div>
}
