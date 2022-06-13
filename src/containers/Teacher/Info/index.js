import React from "react";
import { Modal } from "react-bootstrap";
import { XSquare } from "react-bootstrap-icons";
import {
  IsTeaching,
  TakeABreak,
  StopTeaching,
  IsTeachingLabel,
  TakeABreakLabel,
  StopTeachingLabel,
  IsDeletedLabel,
} from "../../../constants/Teacher/TeacherStateConstant"

import {
  GenderMale,
  GenderFemaleLabel,
  GenderMaleLabel
} from "../../../constants/Teacher/GenderContants"

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

const Info = ({ teacher, handleClose }) => {

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

  const getGender = (id) => {
    return id == GenderMale?GenderMaleLabel:GenderFemaleLabel;
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
            Thông tin giảng viên {teacher.lastName} {teacher.firstName}
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
              <div className="col-4">Họ giảng viên:</div>
              <div className="col-8 text-wrap text-break">{teacher.lastName}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Tên giảng viên:</div>
              <div className="col-8 text-wrap text-break">{teacher.firstName}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Giới tính:</div>
              <div className="col-8 text-wrap text-break">{getGender(teacher.gender)}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">CMND:</div>
              <div className="col-8 text-wrap text-break">{teacher.CMND}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Địa chỉ:</div>
              <div className="col-8 text-wrap text-break">{teacher.address}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Ngày sinh:</div>
              <div className="col-8 text-wrap text-break">
                {teacher.dob.toDate().toLocaleDateString("vi-VN")}
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Email:</div>
              <div className="col-8 text-wrap text-break">
                {teacher.email}
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">SDT:</div>
              <div className="col-8 text-wrap text-break">
                {teacher.phoneNumber}
              </div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Trình độ chuyên môn:</div>
              <div className="col-8 text-wrap text-break">{getTeacherQualification(teacher.qualification)}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Số buổi dạy:</div>
              <div className="col-8 text-wrap text-break">{teacher.numberOfLessons}</div>
            </div>

            <div className="row -intro-y mt-2">
              <div className="col-4">Số buổi nghỉ:</div>
              <div className="col-8 text-wrap text-break">{teacher.numberOfAbsences}</div>
            </div>
            
            <div className="row -intro-y mt-2">
              <div className="col-4">Tình trạng:</div>
              <div className="col-8 text-wrap text-break">{getTeacherState(teacher.state)}</div>
            </div>
            
          </div>
        </Modal.Body>
      </Modal>
      
    </>
  );
};

export default Info;
