import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormEditUser = () => {
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setfName(response.data.fname);
        setlName(response.data.lname);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <br />
      <h1 className="title">ตั้งค่าผู้ใช้</h1>

      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateUser}>
              <p className="has-text-centered"><strong style={{ color: 'red' }}>{msg}</strong></p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div className="field" style={{ flex: 1 }}>
                  <label className="label">ชื่อจริง</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={fname}
                      onChange={(e) => setfName(e.target.value)}
                      placeholder="Name"
                    />
                  </div>
                </div>


                <div className="field" style={{ flex: 1 }}>
                  <label className="label">นามสกุล</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={lname}
                      onChange={(e) => setlName(e.target.value)}
                      placeholder="Name"
                    />
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <div className="field" style={{ flex: 1 }}>
                  <label className="label">รหัสผ่าน</label>
                  <div className="control has-icons-right">
                    <input className="input"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="**********"
                      required
                    />
                    <button onClick={toggleShowPassword} type="button" style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      border: 'none',
                      background: 'none'
                    }}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="field" style={{ flex: 1 }}>
                  <label className="label">ยืนยันรหัสผ่าน</label>
                  <div className="control has-icons-right">
                    <input className="input"
                      type={showPassword ? "text" : "password"}
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                      placeholder="**********"
                      required
                    />
                    <button onClick={toggleShowPassword} type="button" style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      border: 'none',
                      background: 'none'
                    }}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
              <br />
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    ยืนยันการแก้ไข
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditUser;
