import { ClientNavbar } from "@/components/navigation/ClientNavbar";
import { ClientSidebar } from "@/components/navigation/ClientSidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0B0B0F]">
      <ClientSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <ClientNavbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
