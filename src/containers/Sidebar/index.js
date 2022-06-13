import React, { useState, useEffect } from "react";
import "./index.css";
import { NavLink } from "react-router-dom";
import { HOME, COURSE, TEACHER, CLASS, ADMIN, COURSE_TEACHER, COURSE_REPORT, TEACHER_REPORT } from "../../constants/pages";
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import {GetUser} from "../Authorize/services"

const Sidebar = () => {
  const [userData, setUserData] = useState({});
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log("sidebar",user.uid);
      await setUserData((await GetUser(user.uid)).data());
      console.log(userData);
    })
  },[]);
  
  return (
    <>
      <div id="Logo_mjb">
        {/* <img
          
          src="/Logo.png"
          alt=""
        /> */}
        <div id="Online_Asset_Management_mjc">
          <span>Quản lý Giảng Viên, Khóa Học</span>
        </div>
      </div>

      <div id="sizeBar">
        <ul className="SidebarList">
          {userData.role === 0 ?(
            <>
              <li className="row">
                <NavLink to={COURSE} activeClassName="active" className="link">
                  <div className="title">Quản lý khóa học</div>
                </NavLink>
              </li>
              <li className="row">
                <NavLink to={TEACHER} activeClassName="active" className="link">
                  <div className="title">Quản lý giảng viên</div>
                </NavLink>
              </li>
              <li className="row">
                <NavLink to={COURSE_REPORT} activeClassName="active" className="link">
                  <div className="title">Báo cáo khóa học</div>
                </NavLink>
              </li>
              <li className="row">
                <NavLink to={TEACHER_REPORT} activeClassName="active" className="link">
                  <div className="title">Báo cáo giảng viên</div>
                </NavLink>
              </li>
            </>
          ):(
            <>
              <li className="row active">
                <NavLink to={COURSE_TEACHER} exact activeClassName="active" className="link">
                  <div className="title">Khóa học của giảng viên</div>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
