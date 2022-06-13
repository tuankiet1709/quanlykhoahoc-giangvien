import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";

import { COURSE, CREATE_COURSE, EDIT_COURSE } from "../../constants/pages";

const ListCourse = lazy(() => import("./List"));
const CreateCourse = lazy(() => import("./Create"));
const UpdateCourse = lazy(() => import("./Update"));


const Course = () => {
  return (
    <Switch>
      <Route exact path={COURSE}>
        <ListCourse />
      </Route>
      <Route exact path={CREATE_COURSE}>
        <CreateCourse />
      </Route>
      <Route exact path={EDIT_COURSE}>
        <UpdateCourse />
      </Route>
    </Switch>
  );
};

export default Course;
