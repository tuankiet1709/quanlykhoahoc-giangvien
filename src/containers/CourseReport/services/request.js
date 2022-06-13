import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../services/requests";
import Course from "../../../models/course";
import {IsDeleted, All} from "../../../constants/Course/CourseStateConstant";

const coursesCollectionRef = collection(db, "Course");

export async function getCourse(requestQuery) {
  var data = getDocs(coursesCollectionRef);
  var q = undefined;
  console.log(requestQuery);
  console.log(requestQuery.states);

  if(requestQuery.states){
    if(
      requestQuery.states.length>0 &&
      !requestQuery.states.some(x => x === All) &&
      requestQuery.search){
        q = query( coursesCollectionRef,
          where('state', 'in', requestQuery.states),
          where("name", ">=", requestQuery.search),
          where("name", "<=", requestQuery.search + '\uf8ff'),
          orderBy(requestQuery.sortColumn,requestQuery.sortOrder));
    }
    else if (
      requestQuery.states.length>0 &&
      !requestQuery.states.some(x => x === All) &&
      !requestQuery.search){
        q = query( coursesCollectionRef,
          where('state', 'in', requestQuery.states),
          orderBy(requestQuery.sortColumn,requestQuery.sortOrder));
    } else if (
      requestQuery.states.length==0 &&
      requestQuery.search){
        q = query( coursesCollectionRef,
          where("name", ">=", requestQuery.search),
          where("name", "<=", requestQuery.search + '\uf8ff'),
          orderBy(requestQuery.sortColumn,requestQuery.sortOrder));
    } else if (
      requestQuery.states.length==0 &&
      !requestQuery.search){
        q = query( coursesCollectionRef,
          orderBy(requestQuery.sortColumn,requestQuery.sortOrder));
    }
  } else if (requestQuery.search){
    q = query( coursesCollectionRef,
      where("name", ">=", requestQuery.search),
      where("name", "<=", requestQuery.search + '\uf8ff'),
      orderBy(requestQuery.sortColumn,requestQuery.sortOrder)); 
  }
  else{
    q = query( coursesCollectionRef,
      orderBy(requestQuery.sortColumn,requestQuery.sortOrder)); 
  } 
  
  data = getDocs(q);
  return data;
}