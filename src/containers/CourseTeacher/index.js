import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";

import { COURSE_TEACHER } from "../../constants/pages";

const ListCourseTeacher = lazy(() => import("./List"));


const CourseTeacher = () => {
  return (
    <Switch>
      <Route exact path={COURSE_TEACHER}>
        <ListCourseTeacher />
      </Route>
    </Switch>
  );
};

export default CourseTeacher;
