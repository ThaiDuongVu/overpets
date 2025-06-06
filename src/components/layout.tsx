"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect } from "react";
import Head from "next/head";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  // Bootstrap JavaScript
  useEffect(() => {
    /* eslint-disable */
    require("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);

  return (
    <div>
      {/* Head */}
      <Head>
        <title>OverPets</title>
        <meta name="description" content="Collection of pets as Overwatch heroes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </div>
  );
};

export default RootLayout;