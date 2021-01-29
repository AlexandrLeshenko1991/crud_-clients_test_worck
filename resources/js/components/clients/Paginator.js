import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getClientWithFilters} from "../../redux/actions/clientsActions";

export const Paginator = ({links}) => {
    const dispatch = useDispatch()
    const sortFilters = useSelector(state => state.clients.sortFilters)

    const handleClick = (e, url) => {
        e.preventDefault();

        if (url){
            let filters = sortFilters.map(i=>{
                if (i.key === 'page')return {key: 'page', value: url.split('page=')[1]}
                return i
            })
            dispatch(getClientWithFilters(filters))
        }
    }

    return <div className="d-flex mt-2 px-2">
        <ul className="pagination justify-content-center">
            {links.map((item, i) => {
                if (i === 0)
                    return <li className="page-item" key={i}>
                        <a className={'page-link'}
                           disabled={!item.url}
                           onClick={(e)=>{handleClick(e, item.url)}}
                        >
                            Prev
                        </a>
                    </li>

                if (i === links.length - 1)
                    return <li className="page-item" key={i}>
                        <a className='page-link'
                           disabled={!item.url}
                           onClick={(e)=>{handleClick(e, item.url)}}
                        >
                            Next
                        </a>
                    </li>

                if (item.url)
                    return <li className={ item.active ? 'page-item active' : 'page-item'} key={i}>
                        <a className="page-link"
                           onClick={(e)=>{handleClick(e, item.url)}}
                        >
                            {item.label}
                        </a>
                    </li>

                if (item.label == '...')
                    return <li className="page-item-no-link px-2" key={i}>...</li>

            })}
        </ul>
    </div>
}

