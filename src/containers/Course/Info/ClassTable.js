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

const columns = [
  { columnName: "STT", columnValue: "" },
  { columnName: "Tên lớp học", columnValue: "name" },
  { columnName: "Số buổi vắng", columnValue: "numberOfAbsence" },
  { columnName: "Số buổi học", columnValue: "numberOfLearning" },
  { columnName: "Sỉ số", columnValue: "quantity" },
  { columnName: "Giảng viên", columnValue: 'user.lastName +" "+user.firstName' },
  { columnName: "Khóa học", columnValue: "course.name" },
];

const ClassTable = ({
  classes,
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

  const handleShowInfo = (id) => {
    const course = classes.find((item) => item.id === id);

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
    const existCourse = classes?.find((item) => item.id === id);
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
          currentPage: classes?.currentPage,
          totalPage: classes?.totalPages,
          handleChange: handlePage,
        }}
      >
        {classes &&
          classes?.map((data, index) => (
            <tr
              key={index}
              className=""
              onClick={() => handleShowInfo(data.id)}
            >
              <td className="text-center">{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.numberOfAbsence}</td>
              <td>{data.numberOfLearning}</td>
              <td>{data.quantity}</td>
              <td>{data.user.lastName +" "+data.user.firstName}</td>
              <td>{data.course.name}</td>
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

export default ClassTable;
