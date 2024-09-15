import React from "react";
import { useSelector } from "react-redux";
import img1 from "../asset/img1.png";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <br />
      <h1 className="title">หน้าหลัก</h1>
      <h2 className="subtitle" style={{ marginTop: '20px' }}>
        ยินดีต้อนรับ คุณ <strong>{user && user.fname}</strong> <strong>{user && user.lname}</strong>
      </h2>

      <div>
        <img src={img1} alt="Welcome" style={{ width: '99%', height: '300px' }} />
      </div>

      {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div style={{ flex: '1', margin: '10px', padding: '20px', backgroundColor: '#00396b', textAlign: 'center', color: "#ffffff" }}>
          <h3>Dashboard 1</h3>
          <p>รายละเอียดของ Dashboard 1</p>
        </div>
        <div style={{ flex: '1', margin: '10px', padding: '20px', backgroundColor: '#00396b', textAlign: 'center', color: "#ffffff" }}>
          <h3>Dashboard 2</h3>
          <p>รายละเอียดของ Dashboard 2</p>
        </div>
        <div style={{ flex: '1', margin: '10px', padding: '20px', backgroundColor: '#00396b', textAlign: 'center', color: "#ffffff" }}>
          <h3>Dashboard 3</h3>
          <p>รายละเอียดของ Dashboard 3</p>
        </div>
        <div style={{ flex: '1', margin: '10px', padding: '20px', backgroundColor: '#00396b', textAlign: 'center', color: "#ffffff" }}>
          <h3>Dashboard 4</h3>
          <p>รายละเอียดของ Dashboard 4</p>
        </div>
      </div> */}

    </div>
  );
};

export default Welcome;