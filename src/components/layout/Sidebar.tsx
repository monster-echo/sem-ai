"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MonitorPlay,
  AlertTriangle,
  Database,
  BarChart2,
  Router,
  Settings,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Factory,
  Languages,
  Sun,
  Moon,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "overlay" | "docked";
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  mode = "overlay",
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const pathname = usePathname();
  const { t, locale, setLocale } = useTranslation();
  const { theme, setTheme } = useTheme();

  const menuItems = [
    {
      id: "dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: t.sidebar.dashboard,
    },
    {
      id: "monitor",
      path: "/monitor",
      icon: <MonitorPlay className="w-5 h-5" />,
      label: t.sidebar.monitor,
    },
    {
      id: "alarms",
      path: "/alarms",
      icon: <AlertTriangle className="w-5 h-5" />,
      label: t.sidebar.alarms,
    },
    {
      id: "assets",
      path: "/assets",
      icon: <Database className="w-5 h-5" />,
      label: t.sidebar.assets,
    },
    {
      id: "analysis",
      path: "/analysis",
      icon: <BarChart2 className="w-5 h-5" />,
      label: t.sidebar.analysis,
    },
    {
      id: "gateway",
      path: "/gateway",
      icon: <Router className="w-5 h-5" />,
      label: t.sidebar.gateway,
    },
    {
      id: "settings",
      path: "/settings",
      icon: <Settings className="w-5 h-5" />,
      label: t.sidebar.settings,
    },
  ];

  // Common classes
  const baseClasses =
    "bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300";

  // Mode specific classes
  const overlayClasses = `fixed inset-y-0 left-0 z-50 w-64 shadow-2xl transform ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`;
  const dockedClasses = `sticky top-0 h-screen ${
    isCollapsed ? "w-20" : "w-64"
  }`;

  const containerClasses = `${baseClasses} ${
    mode === "overlay" ? overlayClasses : dockedClasses
  }`;

  return (
    <>
      {/* 遮罩层 (Only for overlay mode) */}
      {mode === "overlay" && (
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={onClose}
        />
      )}

      {/* 侧边栏主体 */}
      <div className={containerClasses}>
        <div
          className={`p-5 border-b border-slate-200 dark:border-slate-800 flex items-center h-16 shrink-0 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-3 whitespace-nowrap overflow-hidden">
              <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg shrink-0">
                <Factory className="text-white w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  {t.sidebar.title}
                </h2>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest scale-90 origin-left">
                  {t.sidebar.subtitle}
                </p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg shrink-0">
              <Factory className="text-white w-4 h-4" />
            </div>
          )}

          {mode === "overlay" && (
            <button
              onClick={onClose}
              aria-label="close sidebar"
              className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {mode === "docked" && !isCollapsed && (
            <button
              onClick={onToggleCollapse}
              aria-label="toggle collapse"
              className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-4 space-y-2 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path === "/dashboard" && pathname === "/");

            return (
              <Link
                key={item.id}
                href={item.path}
                onClick={mode === "overlay" ? onClose : undefined}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group whitespace-nowrap
                  ${
                    isActive
                      ? "bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white"
                  }
                  ${isCollapsed ? "justify-center px-2" : ""}
                `}
              >
                <div
                  className={`${
                    isActive
                      ? "text-white"
                      : "text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                  } transition-colors shrink-0`}
                >
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="opacity-100 transition-opacity duration-200">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0 flex flex-col gap-2">
          {mode === "docked" && isCollapsed && (
            <button
              onClick={onToggleCollapse}
              aria-label="toggle collapse"
              className="w-full flex items-center justify-center p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => {
              if (locale === "zh") setLocale("en");
              else if (locale === "en") setLocale("ms");
              else setLocale("zh");
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group whitespace-nowrap ${
              isCollapsed ? "justify-center px-2" : ""
            }`}
          >
            <Languages className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors shrink-0" />
            {!isCollapsed && (
              <span>
                {locale === "zh"
                  ? "中文"
                  : locale === "en"
                  ? "English"
                  : "Bahasa Melayu"}
              </span>
            )}
          </button>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group whitespace-nowrap ${
              isCollapsed ? "justify-center px-2" : ""
            }`}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors shrink-0" />
            ) : (
              <Moon className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors shrink-0" />
            )}
            {!isCollapsed && (
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            )}
          </button>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors group whitespace-nowrap ${
              isCollapsed ? "justify-center px-2" : ""
            }`}
          >
            <LogOut className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors shrink-0" />
            {!isCollapsed && <span>{t.sidebar.logout}</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
