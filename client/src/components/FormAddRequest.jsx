import React from 'react'

const FormRequest = () => {
    return (
        <div>
            <br />
            <h1 className="title">เพิ่มรายการเบิก</h1>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form>
                            <div className="field">
                                <label className="label">หมวดหมู่</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select>
                                            <option >อุปกรณ์เครื่องเขียน</option>
                                            <option >กระดาษ</option>
                                            <option >ของมีคม</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">เลือกข้างบนมาขึ้นอันนี้</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="มีให้เลือกของย่อยในหมวดหมู่" />
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormRequest