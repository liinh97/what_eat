import React, { useEffect, useState } from "react";
import Store from "./store";
import Edit from "./edit";
import "./style/index.css";
import Categories from "../Components/categories";
import CategoryContext from "../Context/CategoryContext";
import { col, snapshotAll, store } from "../Firebase/firebase-repo";
import { orderBy, query, where } from "firebase/firestore";

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
        if(favorite) q = query(col('dainty'), where('favorite', '==', true));
        snapshotAll(q, res => {
            const dainties = [];
            res.forEach(e => dainties.push({id: e.id, ...e.data()}));
            setDainty(dainties);
        });

        const q2 = query(col('history'), orderBy('date', 'desc'));
        snapshotAll(q2, res => {
            const histories = [];
            res.forEach(e => histories.push(e.data()));
            setHistory(histories);
        });
        
        // setToday('Bánh Mì');

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
        let newArr = [];
        dainty.forEach( e => {
            newArr.push(e.name);
        });
        let count = newArr.length;
        if(count > 0){
            while(count < 7){
                newArr = newArr.concat(newArr);
                count = newArr.length;
            }

            if(count % 2 == 0){
                newArr.push('Again');
            }
        }
        setArr(newArr);
    }, [dainty]);

    useEffect(() => {
    }, [history]);

    const randomDainty = () => {

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
            
        }, 2500);
    }

    return (
    
        <div id="index">
            <div className="center_box">
                <div className={today == null ? "none" : "today_box_show"}>
                    <p style={{marginTop: "70px"}}>Eat</p>
                    <b style={{margin: "15px 0"}}>{ today !== null ? today.toUpperCase() : today }</b>
                    <p>for today!</p>
                    <button style={{marginTop: "100px", padding: "15px 60px"}} onClick={() => setToday(null)}>Go eat</button>
                </div>
                <div className="scroll_area">
                    <ul className={(active ? 'now' : 'hidden')}>
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