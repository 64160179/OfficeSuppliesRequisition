import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoPricetag, IoHome, IoSettingsSharp, IoPerson } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth) || {};

  useEffect(() => {
    // โหลดข้อมูล user จากเซิร์ฟเวอร์เมื่อ component ถูก mount
    if (!user) {
      dispatch(getMe());
    }
  }, [dispatch, user]);

  // ตรวจสอบว่า user เป็น null หรือไม่
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">ทั่วไป</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/home"}>
              <IoHome /> หน้าหลัก
            </NavLink>
          </li>
          <li>
            <NavLink to={"/products"}>
              <IoPricetag /> วัสดุ-อุปกรณ์
            </NavLink>
          </li>
          <li>
            <NavLink to={"/historys"}>
              <FaHistory /> ประวัติการขอเบิก
            </NavLink>
          </li>
        </ul>

        {user && user.role === "admin" &&  (
        <div>
          <p className="menu-label">ผู้ดูแลระบบ</p>
          <ul className="menu-list">
            <li>
              <NavLink to={"/users"}>
                <IoPerson /> รายชื่อผู้ใช้
              </NavLink>
            </li>
          </ul>
        </div>
        )}

        <p className="menu-label">การตั้งค่า</p>
        <ul className="menu-list">
          <li>
            <NavLink to={`/editprofile/${user.uuid}`} className="sidebar-link">
              <IoSettingsSharp /> ตั้งค่าบัญชีผู้ใช้
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
