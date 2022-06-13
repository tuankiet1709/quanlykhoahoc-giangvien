import React, { useState } from "react";
import { PencilFill, XCircle } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import ButtonIcon from "../../../components/ButtonIcon";
import { NotificationManager } from "react-notifications";

import Table, { SortType } from "../../../components/Table";
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
  { columnName: "Tên khóa học", columnValue: "name" },
  { columnName: "Ngày bắt đầu", columnValue: "startDate" },
  { columnName: "Tổng buổi học", columnValue: "duration" },
  { columnName: "Số buổi học", columnValue: "studied" },
  { columnName: "Số buổi vắng", columnValue: "absence" },
  { columnName: "Số học viên", columnValue: "quantity" },
  { columnName: "Tình trạng", columnValue: "state"},
];

const CourseTable = ({
  courses,
  handlePage,
  handleSort,
  sortState,
  fetchData,
}) => {
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
            >
              <td>{data.name}</td>
              <td>{data.startDate.toDate().toLocaleDateString("vi-VN")}</td>
              <td>{data.duration} Buổi</td>
              <td>{data.studied} Buổi</td>
              <td>{data.absence} Buổi</td>
              <td>{data.quantity}</td>
              <td>{getCourseState(data.state)}</td>
              <td></td>
            </tr>
          ))}
      </Table>
    </>
  );
};

export default CourseTable;
