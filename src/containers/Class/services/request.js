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
const classesCollectionRef = collection(db,"classes");

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

export async function getClasses(requestQuery) {
  var classes = [];
  const querySnapshot = await getDocs(classesCollectionRef);
  
  querySnapshot.forEach(async (doc)=> {
    let newItem = {...doc.data(),id: doc.id};
    if(newItem.course && newItem.schedule){
      let courseData = await getDoc(newItem.course);
      if(courseData.exists()) {
        newItem.course = {...courseData.data(),courseID: courseData.id}
      }
      let scheduleData = await getDoc(newItem.schedule);
      if(scheduleData.exists()) {
        var newSchedule = {...scheduleData.data(),scheduleID: scheduleData.id};
        let roomData = await getDoc(newSchedule.room);
        let shiftData = await getDoc(newSchedule.shift);
        newSchedule.room = {...roomData.data(),roomID: roomData.id};
        newSchedule.shift = {...shiftData.data(),shiftID: shiftData.id};
        newItem.schedule = newSchedule;
      }
      classes.push(newItem);
    }
    else{
      classes.push(newItem);
    }
    setTimeout(() => {
      console.log("classes",classes);
      return classes;
    },1000);
  })
  
}
  
  

  // var item = {
  //   course:{
  //     content: "Dạy lập trình cơ bản",
  //     courseID: "gPziz6yqfwuzK4GcQBJE",
  //     detail: "Buổi 1\nBuổi 2",
  //     duration: 15,
  //     name: "Nhập môn lập trình web",
  //     state: 1,
  //     studyCondition: "Không có",
  //     studyObject: "Người muốn học lập trình căn bản",
  //     tuition: 3000000
  //   },
  //   id: "dNR8wyrjDJqxn92xncY6",
  //   name: "Lớp 1",
  //   numberOfAbsence: 0,
  //   numberOfLearning: 0,
  //   quantity: 30,
  //   schedule:{
  //     DoW: "2",
  //     name: "Lịch 1",
  //     room:{
  //       name: "Phòng 2",
  //       roomID: "rC8BeiXZ6fqBZd2YKSJc"
  //     },
  //     scheduleID: "p3SobWw8QOmu5iAFDbuO",
  //     shift:{
  //       endHour: "5h",
  //     name: "Ca 4",
  //     shiftID: "6r2tCbKwJQgcmd9WPY5R",
  //     startHour: "3h",
  //     }
  //   },
  // };
  // classes.push(item);

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
