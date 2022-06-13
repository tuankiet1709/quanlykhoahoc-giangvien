import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";

import { TEACHER_REPORT } from "../../constants/pages";

const ListTeacherReport = lazy(() => import("./List"));


const Teacher = () => {
  return (
    <Switch>
      <Route exact path={TEACHER_REPORT}>
        <ListTeacherReport />
      </Route>
    </Switch>
  );
};

export default Teacher;
