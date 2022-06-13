import React, { useEffect, useState } from "react";
import { FunnelFill } from "react-bootstrap-icons";
import { Search } from "react-feather";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

import { Link } from "react-router-dom";
import ClassTable from "./ClassTable";
import { CREATE_COURSE } from "../../../constants/pages"

import { getClasses } from "../services/request"

import {
  collection,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../services/requests";

import { 
  ACCSENDING, 
  DECSENDING, 
  DEFAULT_CLASS_SORT_COLUMN_NAME,
  DEFAULT_PAGE_LIMIT
} from "../../../constants/paging"

// import { CourseStateFilters } from "../../../constants/selectOptions"
// import {All, AllLabel} from "../../../constants/Course/CourseStateConstant"

const ListClass = ({courseId}) => {
  const [query, setQuery] = useState({
    page: 1,
    limit: DEFAULT_PAGE_LIMIT,
    sortOrder: ACCSENDING,
    sortColumn: DEFAULT_CLASS_SORT_COLUMN_NAME
  });

  const [search, setSearch] = useState("");
  const [classes, setClasses] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const classesCollectionRef = collection(db,"classes");

  // const [selectedType, setSelectedType] = useState([
  //   { id: 1, label:AllLabel , value: All },
  // ]);

  const handleType = (selected) => {
    if (selected.length === 0) {
      setQuery({
        ...query,
        states: [],
      });

      // setSelectedType([CourseStateFilters[0]]);
      return;
    }

    const selectedAll = selected.find((item) => item.id === 1);

    // setSelectedType((prevSelected) => {
    //   if (!prevSelected.some((item) => item.id === 1) && selectedAll) {
    //     setQuery({
    //       ...query,
    //       states: [],
    //     });

    //     return [selectedAll];
    //   }

    //   const newSelected = selected.filter((item) => item.id !== 1);
    //   const states = newSelected.map((item) => item.value);

    //   setQuery({
    //     ...query,
    //     states,
    //   });

    //   return newSelected;
    // });
  };

  const handleChangeSearch = (e) => {
    e.preventDefault();

    const search = e.target.value;
    setSearch(search);
  };

  const handlePage = (page) => {
    setQuery({
      ...query,
      page,
    });
  };

  const handleSearch = () => {
    setQuery({
      ...query,
      search,
    });
  };

  const handleSort = (sortColumn) => {
    const sortOrder = query.sortOrder === ACCSENDING ? DECSENDING : ACCSENDING;

    setQuery({
      ...query,
      sortColumn,
      sortOrder,
    });
  };

  const fetchDataCallbackAsync = async () =>  {
    var tmp = [];
    const querySnapshot = await getDocs(classesCollectionRef);
      
      querySnapshot.forEach(async (doc)=> {
        let newItem = {...doc.data(),id: doc.id};
        if(newItem.course && newItem.schedule){
          let courseData = await getDoc(newItem.course);
          if(courseData.exists()) {
            if(courseData.id != courseId){
              return;
            }
            newItem.course = {...courseData.data(),courseID: courseData.id}
          }
          let userData = await getDoc(newItem.user);
          if(userData.exists()) {
            newItem.user = {...userData.data(),userID: userData.id}
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
          
          tmp.push(newItem);
        }
        else{
          tmp.push(newItem);
        }
      })

      setTimeout(() => {
        console.log("tmp",tmp);
        setClasses(tmp);
        setLoading(true);
      },500)
    
  }

  useEffect(() => {
    async function fetchDataAsync() {
      var tmp = [];
      const querySnapshot = await getDocs(classesCollectionRef);
      
      querySnapshot.forEach(async (doc)=> {
        let newItem = {...doc.data(),id: doc.id};
        if(newItem.course && newItem.schedule){
          let courseData = await getDoc(newItem.course);
          if(courseData.exists()) {
            console.log("courseData.id",courseData.id);
            console.log("courseId",courseId);

            console.log("so sanh",courseData.id != courseId)
            if(courseData.id != courseId){
              return;
            }
            newItem.course = {...courseData.data(),courseID: courseData.id}
          }
          let userData = await getDoc(newItem.user);
          if(userData.exists()) {
            newItem.user = {...userData.data(),userID: userData.id}
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
          tmp.push(newItem);
        }
        else{
          tmp.push(newItem);
        }
      })

      setTimeout(() => {
        console.log("tmp",tmp);
        setClasses(tmp);
        setLoading(true);
      },500)
      
    }
    setTimeout(async () => {
      await fetchDataAsync();
    }, 1000);
  }, [query]);
  if(isLoading===true){
    return (
      <>
          {classes.length>0 ?
            <ClassTable
            classes={classes}
            handlePage={handlePage}
            handleSort={handleSort}
            sortState={{
              columnValue: query.sortColumn,
              orderBy: query.sortOrder,
            }}
            fetchData={fetchDataCallbackAsync}
          />:
          <p className="text-center font-weight-bold">Không có bất kỳ lớp học nào</p>
          }
          
      </>
    );
  };
  }
  

export default ListClass;
