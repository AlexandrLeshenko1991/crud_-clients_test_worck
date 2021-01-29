import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import {clientRootReducer} from "../redux/clientRootReducer";
import {ClientsWrap} from "./clients/ClientsWrap";

function Clients() {
    return <ClientsWrap />;
}

export default Clients;

if (document.getElementById('table-client-block')) {
    const store = createStore(clientRootReducer, applyMiddleware(thunk))

    const app = (
        <Provider store={store}>
            <Clients  />
        </Provider>
    )

    ReactDOM.render(app , document.getElementById('table-client-block'));
}
