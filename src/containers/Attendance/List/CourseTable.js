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
  { columnName: "Học phí", columnValue: "tuition" },
  { columnName: "Tình trạng", columnValue: "state"},
];

const CourseTable = ({
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
        title: "Can not disable Course",
        message,
        isDisable: result,
      });
    }
  };

  const handleConfirmDisable = async () => {
    let isSuccess = await DeleteCourseRequest(disableState.id);
    if (isSuccess) {
      await handleResult(true, '');
    }
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const history = useHistory();
  const handleEdit = (id) => {
    const existCourse = courses?.find((item) => item.id === id);
    console.log(existCourse);
    history.push(EDIT_COURSE_ID(id), {
      existCourse: existCourse,
    });
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
              <td>{data.tuition.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
              <td>{getCourseState(data.state)}</td>

              <td className="d-flex">
                <ButtonIcon onClick={() => handleEdit(data.id)} disable={(data.state === 3 || data.state === 4) ? true:false}>
                  <PencilFill className="text-black" />
                </ButtonIcon>
                <ButtonIcon onClick={() => handleShowDisable(data.id)} disable={(data.state === 3 || data.state === 4) ? true:false}>
                  <XCircle className="text-danger mx-2" />
                </ButtonIcon>
              </td>
            </tr>
          ))}
      </Table>
      {courseDetail && showDetail && (
        <Info course={courseDetail} handleClose={handleCloseDetail} />
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
                onClick={handleConfirmDisable}
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

export default CourseTable;
