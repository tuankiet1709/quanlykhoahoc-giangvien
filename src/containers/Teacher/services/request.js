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

export async function RegisterUser(teacherForm) {
  var result = "";
  let tmp = undefined;

  const queryLatestUser = query(teacherCollectionRef,
                      orderBy("createdDate","desc"),
                      limit(1));

  const latestUser = getDocs(queryLatestUser);
  console.log("latestUser",latestUser);

  latestUser.then(function(result) {
    tmp = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  })

  await latestUser;

  console.log("tmp",tmp);

  var num = tmp.length>0 ? parseInt(tmp[0].email.substring(2,7)) : parseInt("00000");
  var date = new Date(teacherForm.dob.toUTCString());
  var countGV = ('0000' + (num+1)).slice(-5);
  var userName = `gv${countGV}`; 
  var genEmail = `${userName}@gmail.com`;
  var genPassword = `${userName}@${("0" + date.getDate()).slice(-2)}${("0" + date.getMonth()+1).slice(-2)}${("0" + date.getYear()).slice(-2)}`;

  try{
    const cred = await createUserWithEmailAndPassword(auth, genEmail, genPassword);

    let userId= cred.user.uid;

    const docData = {
      uid: userId,
      email: genEmail,
      password: genPassword,
      firstName: teacherForm.firstName,
      lastName: teacherForm.lastName,
      address: teacherForm.address,
      dob: new Date(teacherForm.dob),
      createdDate: Date.now(),
      gender: teacherForm.gender,
      CMND: teacherForm.CMND,
      phoneNumber: teacherForm.phoneNumber,
      numberOfLessons: 0,
      numberOfAbsences: 0,
      role: 1,
      qualification: parseInt(teacherForm.qualification),
      state: parseInt(teacherForm.state),
    }

    console.log(docData);

    const teacherDoc = doc(db, 'users', userId);
    setDoc(teacherDoc, docData)
    result = teacherForm.firstName;
  }
  catch (err){
    let temp = err.toString();
    console.log(temp);
    if(temp === "FirebaseError: Firebase: Error (auth/invalid-email)."){
      result = "Email không hợp lệ!";
    }
    if(temp ==="FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)."){
      result = "Mật khẩu ít nhất 6 ký tự";
    }
    
  }
  console.log(result);
  return result;
}

export function updateTeacherRequest(id, teacherForm) {
  const courseDoc = doc(db, 'users', id);
  console.log(courseDoc);

  var result = updateDoc(courseDoc, {
    firstName: teacherForm.firstName,
    lastName: teacherForm.lastName,
    address: teacherForm.address,
    dob: new Date(teacherForm.dob),
    gender: teacherForm.gender,
    CMND: teacherForm.CMND,
    phoneNumber: teacherForm.phoneNumber,
    qualification: teacherForm.qualification,
    state: parseInt(teacherForm.state),
  });

  if (result) {
    return teacherForm.firstName;
  }
}