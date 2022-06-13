import React, { useState } from "react";
import { PencilFill, XCircle } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import ButtonIcon from "../../../components/ButtonIcon";
import { NotificationManager } from "react-notifications";

import Table, { SortType } from "../../../components/Table";
import { EDIT_TEACHER_ID } from "../../../constants/pages";
import ConfirmModal from "../../../components/ConfirmModal";
import {
  IsTeaching,
  TakeABreak,
  StopTeaching,
  IsTeachingLabel,
  TakeABreakLabel,
  StopTeachingLabel,
  IsDeletedLabel,
} from "../../../constants/Teacher/TeacherStateConstant";

import {
  GenderMale,
  GenderFemaleLabel,
  GenderMaleLabel
} from "../../../constants/Teacher/GenderContants";

import {
  Primary,
  Intermediate,
  Colleges,
  University,
  Master,
  Doctor,
  PrimaryLabel,
  IntermediateLabel,
  CollegesLabel,
  UniversityLabel,
  MasterLabel,
  DoctorLabel,
} from "../../../constants/Teacher/QualificationConstants";

const columns = [
  { columnName: "Họ tên", columnValue: 'lastName +" "+firstName' },
  { columnName: "Số lớp dạy", columnValue: "classNumber" },
  { columnName: "Số buổi dạy", columnValue: "numberOfLessons" },
  { columnName: "Số buổi nghỉ", columnValue: "numberOfAbsences"},
  { columnName: "Tình trạng", columnValue: "state"},
];

const TeacherTable = ({
  teachers,
  handlePage,
  handleSort,
  sortState,
  fetchData,
}) => {
  const getTeacherState = (id) => {
    switch(id) {
      case IsTeaching:
      return IsTeachingLabel;
        break;
      case TakeABreak:
        return TakeABreakLabel;
        break;
      case StopTeaching:
        return StopTeachingLabel;
        break;
      default:
        return IsDeletedLabel;
        break;
    }
    
  }

  const getTeacherQualification = (id) => {
    switch(id) {
      case Primary:
      return PrimaryLabel;
        break;
      case Intermediate:
        return IntermediateLabel;
        break;
      case Colleges:
        return CollegesLabel;
        break;
      case University:
        return UniversityLabel;
        break;
      case Master:
        return MasterLabel;
        break;
      default:
        return DoctorLabel;
        break;
    }
  }

  const getGender = (id) => {
    return id == GenderMale?GenderMaleLabel:GenderFemaleLabel;
  }
  return (
    <>
      <Table
        columns={columns}
        handleSort={handleSort}
        sortState={sortState}
        page={{
          currentPage: teachers?.currentPage,
          totalPage: teachers?.totalPages,
          handleChange: handlePage,
        }}
      >
        {teachers &&
          teachers?.map((data, index) => (
            <tr
              key={index}
              className=""
            >
              <td>{data.lastName + " "+ data.firstName}</td>
              <td>{data.classNumber}</td>
              <td>{data.numberOfLessons}</td>
              <td>{data.numberOfAbsences}</td>
              <td>{getTeacherState(data.state)}</td>
              <td></td>
            </tr>
          ))}
      </Table>
    </>
  );
};

export default TeacherTable;
