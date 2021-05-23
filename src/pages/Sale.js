import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function Sale(props) {
  const [isLogin, setIsLogin] = useState();

  const [title, settitle] = useState("");
  const [detail, setdetail] = useState("");
  const [price, setprice] = useState();
  const [type, settype] = useState();
  const [id, setId] = useState();

  //path
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [img4, setImg4] = useState();

  //File temp to upload
  const [imgF1, setImgF1] = useState();
  const [imgF2, setImgF2] = useState();
  const [imgF3, setImgF3] = useState();
  const [imgF4, setImgF4] = useState();

  //check response after upload
  const [checkUploadimgF1, setcheckUploadimgF1] = useState(false);
  const [checkUploadimgF2, setcheckUploadimgF2] = useState(false);
  const [checkUploadimgF3, setcheckUploadimgF3] = useState(false);
  const [checkUploadimgF4, setcheckUploadimgF4] = useState(false);

  const [product, setProduct] = useState([]);

  /*   useEffect(() => {
    getDataToLocal();
  }, []);
  function getDataToLocal() {
    console.log(JSON.parse(localStorage.getItem("userData")));
  } */
  /*  setTimeout(() => {
        
      }, 2000); */

  useEffect(() => {
    getDataProduct();
  }, []);

  function getDataProduct() {
    let id = props.match.params.id;
    console.log(props.match.params.id);
    axios
      .post("http://localhost:5001/getProductByIdProfile", {
        id_profile: id,
      })
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {});
  }

  function onFormSubmit(e, imgF, setImg, setcheckUploadimgF) {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("myImage", imgF);
    axios
      .post("http://localhost:5001/uploadImg", formData, config)
      .then((response) => {
        //console.log(response.data);
        let data = response.data;
        console.log(data);
        setImg(data);
        setcheckUploadimgF(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [isEdit, setIsEdit] = useState(false);
  const [isDelete , setIsDelete] = useState(false);
  function edit(item) {
    console.log("------------");
    console.log(item);
    setIsEdit(true);
    setIsDelete(true);

    settitle(item.title);
    setdetail(item.detail);
    setprice(item.price);
    settype(item.type);
    setId(item.id);

    setImg1(item.img1);
    setImg2(item.img2);
    setImg3(item.img3);
    setImg4(item.img4);

    setImgF1();
    setImgF2();
    setImgF3();
    setImgF4();

    if (img1 === "undefined") {
      setcheckUploadimgF1(false);
    } else {
      setcheckUploadimgF1(true);
    }
    if (img2 === "undefined") {
      setcheckUploadimgF2(false);
    } else {
      setcheckUploadimgF2(true);
    }
    if (img3 === "undefined") {
      setcheckUploadimgF3(false);
    } else {
      setcheckUploadimgF3(true);
    }
    if (img4 === "undefined") {
      setcheckUploadimgF4(false);
    } else {
      setcheckUploadimgF4(true);
    }
  }

  function addProduct() {
    axios
      .post("http://localhost:5001/createProduct", {
        img1: img1,
        img2: img2,
        img3: img3,
        img4: img4,
        title: title.trim(),
        detail: detail.trim(),
        price: price,
        type: type,
        id_profile: props.match.params.id,
      })
      .then((res) => {
        reset();
        getDataProduct();
        console.log("สำเร็จ");
      })
      .catch((err) => {});
  }
  function editProduct() {
    axios
      .post("http://localhost:5001/setProduct", {
        id: id,
        img1: img1,
        img2: img2,
        img3: img3,
        img4: img4,
        title: title.trim(),
        detail: detail.trim(),
        price: price,
        type: type,
        id_profile: props.match.params.id,

        /*     

        const id = req.body.id;
        const img1 = req.body.img1;
        const img2 = req.body.img2;
        const img3 = req.body.img3;
        const img4 = req.body.img4;
        const title = req.body.title;
        const detail = req.body.detail;
        const price = req.body.price;
        const type = req.body.type; 

        */

      })
      .then((res) => {
        reset();
        getDataProduct();
        console.log("สำเร็จ");
        setIsEdit(false);
      })
      .catch((err) => {});
  }

  function delProduct() {


    axios.post('http://localhost:5001/deleteByID' , {
        id : id
    }).then((res)=>{
        reset();
        getDataProduct()
    }).catch((err)=>{

    })


  }
  function reset() {
    settitle("");
    setdetail("");
    setprice(0);
    settype(0);

    setImg1();
    setImg2();
    setImg3();
    setImg4();

    setImgF1();
    setImgF2();
    setImgF3();
    setImgF4();

    setcheckUploadimgF1(false);
    setcheckUploadimgF2(false);
    setcheckUploadimgF3(false);
    setcheckUploadimgF4(false);
    getDataProduct();
  }
  function whatTpye(t) {
    if (t === 1) {
      return "เสื้อผ้า";
    }
    if (t === 2) {
      return "กิ๊ปชอป";
    }
    if (t === 3) {
      return "อาหารเครื่องปรุง";
    }
    if (t === 4) {
      return "สมนไพร";
    }
    if (t === 5) {
      return "สินค้าพิเศษ";
    }
  }

  /*  {props.match.params.id} */

  if (localStorage.getItem("userData")) {
    return (
      <div
        className="container-fluid"
        style={{
          background:
            "linear-gradient(90deg, rgba(246,63,46,1) 0%, rgba(254,99,51,1) 35%, rgba(251,86,49,1) 100%)",
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* height:'10vh' , borderRadius : '2rem' , backgroundColor : 'white' */}

        <div className="row d-flex align-content-center flex-wrap justify-content-center">
          <div
            className="col-5 mt-5 d-flex align-items-start justify-content-center me-5 "
            style={{
              height: "80%",
              borderRadius: "1rem",
              backgroundColor: "white",
            }}
          >
            {/* `product`(`id`, `img1`, `img2`, `img3`, `img4`, `title`, `detail`, `price`, `type`, `id_profile`, `date_update`) */}
            <div className="row">
              <div className="col d-flex align-items-start justify-content-center ">
                <h3 className="mt-3">
                  {isEdit ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}
                </h3>
              </div>

              <div className="col d-flex align-items-end justify-content-center ">
                {isEdit ? (
                  <>
                    <div
                      className="btn btn-outline-success me-3"
                      style={{ width: "80px" }}
                      onClick={() => {
                        reset();
                        setIsEdit(false);
                      }}
                    >
                      เพิ่ม
                    </div>
                    <div
                      className="btn btn-warning me-3"
                      style={{ width: "80px" }}
                      onClick={() => {
                        editProduct();
                      }}
                    >
                      แก้ไข
                    </div>

                    {isDelete ? (
                      <>
                        <div
                          className="btn btn-outline-danger"
                          style={{ width: "80px" }}
                          onClick={() => {
                            delProduct();
                          }}
                        >
                          ลบ
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    <div
                      className="btn btn-outline-success me-3"
                      style={{ width: "80px" }}
                      onClick={() => {
                        addProduct();
                      }}
                    >
                      เพิ่ม
                    </div>
                    <div
                      className="btn btn-outline-danger"
                      style={{ width: "80px" }}
                      onClick={() => {
                        reset();
                      }}
                    >
                      รีเซ็ต
                    </div>
                  </>
                )}
              </div>

              <div className="mb-2 mt-2">
                <label class="form-label">ชื่อสินค้า</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => {
                    settitle(e.target.value);
                  }}
                />
              </div>

              <div className="mb-2 mt-2">
                <label class="form-label">รายละเอียดสินค้า</label>
                <input
                  type="text"
                  className="form-control fst-italic"
                  value={detail}
                  style={{ height: "70px" }}
                  onChange={(e) => {
                    setdetail(e.target.value);
                  }}
                />
              </div>
              <div className="row">
                <div className="col">
                  {" "}
                  <div className="mb-2 mt-2">
                    <label class="form-label">ราคาสินค้า</label>
                    <span class="input-group-text">
                      ฿
                      <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => {
                          setprice(e.target.value);
                        }}
                      />
                    </span>
                  </div>
                </div>
                <div className="col pt-3">
                  <label class="form-label">ประเภทสินค้า</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={type}
                    onChange={(e) => {
                      settype(e.target.value);
                    }}
                  >
                    <option selected>------เลือก-------</option>
                    <option value="1">เสื้อผ้า</option>
                    <option value="2">กิ๊ฟชอป</option>
                    <option value="3">อาหาร/เครื่องปรุง</option>
                    <option value="4">สมุนไพร</option>
                    <option value="5">สินค้าพิเศษ</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label for="formFile" class="form-label">
                  เพิ่มรูปสินค้าที่ 1
                  {/* <span style={{color:'red'}}>....{img1}</span> */}
                </label>

                <input
                  className="btn btn-light"
                  type="file"
                  name="myImage"
                  onChange={(e) => {
                    setImgF1(e.target.files[0]);
                    setcheckUploadimgF1(false);
                  }}
                />
                <button
                  className={
                    checkUploadimgF1
                      ? "btn btn-success ms-3"
                      : "btn btn-danger ms-3"
                  }
                  type="submit"
                  onClick={(e) => {
                    onFormSubmit(e, imgF1, setImg1, setcheckUploadimgF1);
                  }}
                >
                  upload
                </button>
                {/*                 {checkUploadimgF1 ? (
                  <>
                    <div
                      className="alert alert-success mt-2"
                      role="alert"
                      style={{ height: "35px", paddingTop: "5px" }}
                    >
                      อัปโหลดรูปภาพเเล้ว..... {img1}
                    </div>
                  </>
                ) : (
                  <></>
                )} */}
              </div>

              <div className="mb-3">
                <label for="formFile" class="form-label">
                  เพิ่มรูปสินค้าที่ 2
                  {/* <span style={{color:'red'}}>....{img1}</span> */}
                </label>

                <input
                  className="btn btn-light border"
                  type="file"
                  name="myImage"
                  onChange={(e) => {
                    setImgF2(e.target.files[0]);
                  }}
                />
                <button
                  className={
                    checkUploadimgF2
                      ? "btn btn-success ms-3"
                      : "btn btn-danger ms-3"
                  }
                  type="submit"
                  onClick={(e) => {
                    onFormSubmit(e, imgF2, setImg2, setcheckUploadimgF2);
                  }}
                >
                  upload
                </button>
                {/*          {checkUploadimgF2 ? (
                  <>
                    <div
                      className="alert alert-success mt-2"
                      role="alert"
                      style={{ height: "35px", paddingTop: "5px" }}
                    >
                      อัปโหลดรูปภาพเเล้ว..... {img2}
                    </div>
                  </>
                ) : (
                  <></>
                )} */}
              </div>

              <div className="mb-3">
                <label for="formFile" class="form-label">
                  เพิ่มรูปสินค้าที่ 3
                  {/* <span style={{color:'red'}}>....{img1}</span> */}
                </label>

                <input
                  className="btn btn-light"
                  type="file"
                  name="myImage"
                  onChange={(e) => {
                    setImgF3(e.target.files[0]);
                  }}
                />
                <button
                  className={
                    checkUploadimgF3
                      ? "btn btn-success ms-3"
                      : "btn btn-danger ms-3"
                  }
                  type="submit"
                  onClick={(e) => {
                    onFormSubmit(e, imgF3, setImg3, setcheckUploadimgF3);
                  }}
                >
                  upload
                </button>
                {/* {checkUploadimgF3 ? (
                  <>
                    <div
                      className="alert alert-success mt-2"
                      role="alert"
                      style={{ height: "35px", paddingTop: "5px" }}
                    >
                      อัปโหลดรูปภาพเเล้ว..... {img3}
                    </div>
                  </>
                ) : (
                  <></>
                )} */}
              </div>

              <div className="mb-3">
                <label for="formFile" class="form-label">
                  เพิ่มรูปสินค้าที่ 4
                  {/* <span style={{color:'red'}}>....{img1}</span> */}
                </label>

                <input
                  className="btn btn-light border"
                  type="file"
                  name="myImage"
                  onChange={(e) => {
                    setImgF4(e.target.files[0]);
                  }}
                />

                <button
                  className={
                    checkUploadimgF4
                      ? "btn btn-success ms-3"
                      : "btn btn-danger ms-3"
                  }
                  type="submit"
                  onClick={(e) => {
                    onFormSubmit(e, imgF4, setImg4, setcheckUploadimgF4);
                  }}
                >
                  upload
                </button>

                {/*             {checkUploadimgF4 ? (
                  <>
                    <div
                      className="alert alert-success mt-2"
                      role="alert"
                      style={{ height: "35px", paddingTop: "5px" }}
                    >
                      อัปโหลดรูปภาพเเล้ว..... {img4}
                    </div>
                  </>
                ) : (
                  <></>
                )} */}
              </div>
            </div>
          </div>
          <div className="col-5 mt-5 align-items-start justify-content-center">
            <div className="row d-flex justify-content-center ">
              <h2 className="mt-3">สินค้าทั้งหมด</h2>
              <p>{JSON.parse(localStorage.getItem("userData")).name}</p>
            </div>
            <div className="row">
              {/*  http://localhost:5001/img/${???} */}

              {product.map((item, index) => {
                return (
                  <>
                    <div className="col-12 col-sm-6 col-md-4 mb-3">
                      <div class="card" style={{ width: "16rem" }}>
                        <img
                          src={`http://localhost:5001/img/${item.img1}`}
                          class="card-img-top"
                          alt="..."
                          style={{ width: "16rem" , height : '16rem' }}
                        />
                        <div class="card-body">
                          <h5 class="card-title">ชื่อสินค้า : {item.title}</h5>
                          <p class="card-text">รายละเอียด : {(item.detail).substring(0, 10)+'...'}</p>
                          <p class="card-text">ราคา : {item.price} บาท</p>
                          <p class="card-text">
                            ประเภท : {whatTpye(item.type)}
                          </p>
                          <div
                            class="btn btn-warning"
                            onClick={() => {
                              edit(item);
                            }}
                          >
                            แก้ไขข้อมูล
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
}
