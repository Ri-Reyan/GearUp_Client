import React from "react";
import AdminSidebar from "./_components/Sidebar";

type ChildrenType = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: ChildrenType) => {
  return (
    <div>
      <div className="">
        <AdminSidebar />
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;
