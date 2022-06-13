import React from "react";
import CourseFormContainer from "../CourseForm";

const CreateCourseContainer = () => {
  //   const { isAuth, account } = useAppSelector((state) => state.authReducer);
  //   const dispatch = useAppDispatch();
  //   const role = account?.role;

  return (
    <>
      {/* {role == Roles.Admin && ( */}
      <div className="ml-5">
        <h2 className="primaryColor text-title intro-x">Tạo khóa học mới </h2>

        <div className="row">
          <CourseFormContainer />
        </div>
      </div>
      {/* )}
      {role == Roles.Staff && (
        <Redirect to={HOME} />
      )} */}
    </>
  );
};

export default CreateCourseContainer;

