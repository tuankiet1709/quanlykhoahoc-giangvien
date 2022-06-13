import React, { useState, useEffect } from "react";
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

import { getTeacherRef, getScheduleRef, getShiftRef, getRoomRef } from "../services/request"


const Info = ({ course, handleClose }) => {
  const [teacher, setTeacher] = useState([]);
  const [shift, setShift] = useState([]);
  const [room, setRoom] = useState([]);
  const [schedule, setSchedule] = useState([]);


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

  console.log("course",course);

  useEffect(() => {
    getTeacherRef(course.user)
              .then((result) => {
                setTeacher(result);
              })  

    getScheduleRef(course.schedule)
              .then((result) => {
                setSchedule(result);
                getRoomRef(result.room)
                          .then((result) => {
                            setRoom(result);
                          })  

                getShiftRef(result.shift)
                          .then((result) => {
                            setShift(result);
                          })  
              })  

    
  },[]);

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
            Thông tin chi tiết khóa học {course.name}
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
              <div className="col-8 text-wrap text-break">{course.name}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Nội dung khóa học:</div>
              <div className="col-8 text-wrap text-break">{course.content}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Chi tiết khóa học:</div>
              <div className="col-8 text-wrap text-break">{course.detail}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Ngày khai giảng:</div>
              <div className="col-8 text-wrap text-break">
                {course.startDate.toDate().toLocaleDateString("vi-VN")}
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Thời lượng:</div>
              <div className="col-8 text-wrap text-break">
                {course.duration} Buổi
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Phòng học:</div>
              <div className="col-8 text-wrap text-break">
                {room.name}
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Lịch học: </div>
              <div className="col-8 text-wrap text-break">
                Thứ {schedule.DoW + " "+ shift.startHour}
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Đối tượng học:</div>
              <div className="col-8 text-wrap text-break">
                {course.studyObject}
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Điều kiện học:</div>
              <div className="col-8 text-wrap text-break">
                {course.studyCondition}
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Học phí:</div>
              <div className="col-8 text-wrap text-break">{course.tuition.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Giảng viên:</div>
              <div className="col-8 text-wrap text-break">{teacher.firstName + " " + teacher.lastName}</div>
            </div>
            
            <div className="row -intro-y mt-2">
              <div className="col-4">Tình trạng:</div>
              <div className="col-8 text-wrap text-break">{getCourseState(course.state)}</div>
            </div>

            {/* <div className="row -intro-y mt-2">
              <div className="col-sm-3 col-md-3 col-lg-3">Danh sách lớp học:</div>
              <div className="col-md-12 col-lg-9">
                <ListClass courseId={course.id}/>
              </div>
            </div> */}

          </div>
        </Modal.Body>
      </Modal>
      
    </>
  );
};

export default Info;
