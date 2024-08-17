import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";  

const FormEditProduct = () => {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getproduct/${id}`);
        setName(response.data.name);
        setUnit(response.data.unit);
        setCategory(response.data.category);
        setLocation(response.data.location);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);


  return (
    <div>
    <br />
    <h1 className="title">แก้ไขข้อมูลวัสดุ-อุปกรณ์</h1>

    <div className="card is-shadowless">
        <div className="card-content">
            <div className="content">
                <form>
                    <p className="has-text-centered"><strong style={{ color: 'red' }}>{msg}</strong></p>
                    <div className="field">
                        <label className="label">ชื่อวัสดุ-อุปกรณ์</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="แก้ไขชื่อ - นามสกุล"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">หน่วยนับ</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                placeholder="Email"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">หมวดหมู่</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                placeholder="Email"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">สถานที่จัดเก็บ</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                placeholder="Email"
                            />
                        </div>
                    </div>

                  

                  
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-success">
                                Update
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

export default FormEditProduct