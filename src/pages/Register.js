import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [checkUsername, setCheckUsername] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);

  const [checkUpload , setCheckUpload] = useState();
  const [uploadImage , setUploadImage] = useState();

  const [resUsername, setResUsername] = useState("");
  const [resPassword, setResPassword] = useState("");

  const [isCheck, setIsCheck] = useState(false);

  const [file, setFile] = useState();

  const [imgPath, setImgPath] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState();
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [old, setOld] = useState();

  const [isLogin, setIsLogin] = useState();

  function clear() {
    setUsername("");
    setPassword("");
    setCheckUsername(false);
    setCheckPassword(false);
  }
  function submit() {
    setCheckUsername(false);
    setCheckPassword(false);
    if (username.trim() === "") {
      setCheckUsername(true);
      setResUsername("กรุณากรอกชื่อผู้ใช้");
    } else {
      setCheckUsername(false);
      setCheckPassword(false);
      axios
        .post("http://localhost:5001/SignInWithUsernameAndPassword", {
          username: username.trim(),
          password: password.trim(),
        })
        .then((res) => {
          console.log(res.data);

          if (res.data === "ไม่พบชื่อผู้ใช้") {
            setResUsername("ไม่พบชื่อผู้ใช้");
            setCheckUsername(false);
            setIsCheck(true);
          } else if (res.data === "รหัสผ่านผิด") {
            setResUsername("มีชื่อผู้ใช้นี้แล้วในระบบ");
            setCheckUsername(true);
            setIsCheck(false);
            /* setResPassword("รหัสผ่านผิด");
            setCheckPassword(true); */
          } else {
            setResUsername("มีชื่อผู้ใช้นี้แล้วในระบบ");
            setCheckUsername(true);
            setIsCheck(false);
            //setIsLogin(true);
            //addDataToLocal(res.data);
            //console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function submitProfile() {
    console.log(username.trim());
    console.log(`${imgPath}`);
    console.log(name.trim());
    console.log(old);
    console.log(gender);
    console.log(tel.trim());
    console.log(address.trim());
    axios
      .post("http://localhost:5001/createUserWithUserNameAndPassWord", {
        username: username.trim(),
        password: password.trim(),
      })
      .then((res) => {
        axios
          .post("http://localhost:5001/setProfile", {
            username: username.trim(),

            img: `${imgPath}`,
            name: name.trim(),
            old: old,
            gender: gender,
            tel: tel.trim(),
            address: address.trim(),
          })
          .then((res) => {
            setIsLogin(true);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onFormSubmit(e) {
    e.preventDefault();

    setCheckUpload(false);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("myImage", file);

     axios
      .post("http://localhost:5001/uploadImg", formData, config)
      .then((response) => {
        //console.log(response.data);
        let data = response.data;
        console.log(data);

        setImgPath(data);
        setCheckUpload(true);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  useEffect(() => {
    getDataToLocal();
  }, []);
  function getDataToLocal() {
    setIsLogin(JSON.parse(localStorage.getItem("userData")));
  }
  function addDataToLocal(data) {
    let user = {
      address: data.address,
      img: data.img,
      name: data.name,
      profile_id: data.profile_id,
      tel: data.tel,
      username: data.username,
      gender: data.gender,
      old: data.old,
    };
    localStorage.setItem("userData", JSON.stringify(user));
    getDataToLocal();
  }
  function delDataToLocal() {
    localStorage.removeItem("userData");
    getDataToLocal();
  }

  if (isLogin) {
    return <Redirect to="/login" />;
  }

  const style_btn = { backgroundColor: "#fc4c2e" };

  console.log(imgPath)

  return (
    <div  className="container-fluid" >
      <div>
        <div className="row">
          <div className="col " style={{ height: "5vh" }}></div>
          <div className="col "></div>
          <div className="col "></div>
        </div>
        <div
          className="row"
          style={{
            background:
              "linear-gradient(90deg, rgba(246,63,46,1) 0%, rgba(254,99,51,1) 35%, rgba(251,86,49,1) 100%)",
          }}
        >
          <div
            className="col d-flex align-items-center justify-content-center "
            
          >
            <form style={{ width: "70%" }}>
              <h1>ลงทะเบียน</h1>
              <div className="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  ชื่อผู้ใช้
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                {checkUsername ? (
                  <>
                    <div className="alert alert-danger mt-2" role="alert">
                      {resUsername}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              {checkPassword ? (
                <>
                  <div className="alert alert-danger mt-2" role="alert">
                    {resPassword}
                  </div>
                </>
              ) : (
                <></>
              )}

              <button
                type="submit"
                className="btn btn-outline-light mb-5  border border-white"
                onClick={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                ตรวจสอบ
              </button>
              <button
                type="submit"
                className="btn btn-outline-light mb-5 mx-2"
                onClick={(e) => {
                  e.preventDefault();
                  clear();
                }}
              >
                รีเซ็ต
              </button>
            </form>
          </div>

          <div className="col pb-5 pt-5 d-flex align-items-center justify-content-center">
            {isCheck ? (
              <div className="" style={{ width: "70%" }}>
                <div className="mb-3">
                  <h4  >เพิ่มรูปโปรไฟล์</h4>
                  <input
                    className="btn btn-outline-light"
                    type="file"
                    name="myImage"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />

                  <button
                    className="btn btn-outline-light ms-3"
                    type="submit"
                    onClick={(e) => {
                      onFormSubmit(e);
                    }}
                  >
                    upload
                  </button>
                  {checkUpload ? (
                  <>
                    <div className="alert alert-success mt-2" role="alert" style={{height:'35px' , paddingTop:'5px'}}>
                      {imgPath} อัปโหลดรูปภาพเเล้ว
                    </div>
                  </>
                ) : (
                  <></>
                )}

                 

                  <label class="form-label mt-2"  >
                    ชื่อ-นามสกุล
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label class="form-label"  >
                    อายุ
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={old}
                    onChange={(e) => {
                      setOld(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label class="form-label"  >
                    เพศ <>{gender}</>
                  </label>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value="ชาย"
                      onClick={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    <label
                      class="form-check-label"
                      for="flexRadioDefault1"
                       
                    >
                      ชาย
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      value="หญิง"
                      onClick={(e) => {
                        setGender(e.target.value);
                      }}
                      
                    />
                    <label
                      class="form-check-label"
                      for="flexRadioDefault2"
                       
                    >
                      หญิง
                    </label>
                  </div>
                </div>

                <div className="mb-2">
                  <label class="form-label"  >
                    เบอร์โทร
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={tel}
                    onChange={(e) => {
                      setTel(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label class="form-label"  >
                    ที่อยู่
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>

                <div
                  className="btn btn-outline-light  border border-white px-5 py-3"
                  aria-disabled="true"
                  onClick={() => {
                    submitProfile();
                  }}
                >
                  เพิ่มข้อมูล
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col " style={{ height: "10vh" }}></div>
          <div className="col "></div>
          <div className="col "></div>
        </div>
      </div>
    </div>
  );
}

/* 
 <div className="container mt-5 border border-white">
        <div className="row justify-content-center">
          <div className="col-sm-8 mb-5">
 
            {isCheck ? (
              <>
                <div className="mb-3">
                  <h1>File Upload</h1>
                  <input
                    type="file"
                    name="myImage"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                  <button
                    type="submit"
                    onClick={(e) => {
                      onFormSubmit(e);
                    }}
                  >
                    Upload
                  </button>

                  <img
                    src={`http://localhost:5001/img/${imgPath}`}
                    style={{ width: "200px" }}
                    alt=".."
                  />
                  <label class="form-label">ชื่อ-นามสกุล</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label class="form-label">เบอร์โทร</label>
                  <input
                    type="text"
                    className="form-control"
                    value={tel}
                    onChange={(e) => {
                      setTel(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label class="form-label">ที่อยู่</label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label class="form-label">ลิงค์รูปภาพ</label>
                  <input
                    type="text"
                    className="form-control"
                    value={linkImage}
                    onChange={(e) => {
                      setLinkImage(e.target.value);
                    }}
                  />
                </div>
                <div
                  className="btn btn-primary  border border-white"
                  onClick={() => {
                    submitProfile();
                  }}
                  style={style_btn}
                >
                  {" "}
                  เพิ่มข้อมูล
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div> */

/* 
  const username = req.body.username;

  const name = req.body.name;
  const tel = req.body.tel;
  const address = req.body.address;
  const link_img = req.body.link_img;


localStorage.setItem(key, value) คือ การเก็บข้อมูลลงใน Local Storage
localStorage.getItem(key) คือ การเรียกใช้ข้อมูล key ของ Local Storage
localStorage.removeItem(key) คือ การลบข้อมูลที่ key เก็บไว้
localStorage.clear() คือ การลบข้อมูลทั้งหมดในโดเมน 
*/
