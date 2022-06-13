import React, { useState } from "react";
import { PencilFill, XCircle } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import ButtonIcon from "../../../components/ButtonIcon";
import { NotificationManager } from "react-notifications";

import Table, { SortType } from "../../../components/Table";
import Info from "../Info";
import { EDIT_COURSE_ID } from "../../../constants/pages";
import ConfirmModal from "../../../components/ConfirmModal";
import { DeleteCourseRequest } from "../services/request"
import {
  NotStart,
  InProcess,
  IsEnded,
  NotStartLabel,
  InProcessLabel,
  IsEndedLabel,
  IsDeletedLabel,
} from "../../../constants/Course/CourseStateConstant"

const columns = [
  { columnName: "STT", columnValue: "" },
  { columnName: "Tên khóa học", columnValue: "name" },
  { columnName: "Ngày bắt đầu", columnValue: "startDate" },
  { columnName: "Thời gian học", columnValue: "duration" },
  { columnName: "Tình trạng", columnValue: "state"},
];

const CourseTeacherTable = ({
  courses,
  handlePage,
  handleSort,
  sortState,
  fetchData,
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [courseDetail, setCourseDetail] = useState(null);
  const [disableState, setDisable] = useState({
    isOpen: false,
    id: 0,
    title: "",
    message: "",
    isDisable: true,
  });

  const getCourseState = (id) => {
    switch(id) {
      case NotStart:
      return NotStartLabel;
        break;
      case InProcess:
        return InProcessLabel;
        break;
      case IsEnded:
        return IsEndedLabel;
        break;
      default:
        return IsDeletedLabel;
        break;
    }
    
  }

  const handleShowInfo = (id) => {
    const course = courses.find((item) => item.id === id);

    if (course) {
      setCourseDetail(course);
      setShowDetail(true);
    }
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };
  return (
    <>
      <Table
        columns={columns}
        handleSort={handleSort}
        sortState={sortState}
        page={{
          currentPage: courses?.currentPage,
          totalPage: courses?.totalPages,
          handleChange: handlePage,
        }}
      >
        {courses &&
          courses?.map((data, index) => (
            <tr
              key={index}
              className=""
              onClick={() => handleShowInfo(data.id)}
            >
              <td className="text-center">{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.startDate.toDate().toLocaleDateString("vi-VN")}</td>
              <td>{data.duration} Buổi</td>
              <td>{getCourseState(data.state)}</td>
              <td></td>
            </tr>
          ))}
      </Table>
      {courseDetail && showDetail && (
        <Info course={courseDetail} handleClose={handleCloseDetail} />
      )}
    </>
  );
};

export default CourseTeacherTable;
