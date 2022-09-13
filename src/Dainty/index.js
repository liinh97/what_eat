import React, { useEffect, useState } from "react";
import Store from "./store";
import Edit from "./edit";
import "./style/index.css";
import Categories from "../Components/categories";
import CategoryContext from "../Context/CategoryContext";
import { col, snapshotAll, store } from "../Firebase/firebase-repo";
import { query, where } from "firebase/firestore";

export default function Index(){

    const [today, setToday] = useState(null);
    const [arr, setArr] = useState([]);
    const [active, setActive] = useState(false);
    const [option, setOption] = useState(null);
    const [action, setAction] = useState(false);
    const [categoryId, setCategoryId] = useState([]);
    const [category, setCategory] = useState([]);
    const [dainty, setDainty] = useState([]);
    const [history, setHistory] = useState([]);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {

        snapshotAll('category', (res) => {
            const categories = [];
            res.forEach(e => categories.push({id: e.id, ...e.data()}));
            setCategory(categories);
        });

        let q = 'dainty';
        if(favorite){
            q = query(col('dainty'), where('favorite', '==', true));
        }
        snapshotAll(q, res => {
            const dainties = [];
            res.forEach(e => dainties.push({id: e.id, ...e.data()}));
            setDainty(dainties);
        });

        snapshotAll('history', res => {
            const histories = [];
            res.forEach(e => histories.push(e.data()));
            setHistory(histories);
        });

    }, [favorite]);

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

    useEffect(() => {
    }, [history]);

    const randomDainty = () => {

        const delay = 2000;
        setArr(arr.sort(() => Math.random() - 0.5));
        setActive(active ? false : true);
        
        setTimeout(() => {

            setActive(false);

            if(arr[1] == undefined){
                return;
            }

            const dataHistory = {
                dainty: arr[1],
                date: new Date().toLocaleDateString("en", {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                })
            }

            store('history', dataHistory);

            setToday(arr[1]);
            
        }, delay);
    }

    return (
    
        <div id="index">
            <div className="center_box">
                <div className={today == null ? "" : "today_box_show" + 'today_box'}>{today}</div>
                <div className="scroll_area">
                    <ul style={{display: active ? "flex" : "none", width: "400px", overflow: "hidden", backgroundColor: "gray"}}>
                        {
                            arr.map( (e, i) => <li className={active ? 'animation' : ''} key={i}>{e}</li>)
                        }
                    </ul>
                </div>
                <button id="btn_start" className={action ? 'down' : ''} onClick={() => randomDainty()}>Start</button>
            </div>
            <CategoryContext.Provider value={{categoryId, setCategoryId, favorite, setFavorite}}>
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