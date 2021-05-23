import axios from "axios";
import React, { useState, useEffect } from "react";
import LOADING from "../assets/loadingsssss.gif";

export default function ProdoctDetail(props) {
  const [data, setData] = useState();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    console.log(props.match.params.id);
    axios
      .post("http://localhost:5001/getProductByID", {
        id: props.match.params.id,
      })
      .then((res) => {
        setData(res.data[0]);

        setLoad(true);
      })
      .catch((err) => []);
  }, []);

  /* setTimeout(() => {
    console.log(props.match.params.id);
    axios
      .post("http://localhost:5001/getProductByID", {
        id: props.match.params.id,
      })
      .then((res) => {
        setData(res.data);
        console.log(data);
        setLoad(true);
      })
      .catch((err) => []);
  }, 2000);   */
  console.log(data);
  if (load) {
    return (
      <>
        <div className="container-fluid">
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
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={`http://localhost:5001/img/${data.img1}`}
                      className="d-block"
                      style={{ height: "390px" }}
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={`http://localhost:5001/img/${data.img2}`}
                      className="d-block"
                      style={{ height: "390px" }}
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={`http://localhost:5001/img/${data.img3}`}
                      className="d-block"
                      style={{ height: "390px" }}
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={`http://localhost:5001/img/${data.img4}`}
                      className="d-block"
                      style={{ height: "390px" }}
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="col  d-flex justify-content-center">
              <form className="mt-5 pb-5" style={{ width: "70%" }}>
                <h1 style={{ color: "white" }}> ข้อมูลสินค้า</h1>

                <div className="mb-2 mt-2">
                  <label
                    style={{ color: "white" }}
                    for="exampleInputEmail1"
                    class="form-label"
                  >
                    ชื่อสินค้า
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.title}
                    disabled
                  />
                </div>
                <div className="mb-2 mt-2">
                  <label
                    style={{ color: "white" }}
                    for="exampleInputEmail1"
                    class="form-label"
                  >
                    รายละเอียดสินค้า
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.detail}
                    disabled
                  />
                </div>
                <div className="mb-2 mt-2">
                  <label
                    style={{ color: "white" }}
                    for="exampleInputEmail1"
                    class="form-label"
                  >
                    ราคาสินค้า
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.price}
                    disabled
                  />
                </div>

                <div className="mb-2 mt-2">
                  <button
                    className="btn btn-outline-light mt-3"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    style={{ width: "100%" }}
                  onClick={(e)=>{
                    e.preventDefault()
                  }}
                  >
                    ข้อมูลผู้ขาย
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col " style={{ height: "5vh" }}></div>
            <div className="col "></div>
            <div className="col "></div>
          </div>
        </div>

       {/*  <!-- Modal --> */}
<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">ข้อมูลผู้ลงขาย</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>ชื่อ - นามสกุล : {data.name}</p>
        <p>ที่อยู่ : {data.address}</p>
        <p>เบอร์โทร : {data.tel}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">ปิด</button>
        
      </div>
    </div>
  </div>
</div>


      </>
    );
  } else {
    return (
      <>
        <div className="row b-flex justify-content-center">
          <div className="col d-flex align-items-center justify-content-center">
            <img src={LOADING} alt="" />
          </div>
        </div>
      </>
    );
  }

  /* return (
    <>
   
       <form>
        <h1>File Upload</h1>
        <input
          type="file"
          name="myImage"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <button type="submit" onClick={(e)=>{
               
        }}>Upload</button>
      </form>
     
      <img src={`http://localhost:5001/img/${imgPath}`} style={{width:'200px'}} alt=".."/> 
    </>
  ); */
}
