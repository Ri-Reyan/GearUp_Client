import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>Navbar Main</div>
      {children}
    </>
  );
};

export default PublicLayout;
