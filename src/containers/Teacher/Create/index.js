import React from "react";
import TeacherFormContainer from "../TeacherForm";

const CreateTeacherContainer = () => {
  //   const { isAuth, account } = useAppSelector((state) => state.authReducer);
  //   const dispatch = useAppDispatch();
  //   const role = account?.role;

  return (
    <>
      {/* {role == Roles.Admin && ( */}
      <div className="ml-5">
        <h2 className="primaryColor text-title intro-x">Thêm giảng viên mới</h2>

        <div className="row">
          <TeacherFormContainer />
        </div>
      </div>
      {/* )}
      {role == Roles.Staff && (
        <Redirect to={HOME} />
      )} */}
    </>
  );
};

export default CreateTeacherContainer;

