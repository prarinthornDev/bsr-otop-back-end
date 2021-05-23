import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import LOGOOTOP from ".././assets/logootop.png";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [checkUsername, setCheckUsername] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);

  const [resUsername, setResUsername] = useState("");
  const [resPassword, setResPassword] = useState("");

  const [gotoRegister , setGotoRegister] = useState(false);

  const [isLogin, setIsLogin] = useState();
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
      gender : data.gender,
      old : data.old
    };
    localStorage.setItem("userData", JSON.stringify(user));
    getDataToLocal();
  }
  function delDataToLocal() {
    localStorage.removeItem("userData");
    getDataToLocal();
  }

  function submit() {
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
          setCheckUsername(true);
        } else if (res.data === "รหัสผ่านผิด") {
          setResPassword("รหัสผ่านผิด");
          setCheckPassword(true);
        } else {
          //setIsLogin(true);
          addDataToLocal(res.data);
          //console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function clear() {
    setUsername("");
    setPassword("");
    setCheckUsername(false);
    setCheckPassword(false);
  }
  function register(){
    setGotoRegister(true);
  }
  if(gotoRegister) {
    return <Redirect to="/register" />;
  }

  if (isLogin) {
    return <Redirect to="/" />;
  }
  console.log(props);
  return (
    <>
      {/* {props.match.params.isLogin} */}
      <div  className="container-fluid">
        <div className="row">
          <div className="col " style={{ height: "20vh" }}></div>
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
            className="col d-flex align-items-center justify-content-center  "
            style={{ height: "60vh" }}
          >
            <img src={LOGOOTOP} alt="" style={{ height: "350px" }} />
          </div>
          <div className="col  d-flex justify-content-center">
            <form className="mt-5 pb-5" style={{width:'70%'}}>
              <h1 style={{color:'white'}}>เข้าสู่ระบบ</h1>
              <div className="mb-3 mt-4">
                <label style={{color:'white'}}  for="exampleInputEmail1" class="form-label">
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
                    <div className="alert alert-light mt-2" role="alert">
                      {resUsername}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="mb-3">
                <label  style={{color:'white'}} for="exampleInputPassword1" className="form-label">
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
                  <div className="alert alert-light mt-2" role="alert">
                    {resPassword}
                  </div>
                </>
              ) : (
                <></>
              )}

              <button
                type="submit"
                className="btn btn-outline-light mb-5"
                onClick={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                เข้าสู่ระบบ
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
              <button
                type="submit"
                className="btn btn-outline-light mb-5 mx-2"
                onClick={(e) => {
                  e.preventDefault();
                  register();
                }}
              >
                สมัครสมาชิก
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col " style={{ height: "5vh" }}></div>
          <div className="col "></div>
          <div className="col "></div>
        </div>
      </div>
    </>
  );
}
/* <h1>The Best <br/><span style={{color:'RED'}}>OTOP Seleted!</span></h1> */
/*          <form>
              <h1>เข้าสู่ระบบ</h1>
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
                className="btn btn-primary mb-5"
                onClick={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                เข้าสู่ระบบ
              </button>
              <button
                type="submit"
                className="btn btn-secondary mb-5 mx-2"
                onClick={(e) => {
                  e.preventDefault();
                  clear();
                }}
              >
                รีเซ็ต
              </button>
            </form> */
