import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";

import { TEACHER, CREATE_TEACHER, EDIT_TEACHER } from "../../constants/pages";

const ListTeacher = lazy(() => import("./List"));
const CreateTeacher = lazy(() => import("./Create"));
const UpdateTeacher = lazy(() => import("./Update"));


const Teacher = () => {
  return (
    <Switch>
      <Route exact path={TEACHER}>
        <ListTeacher />
      </Route>
      <Route exact path={CREATE_TEACHER}>
        <CreateTeacher />
      </Route>
      <Route exact path={EDIT_TEACHER}>
        <UpdateTeacher />
      </Route>
    </Switch>
  );
};

export default Teacher;
