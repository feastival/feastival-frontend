import Artists from "@/components/Explore/Artists";
import React from "react";
import Card from "../components/Card";
import Table from "@/components/Explore/Table";
import Head from "next/head";

export default function ExploreRoute() {
  return (
    <>
      <Head>
        <title>Event Cards</title>
      </Head>
      <Card />
      <Artists />
      <Table />
    </>
  );
}
