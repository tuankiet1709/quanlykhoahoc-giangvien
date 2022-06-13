import React, { useEffect, useState } from "react";
import { FunnelFill } from "react-bootstrap-icons";
import { Search } from "react-feather";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

import { Link } from "react-router-dom";
import TeacherTable from "./TeacherTable";
import { CREATE_TEACHER } from "../../../constants/pages"

import { getTeacher } from "../services/request"

import { 
  ACCSENDING, 
  DECSENDING, 
  DEFAULT_TEACHER_SORT_COLUMN_NAME,
  DEFAULT_PAGE_LIMIT
} from "../../../constants/paging"

import { TeacherStateFilters } from "../../../constants/selectOptions"
import {All, AllLabel} from "../../../constants/Teacher/TeacherStateConstant"

const ListTeacher = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: DEFAULT_PAGE_LIMIT,
    sortOrder: ACCSENDING,
    sortColumn: DEFAULT_TEACHER_SORT_COLUMN_NAME
  });

  const [search, setSearch] = useState("");
  const [teachers, setTeachers] = useState([]);

  const [selectedType, setSelectedType] = useState([
    { id: 1, label:AllLabel , value: All },
  ]);

  const handleType = (selected) => {
    if (selected.length === 0) {
      setQuery({
        ...query,
        states: [],
      });

      setSelectedType([TeacherStateFilters[0]]);
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
    let data = await getTeacher(query);
    // console.log('fetchDataCallbackAsync');
    // console.log("fetch")
    // setTeachers(data);
    console.log("fetch")
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setTeachers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    async function fetchDataAsync() {
      let result = await getTeacher(query);
      // setTeachers(result);
      // console.log("result");
      // console.log(result);
      setTeachers(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log("result");
      console.log(result.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    fetchDataAsync();
  }, [query]);

  return (
    <>
      <div className="primaryColor text-title intro-x">Danh sách giảng viên</div>

      <div>
        <div className="d-flex mb-5 intro-x">
          <div className="d-flex align-items-center w-md mr-5">
          <ReactMultiSelectCheckboxes
              options={TeacherStateFilters}
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
            <Link to={CREATE_TEACHER} state="button" className="btn btn-danger">
              Thêm giảng viên
            </Link>
          </div>
        </div>

        <TeacherTable
          teachers={teachers}
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

export default ListTeacher;
