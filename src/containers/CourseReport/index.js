import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";

import { COURSE_REPORT } from "../../constants/pages";

const ListCourseReport = lazy(() => import("./List"));


const Course = () => {
  return (
    <Switch>
      <Route exact path={COURSE_REPORT}>
        <ListCourseReport />
      </Route>
    </Switch>
  );
};

export default Course;
