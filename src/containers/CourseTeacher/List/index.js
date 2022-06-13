import React, { useEffect, useState } from "react";
import { FunnelFill } from "react-bootstrap-icons";
import { Search } from "react-feather";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

import { Link } from "react-router-dom";
import CourseTeacherTable from "./CourseTeacherTable";
import { CREATE_COURSE } from "../../../constants/pages"

import { GetUser, getCourse, GetUserRef } from "../services/request"
import { 
  ACCSENDING, 
  DECSENDING, 
  DEFAULT_COURSE_SORT_COLUMN_NAME,
  DEFAULT_PAGE_LIMIT
} from "../../../constants/paging"

import { CourseStateFilters } from "../../../constants/selectOptions"
import {All, AllLabel} from "../../../constants/Course/CourseStateConstant"

import { 
  getAuth,
  onAuthStateChanged
} from 'firebase/auth';
import { db } from "../../../services/requests";

const ListCourse = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: DEFAULT_PAGE_LIMIT,
    sortOrder: ACCSENDING,
    sortColumn: DEFAULT_COURSE_SORT_COLUMN_NAME
  });

  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);

  const auth = getAuth();

  const [selectedType, setSelectedType] = useState([
    { id: 1, label:AllLabel , value: All },
  ]);

  const handleType = (selected) => {
    if (selected.length === 0) {
      setQuery({
        ...query,
        states: [],
      });

      setSelectedType([CourseStateFilters[0]]);
      return;
    }

    const selectedAll = selected.find((item) => item.id === 1);

    setSelectedType((prevSelected) => {
      if (!prevSelected.some((item) => item.id === 1) && selectedAll) {
        setQuery({
          ...query,
          states: [],
        });

        return [selectedAll];
      }

      const newSelected = selected.filter((item) => item.id !== 1);
      const states = newSelected.map((item) => item.value);

      setQuery({
        ...query,
        states,
      });

      return newSelected;
    });
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
    onAuthStateChanged(auth, async (user) => {
      if(user){
        const teacher = await GetUserRef(user.uid);
        const courseData = await getCourse(query, teacher);
        setCourses(courseData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        console.log("teacher",teacher);
        console.log("courseData",courseData);
        console.log("courses",courses);
      }
    })

  }

  useEffect(() => {
    async function fetchDataAsync() {
      onAuthStateChanged(auth, async (user) => {
        if(user){
          const teacher = await GetUserRef(user.uid);
          const courseData = await getCourse(query, teacher);
          setCourses(courseData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          console.log("teacher",teacher);
          console.log("courseData",courseData);
          console.log("courses",courses);
        }
      })
    }

    fetchDataAsync();
  }, [query]);

  return (
    <>
      <div className="primaryColor text-title intro-x">Danh sách khóa học</div>

      <div>
        <div className="d-flex mb-5 intro-x">
          <div className="d-flex align-items-center w-md mr-5">
          <ReactMultiSelectCheckboxes
              options={CourseStateFilters}
              hideSearch={true}
              placeholderButtonLabel="State"
              value={selectedType}
              onChange={handleType}
            />

            <div className="border p-2">
              <FunnelFill />
            </div>
          </div>

          <div className="d-flex align-items-center w-ld ml-auto">
            <div className="input-group">
              <input
                onChange={handleChangeSearch}
                value={search}
                state="text"
                className="form-control"
              />
              <span onClick={handleSearch} className="border p-2 pointer">
                <Search />
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center ml-3">
            <Link to={CREATE_COURSE} state="button" className="btn btn-danger">
              Tạo khóa học mới
            </Link>
          </div>
        </div>

        <CourseTeacherTable
          courses={courses}
          handlePage={handlePage}
          handleSort={handleSort}
          sortState={{
            columnValue: query.sortColumn,
            orderBy: query.sortOrder,
          }}
          fetchData={fetchDataCallbackAsync}
        />
      </div>
    </>
  );
};

export default ListCourse;
