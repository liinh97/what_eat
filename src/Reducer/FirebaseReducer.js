// import { useState } from "react";
import { snapshotAll } from "../Firebase/firebase-repo";

export default function FirebaseReducer(state, action){

    // const [data, setData] = useState([]);

    switch(action){

        case 'getSnapAll':

            let dainties = [];
            snapshotAll(state, res => {
                res.forEach(e => dainties.push({id: e.id, ...e.data()}));
                dainties = 1;
            });
            console.log(dainties);

            return [];

    }

}