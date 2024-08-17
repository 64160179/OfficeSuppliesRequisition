import React from 'react'
import { Link } from 'react-router-dom'

const HistoryList = () => {
  return (
    <div>
    <br />   
    <h1 className="title">ประวัติการขอเบิก (ยังไม่ได้ทำอะไรเลย)</h1>
    <Link to="/historys/add" className="button is-link mb-2">
       + เพิ่มการเบิกวัสดุ
    </Link>
    <table className='table is-striped is-fullwidth' style={{ width: '99%' }}>
        <thead>
            <tr>
                <th>No</th>
                <th>เลขที่ใบเบิก</th>
                <th>หัวเรื่อง</th>
                <th>เมื่อวันที่</th>
                <th>สถานะ</th>
                <th>ใบเบิกวัสดุ</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
    </div>
  )
}

export default HistoryList