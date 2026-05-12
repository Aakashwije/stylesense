import { StylistNavbar } from "@/components/navigation/StylistNavbar";
import { StylistSidebar } from "@/components/navigation/StylistSidebar";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export default function StylistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen bg-[#0B0B0F]">
        <StylistSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <StylistNavbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </LanguageProvider>
  );
}
