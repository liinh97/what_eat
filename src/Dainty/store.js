import React, { createContext, useContext, useEffect, useState } from "react";
import { store, update } from "../Firebase/firebase-repo";
import "./style/store.css";

const ShowContext = createContext();

export default function Store(props) {

    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [favotire, setFavorite] = useState(false);

    const handleSubmit = () => {

        if(props.edit_id){
            update('dainty', props.edit_id, {name, favotire, category_id: categoryId, img: ''});
            return;
        }

        store('dainty', {name, favotire, category_id: categoryId, img: ''});
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
            <button className={'favorite_box ' + (favotire ? 'enable' : 'disable')}
                onClick={() => setFavorite(favotire ? false : true)}
                >favorite</button>
            <button id="btn_store" onClick={() => handleSubmit()}>{props.edit_id ? "Edit" : "Store"}</button>
        </div>

    );

};