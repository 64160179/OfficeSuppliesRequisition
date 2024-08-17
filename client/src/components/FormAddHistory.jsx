import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

const FormAddHistory = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div>
            <br />
            <h1 className="title">เพิ่มการเบิกวัสดุ</h1>
            <h2 className="subtitle"><strong>โดยคุณ {user && user.name}</strong></h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form>
                            <div className="field">
                                <label className="label">เบิกเพื่อใช้ในงาน</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="โปรดระบุหมายเหตุ" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form>
                            <Link to="/addrequest" className="button is-primary mb-2">
                                + เพิ่มรายการ
                            </Link>
                            <table className='table is-striped is-fullwidth'>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>รายการ</th>
                                        <th>หน่วยนับ</th>
                                        <th>จำนวน</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormAddHistory