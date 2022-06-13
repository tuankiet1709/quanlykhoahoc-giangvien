import React, { useState } from "react";
import { PencilFill, XCircle } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import ButtonIcon from "../../../components/ButtonIcon";
import { NotificationManager } from "react-notifications";

import Table, { SortType } from "../../../components/Table";
import Info from "../Info";
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
  { columnName: "STT", columnValue: "" },
  { columnName: "Họ", columnValue: "lastName" },
  { columnName: "Tên", columnValue: "firstName" },
  { columnName: "Giới tính", columnValue: "gender" },
  { columnName: "Ngày sinh", columnValue: "dob" },
  { columnName: "Trình độ chuyên môn", columnValue: "qualification"},
  { columnName: "Tình trạng", columnValue: "state"},
];

const TeacherTable = ({
  teachers,
  handlePage,
  handleSort,
  sortState,
  fetchData,
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [teacherDetail, setTeacherDetail] = useState(null);
  const [disableState, setDisable] = useState({
    isOpen: false,
    id: 0,
    title: "",
    message: "",
    isDisable: true,
  });

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

  const handleShowInfo = (id) => {
    const teacher = teachers.find((item) => item.id === id);

    if (teacher) {
      setTeacherDetail(teacher);
      setShowDetail(true);
    }
  };

  const handleShowDisable = async (id) => {
    setDisable({
      id,
      isOpen: true,
      title: "Bạn có chắc chắn?",
      message: "Bạn có muốn xóa khóa học này?",
      isDisable: true,
    });
  };

  const handleCloseDisable = () => {
    setDisable({
      isOpen: false,
      id: 0,
      title: "",
      message: "",
      isDisable: true,
    });
  };

  const handleResult = async (result, message) => {
    if (result) {
      handleCloseDisable();
      await fetchData();
      NotificationManager.success(
        `Xóa khóa học thành công`,
        `Xóa thành công`,
        2000
      );
    } else {
      setDisable({
        ...disableState,
        title: "Can not disable Teacher",
        message,
        isDisable: result,
      });
    }
  };

  // const handleConfirmDisable = async () => {
  //   let isSuccess = await DeleteTeacherRequest(disableState.id);
  //   if (isSuccess) {
  //     await handleResult(true, '');
  //   }
  // };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const history = useHistory();
  const handleEdit = (id) => {
    const existTeacher = teachers?.find((item) => item.id === id);
    console.log(existTeacher);
    history.push(EDIT_TEACHER_ID(id), {
      existTeacher: existTeacher,
    });
  };

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
              onClick={() => handleShowInfo(data.id)}
            >
              <td className="text-center">{index + 1}</td>
              <td>{data.lastName}</td>
              <td>{data.firstName}</td>
              <td>{getGender(data.gender)}</td>
              <td>{data.dob.toDate().toLocaleDateString("vi-VN")}</td>
              <td>{getTeacherQualification(data.qualification)}</td>
              <td>{getTeacherState(data.state)}</td>

              <td className="d-flex">
                <ButtonIcon onClick={() => handleEdit(data.id)} disable={data.state===3?true:false}>
                  <PencilFill className="text-black" />
                </ButtonIcon>
              </td>
            </tr>
          ))}
      </Table>
      {teacherDetail && showDetail && (
        <Info teacher={teacherDetail} handleClose={handleCloseDetail} />
      )}
      <ConfirmModal
        title={disableState.title}
        isShow={disableState.isOpen}
        onHide={handleCloseDisable}
      >
        <div>
          <div className="text-center">{disableState.message}</div>
          {disableState.isDisable && (
            <div className="text-center mt-3">
              <button
                className="btn btn-danger mr-3"
                // onClick={handleConfirmDisable}
                type="button"
              >
                Xóa khóa học
              </button>

              <button
                className="btn btn-outline-secondary"
                onClick={handleCloseDisable}
                type="button"
              >
                Hủy xóa
              </button>
            </div>
          )}
        </div>
      </ConfirmModal>
    </>
  );
};

export default TeacherTable;
