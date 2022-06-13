import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const breadcrumbNameMap = {
  "/": "Home",
  "/teacher": "Quản lý giảng viên",
  "/teacher/create": "Tạo mới giảng viên",
  "/course": "Quản lý khóa học",
  "/course/create": "Tạo mới khóa học",
  "/course/edit": "Chỉnh sửa khóa học",
  "/class": "Quản lý lớp học",
};

const HeaderBreadcrumbs = () => {
  const history = useHistory();
  var Course = history.location.state?.existCourse;

  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    return (
      <div>
        <Breadcrumbs
          separator={
            <NavigateNextIcon fontSize="small" className="text-light" />
          }
          aria-label="breadcrumb"
        >
          {pathnames.length === 0 ? (
            <Typography className="text-light text-decoration-none fw-bold">
              Home
            </Typography>
          ) : null}
          {pathnames.map((value, index) => {
            // const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;

            if (Course) {
              const last = index === pathnames.length - 2;
              
              if (last) {
                return (
                  <Typography
                    className="text-light text-decoration-none fw-bold"
                    key={to}
                  >
                    {breadcrumbNameMap[to]}
                  </Typography>
                );
              }
              
              else if (index === pathnames.length - 1) {
                return null;
              } 
              
              else {
                return (
                  <Link
                    className="text-light text-decoration-none fw-bold"
                    to={to}
                    key={to}
                  >
                    {breadcrumbNameMap[to]}
                  </Link>
                );
              }
            } 
            
            else {
              const last = index === pathnames.length - 1;           
              
              if (last) {
                return (
                  <Typography
                    className="text-light text-decoration-none fw-bold"
                    key={to}
                  >
                    {breadcrumbNameMap[to]}
                  </Typography>
                );
              } 
              
              else {
                return (
                  <Link
                    className="text-light text-decoration-none fw-bold"
                    to={to}
                    key={to}
                  >
                    {breadcrumbNameMap[to]}
                  </Link>
                );
              }
            }
          })}
        </Breadcrumbs>
      </div>
    );
  };
  return <>{breadCrumbView()}</>;
};

export default HeaderBreadcrumbs;
