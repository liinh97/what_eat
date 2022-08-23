import React, { useContext, useReducer, useRef } from "react";
import { useState, useEffect } from "react";
import Store from "./store";
import TestContext from "../Context/TestContext";
import TestReducer from "../Reducer/TestReducer";

const Test = () => {
    
    const [dainty, setDainty] = useState([
        {name: 'rice', src: 'rice.jpg'},
        {name: 'noodle', src: 'noodle.jpg'},
    ]);

    const action = ['UP', 'DOWN'];

    let counter = useRef(1);
    let abc = useRef(null);

    let [context, setContext] = useState(dainty);
    let [state, updateState] = useState(0);
    const [reducer, dispatch] = useReducer(TestReducer, 5);

    const handleUpdate = () => {
        counter.current++;
        updateState(state + 1);
    }

    const changeReducer = type => {
        dispatch(type);
    }

    useEffect(() => {
        
        setDainty(prevDainty => [
            ...prevDainty,
            prevDainty.map(e => { e.name = e.name + '2' })
        ]);

        const ref2 = abc.current;
        console.log(ref2.innerText);

    }, []);

    return (
        <div>
            <TestContext.Provider value={{action, asdads: ['asdasd', 'asdasd']}}>
                <button onClick={() => handleUpdate()}>CLICK</button>
                {action.map((e, i) => <button key={i} onClick={() => changeReducer(e)}>{e}</button>)}
                {
                    dainty.map((e, i) => {
                        return (
                            <div key={i}>
                                <div>{e.name}</div>
                                <div>{e.src}</div>
                            </div>
                        )
                    })
                }
                <br></br>
                <div>
                    {context[0].name}
                </div>
                <br></br>
                <div>
                    count ref {counter.current}
                </div>
                <br></br>
                <div ref={abc}>
                    ref DOM
                </div>
                <br></br>
                <div>
                    count reducer: {reducer}
                </div>
                <Abc />
            </TestContext.Provider>
        </div>
    );

}

const Abc = () => {

    const { asdads } = useContext(TestContext);

    useEffect(() => {
        console.log(asdads);
    }, [asdads]);

    return (<div></div>)

}

export default Test;