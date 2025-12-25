"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";
import DashboardLayout from "./DashboardLayout";
import ContentLayout from "./ContentLayout";
import { useTranslation } from "@/hooks/useTranslation";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { loaded } = useTranslation();
  const { theme } = useTheme();

  // Prevent hydration mismatch by waiting for store rehydration
  if (!loaded) {
    return (
      <div className="h-screen w-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium animate-pulse">
            Loading System...
          </p>
        </div>
      </div>
    );
  }

  // Determine if we are on the dashboard page
  const isDashboard = pathname === "/dashboard" || pathname === "/";
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return (
      <>
        {children}
        <Toaster
          theme={theme as "light" | "dark" | "system"}
          richColors
          position="top-center"
          closeButton
        />
      </>
    );
  }

  return (
    <>
      {isDashboard ? (
        <DashboardLayout>{children}</DashboardLayout>
      ) : (
        <ContentLayout>{children}</ContentLayout>
      )}
      <Toaster
        theme={theme as "light" | "dark" | "system"}
        richColors
        position="top-center"
        closeButton
      />
    </>
  );
};

export default MainLayout;
