import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Suspense fallback={<div>وایسا...</div>}>
        <AppSidebar side="right" />
      </Suspense>
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
