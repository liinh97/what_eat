import React, { useContext, useEffect, useState } from "react";
import CategoryContext from "../Context/CategoryContext";

function checkArr(id, categoryId){
    const newIds = [...categoryId];
    const indexId = newIds.indexOf(id);
    
    if(indexId !== -1){
        newIds.splice(indexId, 1);
    }else{
        newIds.push(id);
    }
    
    return newIds;
}

export default function Categories(props) {

    const [category, setCategory] = useState([]);
    const { categoryId, setCategoryId } = useContext(CategoryContext);

    useEffect(() => {
        setCategory(props.data);
    }, [props.data]);

    const handleClickBtn = (id, index) => {
        const newIds = checkArr(id, categoryId);
        setCategoryId(newIds);

        let arr = [...category];
        arr[index].active = arr[index].active ? false : true;
        setCategory(arr);
    }

    return (
        <div className="category_box">
            {category.map((e, i) => {
                return (
                    <button key={i}
                    onClick={() => handleClickBtn(e.id, i)}
                    className={'btn_category ' + (e.active ? 'active' : '')}>
                        {e.name}
                    </button>
                )
            })}
        </div>
    );

}