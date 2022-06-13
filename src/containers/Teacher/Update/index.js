import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import TeacherForm from "../TeacherForm";

const UpdateTeacherContainer = () => {
  const [teacher, setTeacher] = useState(undefined);

  const { state } = useLocation();

  const { existTeacher } = state;

  useEffect(() => {
    if (existTeacher) {
      setTeacher({
        id: existTeacher.id,
        firstName: existTeacher.firstName,
        lastName: existTeacher.lastName,
        address: existTeacher.address,
        dob: existTeacher.dob.toDate(),
        gender: existTeacher.gender,
        CMND: existTeacher.CMND,
        phoneNumber: existTeacher.phoneNumber,
        qualification: existTeacher.qualification,
        state: existTeacher.state,
      });
    }
  }, [existTeacher]);
  console.log(existTeacher);
  console.log("edit");
  console.log(teacher);

  return (
    <>
      <div className="ml-5">
        <div className="primaryColor text-title intro-x">
          Cập nhật thông tin giảng viên {teacher?.firstName}
        </div>

        <div className='row'>
        {
          teacher && (<TeacherForm
            initialTeacherForm={teacher}
  
          />)
        }
        </div>

      </div>
    </>
  )
};

export default UpdateTeacherContainer;
