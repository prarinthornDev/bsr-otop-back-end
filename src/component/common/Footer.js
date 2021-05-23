import React from "react";

export default function Footer() {
  return (
    <>
      <div
        className="col d-flex align-items-start pt-5 justify-content-center"
        style={{
          width: "100vw",
          height: "20vh",
          background:
            "linear-gradient(90deg, rgba(246,63,46,1) 0%, rgba(254,99,51,1) 35%, rgba(251,86,49,1) 100%)",
          fontSize: "18px",
          color: "white",
        }}
      >
        copyright © 2021 by Dr. Kittikhun Meethongjan
        <br/>
        สงวนลิขสิทธิ์ © 2564 โดย ดร.กิตติคุณ มีทองจันทร์
      </div>
    </>
  );
}
