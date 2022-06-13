import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../services/requests";
import Course from "../../../models/course";
import {IsDeleted, All} from "../../../constants/Course/CourseStateConstant";

const coursesCollectionRef = collection(db, "Course");


function Mapping(courseForm) {
  var course = new Course();

  course.name = courseForm["name"];
  course.startDate = courseForm["startDate"];
  course.tuition = courseForm["tuition"];
  course.endDate = courseForm["endDate"];
  course.content = courseForm["content"];
  course.detail = courseForm["detail"];
  course.studyCondition = courseForm["studyCondition"];

  return course;
}

export async function GetUser(uid){
  const userRef = doc(db, "users", uid);
  const user = await getDoc(userRef);
  console.log(user);
  return user;
}

export async function GetUserRef(uid){
  const userRef = doc(db, "users", uid);
  return userRef;
}

export async function getCourse(requestQuery, teacherRef) {
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
          where("user","==", teacherRef),
          orderBy(requestQuery.sortColumn,requestQuery.sortOrder));
    }
    else if (
      requestQuery.states.length>0 &&
      !requestQuery.states.some(x => x === All) &&
      !requestQuery.search){
        q = query( coursesCollectionRef,
          where("user","==", teacherRef),
          where('state', 'in', requestQuery.states),
          orderBy(requestQuery.sortColumn,requestQuery.sortOrder));
    } else if (
      requestQuery.states.length==0 &&
      requestQuery.search){
        q = query( coursesCollectionRef,
          where("user","==", teacherRef),
          where("name", ">=", requestQuery.search),
          where("name", "<=", requestQuery.search + '\uf8ff'),
          orderBy(requestQuery.sortColumn,requestQuery.sortOrder));
    } else if (
      requestQuery.states.length==0 &&
      !requestQuery.search){
        q = query( coursesCollectionRef,
          where("user","==", teacherRef),
          orderBy(requestQuery.sortColumn,requestQuery.sortOrder));
    }
  } else if (requestQuery.search){
    q = query( coursesCollectionRef,
      where("user","==", teacherRef),
      where("name", ">=", requestQuery.search),
      where("name", "<=", requestQuery.search + '\uf8ff'),
      orderBy(requestQuery.sortColumn,requestQuery.sortOrder)); 
  }
  else{
    q = query( coursesCollectionRef,
      where("user","==", teacherRef),
      orderBy(requestQuery.sortColumn,requestQuery.sortOrder)); 
  } 
  
  data = getDocs(q);
  return data;
}

export async function getTeacherRef(teacherRef) {
  let teacherRefData = await getDoc(teacherRef);
  return teacherRefData.data();
}

export async function getScheduleRef(scheduleRef) {
  let scheduleRefData = await getDoc(scheduleRef);
  return scheduleRefData.data();
}

export async function getRoomRef(roomRef) {
  let roomRefData = await getDoc(roomRef);
  return roomRefData.data();
}

export async function getShiftRef(shiftRef) {
  let shiftRefData = await getDoc(shiftRef);
  return shiftRefData.data();
}