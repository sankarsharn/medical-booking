"use client";
import React from "react";
import Search from "./components/Search";
import Specialities from "./components/Specialities";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">      
      <Search />
      <Specialities />
      <Testimonials />
     </div>
  );
}