import React , {useEffect ,useState} from "react";
import { Redirect } from "react-router-dom";
import LOGO from "../../assets/logoapp.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const login = false;

export default function Header() {

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
      link_img: data.link_img,
      name: data.name ,
      profile_id: data.profile_id ,
      tel: data.tel,
      username: data.username,
    };
    localStorage.setItem("userData", JSON.stringify(user));
    getDataToLocal();
  }
  function delDataToLocal() {
    localStorage.removeItem("userData");
    getDataToLocal();
  }


  return (
    <>
      <div className="Header px-4" style={{ background:
                "linear-gradient(90deg, rgba(246,63,46,1) 0%, rgba(254,99,51,1) 35%, rgba(251,86,49,1) 100%)", }}>
        <div
          className="row justify-content-end align-content-center"
          style={{ height: "15vh" }}
        >
          <div className="col-5 col-sm-8  ">
            <img src={LOGO} alt="" style={{ height: "6rem" }} />
          </div>
          <div className="col  d-flex align-items-center justify-content-center ">
            {(isLogin) ? (
              <>
                <div class="d-flex justify-content-end ">
                  <Link to={`/profileSaller/${isLogin.profile_id}`} className="btn btn-outline-light"  >
                      {isLogin.name}
                    </Link>
                    <Link to={`/sale/${isLogin.profile_id}`} className="btn btn-outline-light ms-3"  >
                      ลงขาย
                    </Link>
                    <div className="btn btn-outline-light ms-3" onClick={()=>{
                      delDataToLocal();
                    }}>ออกจากระบบ</div>
                </div>
              </>
            ) : (
              <>
             {/*    <div class="b-flex card-body justify-content-end">
                  <Link to='/login' class="card-link">
                   Login
                  </Link>
                  <Link to='/register' class="card-link">
                    register
                  </Link>
                </div> */}
                <div class="d-flex justify-content-end">
                    <Link to='/login/hello'  className="d-flex btn btn-outline-light"  >
                      เข้าสู่ระบบ
                    </Link>
                    <Link to='/login' className="btn btn-outline-light ms-3"  >
                      ลงขาย
                    </Link>
                    <Link to='/register' className="d-flex btn btn-outline-light ms-3" >สมัคร</Link>
                  </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
