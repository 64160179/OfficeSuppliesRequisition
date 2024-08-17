import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <br />   
      <h1 className="title">หน้าหลัก</h1>
      <h2 className="subtitle"  style={{ marginTop: '10px' }}>
        ยินดีต้อนรับ <strong>{user && user.fname}</strong> <strong>{user && user.lname}</strong>
      </h2>
    </div>
  );
};

export default Welcome;
