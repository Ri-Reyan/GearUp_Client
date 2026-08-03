import ProviderSidebar from "./_components/Sidebar";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <ProviderSidebar />

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
