import React from "react";

export default function test() {
  return (
    <div className="container-fluid p-5">
      <div className="d-flex justify-content-center">
        <div className="d-flex" style={{ width: "80%" }}>  {/* SCROLL */}
          <div
            className="d-flex border justify-content-center align-items-center bg-primary"
            style={{ height: "20vw", width: "100px" }}
          >
            <h4>100px</h4>
          </div>

          <div
            className="d-flex border justify-content-center align-items-center bg-danger"
            style={{ height: "20vw", width: "100%" , minWidth:'150px' }}
          >
            <h1>Full</h1>
          </div>

          <div
            className="d-flex border justify-content-center align-items-center bg-success"
            style={{ height: "20vw", width: "200px" }}
          >
            <h4>200px</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
