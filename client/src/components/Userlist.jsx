import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Userlist = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
    };

    const deleteUser = async (userId, userName) => {
        const confirmDelete = window.confirm(`คุณยืนยันที่จะลบ ${userName} หรือไม่ ?`);
        if (confirmDelete) {
            await axios.delete(`http://localhost:5000/users/${userId}`);
            getUsers();
        }
    };

    return (
        <div>
            <br />
            <h1 className="title">รายชื่อผู้ใช้</h1>
            <Link to="/users/add" className="button is-link mb-2">
                + เพิ่มผู้ใช้ใหม่
            </Link>
            <table className='table is-striped' style={{ width: '99%' }}>
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th>ชื่อจริง</th>
                        <th>นามสกุล</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th className="has-text-centered">อื่น ๆ</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.uuid}>
                            <td>{user.id}</td>
                            <td>{user.fname}</td>
                            <td>{user.lname}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td className="has-text-centered">
                                <Link
                                    to={`/users/edit/${user.uuid}`}
                                    className="button is-small is-warning"
                                    style={{ width: '80px', }}
                                >
                                    <strong>แก้ไข</strong>
                                </Link>
                                <button
                                    onClick={() => deleteUser(user.uuid, user.name)}
                                    className="button is-small is-danger"
                                    style={{ width: '80px', marginLeft: '10px' }}
                                >
                                    <strong>ลบ</strong>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Userlist