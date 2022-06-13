import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";

import { CLASS, CREATE_CLASS, EDIT_CLASS } from "../../constants/pages";

const ListClass = lazy(() => import("./List"));
const CreateClass = lazy(() => import("./Create"));
const UpdateClass = lazy(() => import("./Update"));


const Class = () => {
  return (
    <Switch>
      <Route exact path={CLASS}>
        <ListClass />
      </Route>
      <Route exact path={CREATE_CLASS}>
        <CreateClass />
      </Route>
      <Route exact path={EDIT_CLASS}>
        <UpdateClass />
      </Route>
    </Switch>
  );
};

export default Class;
