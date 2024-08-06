import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import CTAsection from "@/components/CTAsection";
import Features from "@/components/Features";

export default function Page() {
  return (
    <div className="poppins">
      <Navbar />
      <CTAsection />
      <Features />
    </div>
  );
}
