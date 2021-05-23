import axios from "axios";

import { Chart } from "react-charts";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProfileSaller(props) {
  const [isLogin, setIsLogin] = useState();
  const [data, setData] = useState();
  const [product, setProduct] = useState([]);

  const [editMode, setEditMode] = useState(false);

  const [file, setFile] = useState();

  const [imgPath, setImgPath] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState();
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [old, setOld] = useState();

  const [username, setUsername] = useState();

  useEffect(() => {
    getProfileByID(props.match.params.id);
    getProductByIdProfile(props.match.params.id);
    getUsername(props.match.params.id);
    //getDataToLocal();
  }, []);

  function getUsername(id) {
    axios
      .post("http://localhost:5001/getUsernameByIDprofile", {
        id: id,
      })
      .then((res) => {
        setUsername(res.data[0].username);
      })
      .catch((err) => {});
  }

  function getProfileByID(id) {
    axios
      .post("http://localhost:5001/getProfileById", {
        profile_id: id,
      })
      .then((res) => {
        console.log(res.data[0]);
        setData(res.data[0]);

        setImgPath(res.data[0].img);
        setName(res.data[0].name);
        setTel(res.data[0].tel);
        setAddress(res.data[0].address);
        setGender(res.data[0].gender);
        setOld(res.data[0].old);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getProductByIdProfile(id) {
    axios
      .post("http://localhost:5001/getProductByIdProfile", {
        id_profile: id,
      })
      .then((res) => {
        setProduct(res.data);
        //console.log(res.data);
      })
      .catch((err) => {});
  }

  function editProfile() {
    axios
      .post("http://localhost:5001/setProfile", {
        username: username,
        name: name,
        old: old,
        gender: gender,
        tel: tel,
        address: address,
        img: imgPath,
      })
      .then((res) => {
        editMode(false);
      })
      .catch((err) => {});
    setEditMode(false);
  }

  console.log(data);
  console.log(product);

  if (!data) return <></>;

  return (
    <>
      <div className="container mt-5">
        <div className="row  justify-content-center">
          <h1>Profile</h1>

          <div className="col-6 mt-3 d-flex justify-content-center ">
            <div className="form-group">
              <div class="text-center">
                <img
                  src={`http://localhost:5001/img/${imgPath}`}
                  class="rounded"
                  alt="..."
                  style={{ width: "100%" }}
                />
              </div>
              <div class="input-group mb-3 mt-3">
                <span class="input-group-text" id="basic-addon1">
                  ชื่อผู้ใช้
                </span>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      class="form-control"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      class="form-control"
                      value={name}
                      disabled
                    />
                  </>
                )}
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                  เบอร์โทร
                </span>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      class="form-control"
                      value={tel}
                      onChange={(e) => {
                        setTel(e.target.value);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      class="form-control"
                      value={tel}
                      disabled
                    />
                  </>
                )}
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                  ที่อยู่
                </span>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      class="form-control"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      class="form-control"
                      value={address}
                      disabled
                    />
                  </>
                )}
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                  อายุ
                </span>

                {editMode ? (
                  <>
                    <input
                      type="text"
                      class="form-control"
                      value={old}
                      onChange={(e) => {
                        setOld(e.target.value);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      class="form-control"
                      value={old}
                      disabled
                      readonly
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row " style={{ height: "9rem" }}>
          <div className="col d-flex align-items-start justify-content-center  ">
            {editMode ? (
              <>
                {" "}
                <div
                  className="btn btn-success d-flex align-items-center justify-content-center"
                  style={{ height: "4rem", width: "8rem" }}
                  onClick={(e) => {
                    e.preventDefault();
                    editProfile();
                  }}
                >
                  {" "}
                  ยืนยัน{" "}
                </div>
                <div
                  className="btn btn-danger mx-3 d-flex align-items-center justify-content-center"
                  style={{ height: "4rem", width: "8rem" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setEditMode(false);
                  }}
                >
                  {" "}
                  ยกเลิก{" "}
                </div>
              </>
            ) : (
              <>
                {" "}
                <div
                  className="btn btn-warning d-flex align-items-center justify-content-center"
                  style={{ height: "4rem", width: "8rem" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setEditMode(true);
                  }}
                >
                  {" "}
                  แก้ไขข้อมูล{" "}
                </div>
              </>
            )}
          </div>

          <div className="row">
            <div className="col d-flex align-items-center justify-content-center">
              {" "}
              <div style={{fontSize:'35px' , fontStyle : 'oblique'}}> จำนวนสินค้าทั้งหมดที่ลงในระบบ : <span style={{color : 'red' ,fontSize:'45px' , fontWeight : 'bold'}}>{product.length}</span>  </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
