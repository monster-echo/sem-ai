"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Menu, Factory } from "lucide-react";
import NotificationTicker from "../dashboard/NotificationTicker";
import { useTranslation } from "@/hooks/useTranslation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-row h-screen overflow-hidden">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        mode="overlay"
        isCollapsed={false}
      />

      <div className="flex flex-col flex-1 min-w-0 relative transition-all duration-300 h-full">
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center shadow-lg shrink-0 h-16 relative z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="打开系统菜单"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="w-9 h-9 bg-linear-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
              <Factory className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">
                {t.sidebar.title}
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {t.sidebar.subtitle}
              </p>
            </div>
          </div>
          <div className="flex-1 px-4 flex justify-center">
            <NotificationTicker />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-xl font-mono font-bold text-slate-900 dark:text-white leading-none">
                {currentTime.toLocaleTimeString("zh-CN", { hour12: false })}
              </div>
              <div className="text-[10px] text-slate-500">
                {currentTime.toLocaleDateString("zh-CN")}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 relative min-h-0 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
