"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

interface ContentLayoutProps {
  children: React.ReactNode;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-row min-h-screen">
      <Sidebar
        isOpen={false}
        onClose={() => {}}
        mode="docked"
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex flex-col flex-1 min-w-0 relative transition-all duration-300">
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-end items-center shadow-lg shrink-0 h-16 relative z-10">
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

        <main className="flex-1 relative min-h-0">{children}</main>
      </div>
    </div>
  );
};

export default ContentLayout;
