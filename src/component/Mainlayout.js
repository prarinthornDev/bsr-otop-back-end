import React from "react";
import Header from "./common/Header";
import Footer from './common/Footer';

import BG from '../assets/86766428_2606405239468500_5909611803700101120_n.png';

export default function Mainlayout(props) {
  return (
    <>
      <Header />
      <div className="Mainlayout" style={{backgroundImage: `url(${BG})` }} >{props.children}</div>
      <Footer/>
    </>
  );
}
