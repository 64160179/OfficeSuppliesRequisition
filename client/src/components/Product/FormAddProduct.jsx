import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    // const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleCancel = () => {
        // รีเซ็ตสถานะของฟอร์ม
        setLocations('');
        // ย้อนกลับไปหน้า /users
        navigate('/products');
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/locations');
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);

    return (
        <div>
            <br />
            <h1 className="title">เพิ่มวัสดุหรืออุปกรณ์ชิ้นใหม่</h1>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form >
                            {/* <p className="has-text-centered" style={{ color: 'red' }}>{msg}</p> */}
                            <div className="field">
                                <label className="label">ชื่อวัสดุหรืออุปกรณ์</label>
                                <div className="control">
                                    <input className="input"
                                        type="text"
                                        placeholder="กรุณากรอกชื่อวัสดุหรืออุปกรณ์"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">จำนวน</label>
                                <div className="control">
                                    <input className="input"
                                        type="text"
                                        placeholder="กรุณากรอกจำนวน"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">หน่วยนับ</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select

                                        >
                                            <option value="">- เลือกหน่วยนับ -</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">สถานที่จัดเก็บ</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            value={selectedLocation}
                                            onChange={(e) => setSelectedLocation(e.target.value)}
                                            required
                                        >
                                            <option value="">เลือกสถานที่</option>
                                            {locations.map((location) => (
                                                <option key={location.id} value={location.name}>
                                                    {location.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <br />

                            <div className="field is-grouped">
                                <div className="control">
                                    <button type="submit" className="button is-success" style={{ width: "120px" }}>
                                        บันทึกข้อมูล
                                    </button>
                                </div>
                                <div className="control">
                                    <button type="button" onClick={handleCancel} className="button is-danger" style={{ width: "120px" }}>
                                        ยกเลิก
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

export default FormAddProduct