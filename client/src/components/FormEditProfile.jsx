import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/authSlice";

import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormEditProfile = () => {
    const [fname, setfName] = useState("");
    const [lname, setlName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const getMeById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getme/${id}`);
                setfName(response.data.fname);
                setlName(response.data.lname);
                setEmail(response.data.email);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getMeById();
    }, [id]);

    const editUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/editprofile/${id}`, {
                fname: fname,
                lname: lname,
                email: email,
                password: password,
                confPassword: confPassword,
            });
            dispatch(updateUser({ fname, lname, email }));
            navigate("/home");
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
            <h1 className="title">ตั้งค่าบัญชีผู้ใช้</h1>

            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={editUser}>
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
                                <label className="label">Email (มหาวิทยาลัย)</label>
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
    )
}

export default FormEditProfile