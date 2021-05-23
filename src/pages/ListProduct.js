import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainLayout from "../component/Mainlayout";

import axios from "axios";

import banner1 from "../assets/. (6).jpg";
import banner2 from "../assets/. (5).jpg";
import banner3 from "../assets/. (4).jpg";
import banner4 from "../assets/. (3).jpg";
import banner5 from "../assets/. (2).jpg";
import banner6 from "../assets/. (1).jpg";

import G1 from "../assets/G (1).jpg";
import G2 from "../assets/G (2).jpg";
import G3 from "../assets/G (3).jpg";

export default function ListProduct(props) {
  const [data, setData] = useState([]);

  const [isLogin, setIsLogin] = useState();
  const [toppic, setToppic] = useState("สินค้าทั้งหมด");

  useEffect(() => {
    getData();
    getDataToLocal();
  }, []);

  function getDataToLocal() {
    setIsLogin(localStorage.getItem("userData"));
  }

  function getData() {
    axios
      .get("http://localhost:5001/getProductAll")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {});
  }
  function openDetail(data) {
    console.log(data);
  }
  const [numDataNav, setNumDataNav] = useState(0);

  function fillData(k) {
    console.log(k);
    setNumDataNav(k);
    /* numDataNav dataNav */
    setToppic(dataNav[k]);
    if (k === 0) {
      axios
        .get("http://localhost:5001/getProductAll")
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {});
    } else {
      axios
        .post("http://localhost:5001/getProductByTypeID", {
          type: k,
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {});
    }
  }

  //const img_style = { width: "100%" , height : '100%' };
  const dataNav = [
    "สินค้าทั้งหมด",
    "เสื้อผ้า",
    "กิ๊ฟชอป",
    "อาหาร/เครื่องปรุง",
    "สมุนไพร",
    "สินค้าพิเศษ",
  ];

  return (
    <MainLayout>
      <div
        className="container"
        style={{ backgroundColor: "white", height: "100%" }}
      >
        <div className="row justify-content-center">
          {/* ========================================================= */}
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="2000">
                <img src={G1} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item" data-bs-interval="2000">
                <img src={G2} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item" data-bs-interval="2000">
                <img src={G3} class="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

          {/* ============================================================ */}

          <div
            className="col-4 col-sm-3 pt-3"
            style={{
              height: "100%",
            }}
          >
            <p class="fs-6">รายการประเภทสินค้า</p>
            {/* List */}

            <div className="row">
              {dataNav.map((item, index) => {
                return (
                  <>
                    <div className="col-12">
                      <div
                        className={
                          numDataNav === index
                            ? "btn btn-outline-danger mb-3 active"
                            : "btn btn-outline-danger mb-3"
                        }
                        style={{ width: "80%" }}
                        onClick={() => {
                          fillData(index);
                        }}
                      >
                        {item}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            {/* List */}
          </div>
          <div className="col-8 col-sm-9 ">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-12  justify-content-center pt-3">
                <h1>{toppic}</h1>

                {numDataNav === 0 && (
                  <>
                    <img
                      src={banner1}
                      class="rounded mx-auto d-block"
                      style={{ width: "98%" }}
                      alt="..."
                    />
                  </>
                )}
                {numDataNav === 1 && (
                  <>
                    <img
                      src={banner2}
                      class="rounded mx-auto d-block"
                      style={{ width: "98%" }}
                      alt="..."
                    />
                  </>
                )}
                {numDataNav === 2 && (
                  <>
                    <img
                      src={banner3}
                      class="rounded mx-auto d-block"
                      style={{ width: "98%" }}
                      alt="..."
                    />
                  </>
                )}
                {numDataNav === 3 && (
                  <>
                    <img
                      src={banner4}
                      class="rounded mx-auto d-block"
                      style={{ width: "98%" }}
                      alt="..."
                    />
                  </>
                )}
                {numDataNav === 4 && (
                  <>
                    <img
                      src={banner5}
                      class="rounded mx-auto d-block"
                      style={{ width: "98%" }}
                      alt="..."
                    />
                  </>
                )}
                {numDataNav === 5 && (
                  <>
                    <img
                      src={banner6}
                      class="rounded mx-auto d-block"
                      style={{ width: "98%" }}
                      alt="..."
                    />
                  </>
                )}
              </div>
            </div>
            {/* LISTDATA */}
            <div className="row mt-3 mb-3" style={{ width: "100%" }}>
              {data.map((item, index) => {
                return (
                  <>
                    <div
                      className="col-6 col-sm-4 col-mb-4" /* style={{width:'100%'}} */
                    >
                      <div className="card" style={{ width: "19rem" }}>
                        <div className="card-body">
                          <img
                            src={`http://localhost:5001/img/${item.img1}`}
                            class="card-img-top rounded"
                            style={{ width: "17rem", height: "16rem" }}
                            alt="..."
                          />
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text">
                            <span
                              style={{
                                fontSize: "25px",
                                color: "rgba(246,63,46,1)",
                              }}
                            >
                              {" "}
                              ฿{" "}
                            </span>{" "}
                            {item.price}
                          </p>

                          <Link
                            to={`/productDetail/${item.id}`}
                            className="btn btn-secondary"
                          >
                            รายละเอียดสินค้า
                          </Link>
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
    </MainLayout>
  );
}
