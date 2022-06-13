import {
  collection,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../../services/requests";
import { 
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { All } from "../../../constants/Teacher/TeacherStateConstant"

const teacherCollectionRef = collection(db, "users");
const auth = getAuth();

export async function getTeacher(requestQuery) {
  var data = getDocs(teacherCollectionRef);
  var q = undefined;
  
  if(requestQuery.states){
    if(
      requestQuery.states.length>0 &&
      !requestQuery.states.some(x => x === All) &&
      requestQuery.search){
        q = query( teacherCollectionRef,
          where('role','==',1),
          where('state', 'in', requestQuery.states),
          where("name", ">=", requestQuery.search),
          where("name", "<=", requestQuery.search + '\uf8ff'),
          orderBy(requestQuery.sortColumn,requestQuery.sortOrder));
    }
    else if (
      requestQuery.states.length>0 &&
      !requestQuery.states.some(x => x === All) &&
      !requestQuery.search){
        q = query( teacherCollectionRef,
          where('role','==',1),
          where('state', 'in', requestQuery.states),
          orderBy(requestQuery.sortColumn,requestQuery.sortOrder));
    } else if (
      requestQuery.states.length==0 &&
      requestQuery.search){
        q = query( teacherCollectionRef,
          where('role','==',1),
          where("lastName", ">=", requestQuery.search),
          where("lastName", "<=", requestQuery.search + '\uf8ff'),
          orderBy(requestQuery.sortColumn,requestQuery.sortOrder));
    } else if (
      requestQuery.states.length==0 &&
      !requestQuery.search){
        q = query( teacherCollectionRef,
          where('role','==',1),
          orderBy(requestQuery.sortColumn,requestQuery.sortOrder));
    }
  } else if (requestQuery.search){
    q = query( teacherCollectionRef,
      where('role','==',1),
      where("lastName", ">=", requestQuery.search),
      where("lastName", "<=", requestQuery.search + '\uf8ff'),
      orderBy(requestQuery.sortColumn,requestQuery.sortOrder)); 
  }
  else{
    q = query( teacherCollectionRef,
      where('role','==',1),
      orderBy(requestQuery.sortColumn,requestQuery.sortOrder)); 
  } 
  data = getDocs(q);
  return data;
}