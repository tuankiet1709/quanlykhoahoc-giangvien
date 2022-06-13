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
const teacherCollectionRef = collection(db, "users");
const scheduleCollectionRef = collection(db, "schedules");
const roomCollectionRef = collection(db, "shifts");
const shiftCollectionRef = collection(db, "shifts");

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

export async function getCourse(requestQuery) {
  var data = getDocs(coursesCollectionRef);


  // console.log("classes");
  // let classesInCourse =[];
  // const querySnapshot = await getDocs(classesCollectionRef);
  // console.log(querySnapshot);
  // querySnapshot.forEach(async (doc)=> {
  //   let newItem = {id: doc.id, ...doc.data()};
  //   if(newItem.course && newItem.schedule){
  //     let courseData = await getDoc(newItem.course);
  //     if(courseData.exists()) {
  //       newItem.course = {courseID: courseData.id, ...courseData.data()}
  //     }
  //     let scheduleData = await getDoc(newItem.schedule);
  //     if(scheduleData.exists()) {
  //       var newSchedule = {scheduleID: scheduleData.id, ...scheduleData.data()};
  //       let roomData = await getDoc(newSchedule.room);
  //       let shiftData = await getDoc(newSchedule.shift);
  //       newSchedule.room = {roomID: roomData.id, ...roomData.data()};
  //       newSchedule.shift = {shiftID: shiftData.id, ...shiftData.data()};
  //       newItem.schedule = newSchedule;
  //     }
  //     classesInCourse.push(newItem);
  //   }
  //   else{
  //     classesInCourse.push(newItem);
  //   }
  // });
  // console.log(classesInCourse);

  // console.log(querySnapshot);
  // console.log(getDocs(classesCollectionRef));


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

// export async function getClassesInCourse(id) {
//   let classesInCourse =[];
//   const data = getDocs(classesCollectionRef);
//   const q = query(data, where("course","==","/course/"+id));
//   const querySnapshot = await getDocs(q);
  
//   querySnapshot.forEach(async (doc)=> {
//     let newItem = {id: doc.id, ...doc.data()};
//     if(newItem.course && newItem.schedule){
//       let courseData = await getDoc(newItem.course);
//       if(courseData.exists()) {
//         newItem.course = {courseID: courseData.id, ...courseData.data()}
//       }
//       let scheduleData = await getDoc(newItem.schedule);
//       if(scheduleData.exists()) {
//         var newSchedule = {scheduleID: scheduleData.id, ...scheduleData.data()};
//         let roomData = await getDoc(newSchedule.room);
//         let shiftData = await getDoc(newSchedule.shift);
//         newSchedule.room = {roomID: roomData.id, ...roomData.data()};
//         newSchedule.shift = {shiftID: shiftData.id, ...shiftData.data()};
//         newItem.schedule = newSchedule;
//       }
//       classesInCourse.push(newItem);
//     }
//     else{
//       classesInCourse.push(newItem);
//     }
//   });
//   console.log(classesInCourse);

//   console.log(querySnapshot);
//   console.log(getDocs(classesCollectionRef));
// }

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

export function createCourseRequest(courseForm) {
  var course = Mapping(courseForm);

  var result = addDoc(coursesCollectionRef, {
    name: courseForm.name,
    tuition: courseForm.tuition,
    startDate: courseForm.startDate,
    duration: courseForm.duration,
    studyCondition: courseForm.studyCondition,
    studyObject: courseForm.studyObject,
    content: courseForm.content,
    detail: courseForm.detail,
    createdDate: Date.now(),
    modifiedDate: Date.now(),
    state: parseInt(courseForm.state),
  });
  if (result) return course;
}
export function updateCourseRequest(id, courseForm) {
  var course = Mapping(courseForm);
  const courseDoc = doc(db, "Course", id);
  console.log(courseDoc);

  var result = updateDoc(courseDoc, {
    name: courseForm.name,
    tuition: courseForm.tuition,
    startDate: courseForm.startDate,
    duration: courseForm.duration,
    studyCondition: courseForm.studyCondition,
    studyObject: courseForm.studyObject,
    content: courseForm.content,
    detail: courseForm.detail,
    modifiedDate: Date.now(),
    state: parseInt(courseForm.state),
  });

  if (result) {
    return course;
  }
}
export function DeleteCourseRequest(id) {
  const courseDoc = doc(db, "Course", id);
  console.log(courseDoc);

  var result = updateDoc(courseDoc, {
    state: IsDeleted,
  });
  if (result) {
    return "success";
  }
}
