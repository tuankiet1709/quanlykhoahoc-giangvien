import React from "react";
import { Modal } from "react-bootstrap";
import { XSquare } from "react-bootstrap-icons";
import {
  NotStart,
  InProcess,
  IsEnded,
  NotStartLabel,
  InProcessLabel,
  IsEndedLabel,
  IsDeletedLabel,
} from "../../../constants/Course/CourseStateConstant"

const Info = ({ class1, handleClose }) => {
  console.log("class1", class1);

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
    <Modal
        show={true}
        onHide={handleClose}
        dialogClassName="containerModalErr"
        size="lg"
      >
        <Modal.Header className="align-items-center headerModal">
          <Modal.Title id="detail-modal" className="primaryColor">
            Thông tin chi tiết lớp học {class1.name}
          </Modal.Title>
          <XSquare
            onClick={handleClose}
            className="primaryColor model-closeIcon"
            size={25}
          />
        </Modal.Header>

        <Modal.Body className="bodyModal">
        <div className="container-fluid">
            <div className="row -intro-y mt-2">
              <div className="col-4">Tên khóa học:</div>
              <div className="col-8 text-wrap text-break">{class1.name}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Nội dung khóa học:</div>
              <div className="col-8 text-wrap text-break">{class1.content}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Chi tiết khóa học:</div>
              <div className="col-8 text-wrap text-break">{class1.detail}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Ngày khai giảng:</div>
              <div className="col-8 text-wrap text-break">
                {class1.startDate.toDate().toLocaleDateString("vi-VN")}
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Thời lượng:</div>
              <div className="col-8 text-wrap text-break">
                {class1.duration} Buổi
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Đối tượng học:</div>
              <div className="col-8 text-wrap text-break">
                {class1.studyObject}
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Điều kiện học:</div>
              <div className="col-8 text-wrap text-break">
                {class1.studyCondition}
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Học phí:</div>
              <div className="col-8 text-wrap text-break">{class1.tuition.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      
    </>
  );
};

export default Info;
