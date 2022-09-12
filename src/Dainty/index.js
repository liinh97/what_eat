import React, { useEffect, useState } from "react";
import Store from "./store";
import Edit from "./edit";
import "./style/index.css";
import Categories from "../Components/categories";
import CategoryContext from "../Context/CategoryContext";
import { col, snapshotAll } from "../Firebase/firebase-repo";
import { query, where } from "firebase/firestore";

function handleRandom(arr){
    return Math.floor(Math.random() * arr.length);
}

export default function Index(){

    const [today, setToday] = useState(null);
    const [option, setOption] = useState(null);
    const [action, setAction] = useState(false);
    const [categoryId, setCategoryId] = useState([]);
    const [category, setCategory] = useState([]);
    const [dainty, setDainty] = useState([]);

    useEffect(() => {

        snapshotAll('category', (res) => {
            const categories = [];
            res.forEach(e => categories.push({id: e.id, ...e.data()}));
            setCategory(categories);
        });

        snapshotAll('dainty', res => {
            const dainties = [];
            res.forEach(e => dainties.push({id: e.id, ...e.data()}));
            setDainty(dainties);
        });

    }, []);

    useEffect(() => {

        let q = 'dainty';

        if(categoryId.length > 0){
            q = query(col('dainty'), where('category_id', 'in', categoryId));
        }
        
        snapshotAll(q, res => {
            const dainties = [];
            res.forEach(e => dainties.push({id: e.id, ...e.data()}));
            setDainty(dainties);
        });

    }, [categoryId]);

    useEffect(() => {
        const newArr = [];
        dainty.forEach( e => {
            newArr.push(e.name);
        });
        setArr(newArr);
    }, [dainty]);

    const [arr, setArr] = useState([]);
    const [active, setActive] = useState(false);

    const randomDainty = () => {

        const delay = 2000;
        setArr(arr.sort(() => Math.random() - 0.5));
        setActive(active ? false : true);
        
        setTimeout(() => {
            setActive(false);
        }, delay);


        // let result;
        // if(!categoryId.length){
        //     const random = handleRandom(dainty);
        //     result = dainty[random].name;
        // }else{
        //     const newDainty = dainty.filter(e => categoryId.includes(e.category_id));
        //     const random = handleRandom(newDainty);
        //     result = newDainty[random].name;
        // }
        // setToday(result);
    }

    return (
    
        <div id="index">
            <div className="center_box">
                <div className="scroll_area">
                    <ul style={{display: "flex", width: "400px", overflow: "hidden", backgroundColor: "gray"}}>
                        {
                            arr.map( (e, i) => <li className={active ? 'animation' : ''} style={{listStyleType: "none", margin: "10px", border: "1px solid red"}} key={i}>{e}</li>)
                        }
                    </ul>
                </div>
                <button id="btn_start" className={action ? 'down' : ''} onClick={() => randomDainty()}>Start</button>
            </div>
            <CategoryContext.Provider value={{categoryId, setCategoryId}}>
                <Categories data={category} />
            </CategoryContext.Provider>
            <button id="btn_option" onClick={() => setAction(action ? false : true)}>Options</button>
            <div className={'action_box ' + (action ? 'visiable' : 'hidden')}>
                <button className="action_store"
                    onClick={() => setOption(option === 'store' ? '' : 'store')}
                    >store</button>
                <button className="action_edit"
                    onClick={() => setOption(option === 'edit' ? '' : 'edit')}
                    >edit</button>
            </div>
            <CategoryContext.Provider value={{categoryId, setCategoryId}}>
                {option === 'store' ? <Store data={category} /> : option === 'edit' ? <Edit data={{dainty, category}} /> : ''}
            </CategoryContext.Provider>
        </div>

    );

}