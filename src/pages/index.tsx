"use client";

import NavBar from "@/components/navbar";
import Header from "@/components/header";
import RootLayout from "@/components/layout";
// import Link from "next/link";
// import { useState, useEffect } from "react";

const Home = () => {
  return (
    <RootLayout>
      <NavBar activePage="home" />
      <Header />
      <br />
      <div className="container root-content">
        <div className="row">
          <div className="col">
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Home;
