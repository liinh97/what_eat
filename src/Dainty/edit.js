import React, { useEffect, useState, createContext, useContext } from "react";
import { destroy } from "../Firebase/firebase-repo";
import Store from "./store";
import "./style/edit.css";

const ShowContext = createContext();

export default function Edit(props){

    const [daintyId, setDaintyId] = useState(null);
    const [dainty, setDainty] = useState([]);
    const [action, setAction] = useState('edit');
    const [show, setShow] = useState(false);

    useEffect(() => {
        setDainty(props.data.dainty);
    }, [props.data.dainty]);

    const handleClickItem = id => {
        setDaintyId(id);
        setShow(true);
    }

    return (

        <div id="edit">
            <div className="list_dainties">
                {dainty.map((e, i) => {
                    return (
                    <div key={i}
                        className="dainty_item"
                        onClick={() => handleClickItem(e.id)}
                    >{e.name}</div>
                )})}
            </div>
            <div className="action">
                <input hidden type="radio" name="action" id="action_update" />
                <label htmlFor="action_update"
                    onClick={() => setAction('edit')}
                >Edit</label>
                <input hidden type="radio" name="action" id="action_delete" />
                <label htmlFor="action_delete"
                    onClick={() => setAction('destroy')}
                >Delete</label>
            </div>
            <ShowContext.Provider value={{show, setShow}}>
                {show ? action == 'edit' ? <Store data={props.data.category} edit_id={daintyId} /> : <DeleteItem edit_id={daintyId} /> : ''}
            </ShowContext.Provider>
        </div>

    );

}

const DeleteItem = (props) => {

    const { show, setShow } = useContext(ShowContext);

    const handleDelete = id => {
        destroy('dainty', id);
        setShow(false);
    }

    return (

        <div style={{display: show ? "block" : "none"}}>
            <button onClick={() => handleDelete(props.edit_id)}>Confirm</button>
            <button onClick={() => setShow(false)}>Cancel</button>
        </div>

    );

}