import React, { lazy, Suspense, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { HOME, COURSE, TEACHER, CLASS, LOGIN, ADMIN, NOTFOUND, COURSE_TEACHER, COURSE_REPORT, TEACHER_REPORT } from "../constants/pages.js";
import InLineLoader from "../components/InlineLoader";
import PrivateRoute from "./PrivateRoute";

const Home = lazy(() => import('../containers/Home'));
const Course = lazy(() => import('../containers/Course'));
const Teacher = lazy(() => import('../containers/Teacher'));
const CourseTeacher = lazy(() => import('../containers/CourseTeacher'));
const Class = lazy(() => import('../containers/Class'));
const Login = lazy(() => import("../containers/Authorize"));
const CourseReport = lazy(() => import("../containers/CourseReport"));
const TeacherReport = lazy(() => import("../containers/TeacherReport"));
const NotFound = lazy(() => import("../containers/NotFound"));

const SusspenseLoading = ({ children }) => (
  <Suspense fallback={<InLineLoader />}>{children}</Suspense>
);

const Routes = () => {

  return (
    <SusspenseLoading>
      <Switch>
        <PrivateRoute exact path={HOME}>
          <Home />
        </PrivateRoute>
        <Route exact path={LOGIN}>
          <Login />
        </Route>

        <PrivateRoute path={COURSE}>
            <Course />
        </PrivateRoute>
        <PrivateRoute path={CLASS}>
            <Class />
        </PrivateRoute>
        <PrivateRoute path={TEACHER}>
            <Teacher />
        </PrivateRoute>
        <PrivateRoute path={COURSE_TEACHER}>
            <CourseTeacher />
        </PrivateRoute>
        <PrivateRoute path={COURSE_REPORT}>
            <CourseReport/>
        </PrivateRoute>
        <PrivateRoute path={TEACHER_REPORT}>
            <TeacherReport />
        </PrivateRoute>
        <Route path="*" component={NotFound} />
      </Switch>
    </SusspenseLoading>
  );
};

export default Routes;
