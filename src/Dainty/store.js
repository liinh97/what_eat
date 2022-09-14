import React, { useEffect, useState } from "react";
import { store, update } from "../Firebase/firebase-repo";
import "./style/store.css";

export default function Store(props) {

    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [favorite, setFavorite] = useState(false);
    const [newCategory, setNewCategory] = useState(null);
    const [statusUpdate, setStatusUpdate] = useState(false);

    const handleSubmit = () => {

        if(props.edit_id){
            update('dainty', props.edit_id, {name, favorite, category_id: categoryId, img: ''});
            return;
        }

        store('dainty', {name, favorite, category_id: categoryId, img: ''});
    }

    useEffect(() => {
        let status = categoryId ? true : false;
        status = status && newCategory !== null ? true : false;
        setStatusUpdate(status);
    }, [categoryId, newCategory]);

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
                        onClick={() => setCategoryId(categoryId ? 0 : e.id)}
                        >{e.name}</label>
                    </div>
                )})}
            </div>
            <div className="new_category">
                <button onClick={() => setNewCategory(newCategory == null ? "" : null)}>new category</button>
                {
                    newCategory !== null ?
                    <input
                        type="text"
                        placeholder="Input your category here!"
                        name="new_category"
                        onChange={() => setNewCategory(e.target.value)}
                        value={newCategory}
                    /> :
                    ""
                }
                {
                    newCategory !== null ?
                    statusUpdate ?
                    <span>You in update category</span> :
                    <span>You in insert category</span> :
                    ""
                }
            </div>
            <button className={'favorite_box ' + (favorite ? 'enable' : 'disable')}
                onClick={() => setFavorite(favorite ? false : true)}
                >favorite</button>
            <button id="btn_store" onClick={() => handleSubmit()}>{props.edit_id ? "Edit" : "Store"}</button>
        </div>

    );

};