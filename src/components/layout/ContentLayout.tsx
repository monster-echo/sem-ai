"use client";

import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import NotificationTicker from "../dashboard/NotificationTicker";

interface ContentLayoutProps {
  children: React.ReactNode;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-row min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          isOpen={false}
          onClose={() => {}}
          mode="docked"
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          mode="overlay"
          isCollapsed={false}
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0 relative transition-all duration-300">
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between shadow-lg shrink-0 h-16 relative z-10">
          <div className="flex items-center">
            <button
              className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 px-4 flex justify-center">
            <NotificationTicker />
          </div>

          <div className="flex items-center gap-4 shrink-0">
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

        <main className="flex-1 relative min-h-0">{children}</main>
      </div>
    </div>
  );
};

export default ContentLayout;
