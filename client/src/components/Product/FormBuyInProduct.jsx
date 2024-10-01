import React, { useState, useEffect } from 'react';
import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
import Select from 'react-select'; // นำเข้า react-select

const FormBuyInProduct = () => {

    return (
        <div>
            <form>
                <br />
                <h1 className="title">ซื้อวัสดุเข้าคลัง</h1>
                <div className='card is-shadowless'>
                    <div className='card-content'>
                        <div className='content'>
                            <p className="has-text-centered" style={{ color: 'red' }}>asdf</p>
                            <div className='field'></div>
                            <label className='label'>ชื่อรายการสั่งซื้อ</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"

                                    placeholder="กรุณากรอกชื่อ รายการสั่งซื้อ"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card is-shadowless" style={{ width: '99%' }}>
                    <div className="card-content">
                        <div className="content">
                            <p className="has-text-centered" style={{ color: 'red' }}>asdf</p>
                            <div div style={{ display: 'flex', gap: '10px' }}>
                                <div className="field" style={{ flex: 1 }}>
                                    <label className="label">ชื่อสินค้า</label>
                                    <div className="control">
                                        <Select

                                            placeholder="กรุณาเลือกชื่อสินค้า"
                                        />
                                    </div>
                                </div>

                                <div className="field" style={{ flex: 1 }}>
                                    <label className="label">จำนวน</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="number"
                                            placeholder="กรุณากรอกจำนวน"
                                            min="1"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="field" style={{ flex: 1 }}>
                                    <label className="label">หน่วยนับ</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                           
                                            readOnly
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div >

                {/* ปุ่มกด */}
                <div div className="field is-grouped" >
                    <div className="control">
                        <button type="submit" className="button is-success" style={{ width: "120px" }}>
                            บันทึกข้อมูล
                        </button>
                    </div>
                    <div className="control">
                        <button type="button" className="button is-danger" style={{ width: "120px" }}>
                            ยกเลิก
                        </button>
                    </div>
                </div >
            </form>
        </div >
    )
}

export default FormBuyInProduct