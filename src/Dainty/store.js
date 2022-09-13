import React, { useState } from "react";
import { store, update } from "../Firebase/firebase-repo";
import "./style/store.css";

export default function Store(props) {

    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [favorite, setFavorite] = useState(false);

    const handleSubmit = () => {

        if(props.edit_id){
            update('dainty', props.edit_id, {name, favorite, category_id: categoryId, img: ''});
            return;
        }

        store('dainty', {name, favorite, category_id: categoryId, img: ''});
    }

    return (

        <div id="store">
            <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
            <div className="list_categories">
                {props.data.map((e, i) => {
                    return (
                    <div key={i}>
                        <input hidden type="radio" id={e.id} name="category" />
                        <label
                        htmlFor={e.id}
                        className="item_category"
                        onClick={() => setCategoryId(e.id)}
                        >{e.name}</label>
                    </div>
                )})}
            </div>
            <button className={'favorite_box ' + (favorite ? 'enable' : 'disable')}
                onClick={() => setFavorite(favorite ? false : true)}
                >favorite</button>
            <button id="btn_store" onClick={() => handleSubmit()}>{props.edit_id ? "Edit" : "Store"}</button>
        </div>

    );

};