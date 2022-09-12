import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase-config";

const all = async (q) => {
    if(checkObj(q)){
        return await getDocs(q);
    }
    return await getDocs(col(q));
}

const store = async (colName, data) => await addDoc(col(colName), data);

const update = async (colName, id, data) => await setDoc(doc(db, colName, id), data);

const destroy = async (colName, id) => await deleteDoc(doc(db, colName, id));

const col = colName => collection(db, colName);

const snapshotAll = (q, callback) => {
    
    if(checkObj(q)){
        return onSnapshot(q, callback);
    }

    return onSnapshot(col(q), callback);
}

const checkObj = input => {
    if(typeof(input) === 'object'){
        return true;
    }
    return false;
}

export { all, store, update, destroy, col, snapshotAll };