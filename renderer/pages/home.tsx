import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <p>
          ⚡ Home ⚡ -
          <Link href="/">
            <a>Go to Contact Page</a>
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
}

export default Home;
