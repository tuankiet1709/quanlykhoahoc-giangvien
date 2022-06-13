import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import CourseForm from "../CourseForm";

const UpdateCourseContainer = () => {
  const [course, setCourse] = useState(undefined);

  const { state } = useLocation();

  const { existCourse } = state;

  useEffect(() => {
    if (existCourse) {
      setCourse({
        id: existCourse.id,
        name: existCourse.name,
        tuition: existCourse.tuition,
        startDate: existCourse.startDate.toDate(),
        duration: existCourse.duration,
        studyCondition: existCourse.studyCondition,
        studyObject: existCourse.studyObject,
        content: existCourse.content,
        detail: existCourse.detail,
        state: existCourse.state,
      });
    }
  }, [existCourse]);
  console.log(existCourse);
  console.log("edit");
  console.log(course);

  return (
    <>
      <div className="ml-5">
        <div className="primaryColor text-title intro-x">
          Cập nhật thông tin khóa học {course?.name}
        </div>

        <div className='row'>
        {
          course && (<CourseForm
            initialCourseForm={course}
  
          />)
        }
        </div>

      </div>
    </>
  )
};

export default UpdateCourseContainer;
