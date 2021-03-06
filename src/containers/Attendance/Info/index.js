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
  const [teacher, setTeacher] = useState("");
  const [shift, setShift] = useState("");
  const [room, setRoom] = useState("");
  const [schedule, setSchedule] = useState("");


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
    console.log("course.user",course.user);
    if(course.user){
      getTeacherRef(course.user)
              .then((result) => {
                setTeacher(result);
              })  
    }
    if(course.schedule){
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
    }

    

    
  },[]);

  console.log("teacher",teacher);
  console.log("schedule",schedule);
  console.log("room",room);
  console.log("shift",shift);


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
            Th??ng tin chi ti???t kh??a h???c {course.name}
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
              <div className="col-4">T??n kh??a h???c:</div>
              <div className="col-8 text-wrap text-break">{course.name}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">N???i dung kh??a h???c:</div>
              <div className="col-8 text-wrap text-break">{course.content}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Chi ti???t kh??a h???c:</div>
              <div className="col-8 text-wrap text-break">{course.detail}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Ng??y khai gi???ng:</div>
              <div className="col-8 text-wrap text-break">
                {course.startDate.toDate().toLocaleDateString("vi-VN")}
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Th???i l?????ng:</div>
              <div className="col-8 text-wrap text-break">
                {course.duration} Bu???i
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Ph??ng h???c:</div>
              <div className="col-8 text-wrap text-break">
                {schedule?room.name:"Ch??a c?? ph??ng h???c"}
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">L???ch h???c: </div>
              <div className="col-8 text-wrap text-break">
                {schedule?"Th??? "+schedule.DoW + " "+ shift.startHour:"Ch??a c?? l???ch h???c"}
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">?????i t?????ng h???c:</div>
              <div className="col-8 text-wrap text-break">
                {course.studyObject}
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">??i???u ki???n h???c:</div>
              <div className="col-8 text-wrap text-break">
                {course.studyCondition}
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">H???c ph??:</div>
              <div className="col-8 text-wrap text-break">{course.tuition.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Gi???ng vi??n:</div>
              <div className="col-8 text-wrap text-break">
                {teacher?teacher.firstName + " " + teacher.lastName:"Ch??a c?? gi???ng vi??n"}
                </div>
            </div>
            
            <div className="row -intro-y mt-2">
              <div className="col-4">T??nh tr???ng:</div>
              <div className="col-8 text-wrap text-break">{getCourseState(course.state)}</div>
            </div>

            {/* <div className="row -intro-y mt-2">
              <div className="col-sm-3 col-md-3 col-lg-3">Danh s??ch l???p h???c:</div>
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
