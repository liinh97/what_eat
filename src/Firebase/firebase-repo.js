import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase-config";

const all = async (col) => await getDocs(collection(db, col));

const store = async (col, data) => await addDoc(collection(db, col), data);

const update = async (col, id, data) => await setDoc(doc(db, col, id), data);

const destroy = async (col, id) => await deleteDoc(doc(db, col, id));

const col = colName => collection(db, colName);

const snapshotAll = (col, callback) => onSnapshot(collection(db, col), callback);

export { all, store, update, destroy, col, snapshotAll };