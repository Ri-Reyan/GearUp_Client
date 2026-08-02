import Navbar from "@/components/navbar";

type IChildrenType = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: IChildrenType) => {
  return (
    <div>
      <div className="p-4">
        <Navbar />
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
