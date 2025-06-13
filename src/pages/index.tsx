"use client";

import NavBar from "@/components/navbar";
import Header from "@/components/header";
import RootLayout from "@/components/layout";
import Image from "next/image";
import { randomInt } from "@/helper";
// import Link from "next/link";
// import { useState, useEffect } from "react";

const Home = () => {
  const imgIndex = [0, 1, 2, 3];

  return (
    <RootLayout>
      <NavBar activePage="home" />
      <Header />
      <br />
      <div className="container">
        <div className="row">
          <div className="col text-center fs-5 text">
            <p>Howdy! Here you can find a collection of pet pictures that I edited to turn them into heroes from the video game <strong>Overwatch</strong>. <br />Here are a few examples:</p>
          </div>
        </div>
        <hr />
        <div className="row">
          {
            imgIndex.map((index) => {
              return (
                <div className="col" key={index}>
                  <Image src={`/data/${randomInt(1, 199)}.png`} width={250} height={100} unoptimized={true} alt="icon" className="img-fluid rounded border bg-info-subtle" />
                </div>
              );
            })
          }
        </div>
        <hr />
        <div className="row">
          <div className="col text-center fs-5 text">
            <p>Go to the <strong>Pets</strong> page to see all the cuties!</p>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Home;
