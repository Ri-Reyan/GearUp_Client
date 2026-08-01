import Navbar from "@/components/navbar";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="px-6">
        <Navbar />
      </div>
      {children}
    </>
  );
};

export default PublicLayout;
