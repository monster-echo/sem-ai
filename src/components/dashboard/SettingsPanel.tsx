"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  Save,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";

export default function SettingsPanel() {
  const [activeTab, setActiveTab] = useState("general");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weeklyReport: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = [
    {
      id: "general",
      label: "通用设置",
      icon: <Settings className="w-4 h-4" />,
    },
    { id: "account", label: "账户管理", icon: <User className="w-4 h-4" /> },
    {
      id: "notifications",
      label: "通知偏好",
      icon: <Bell className="w-4 h-4" />,
    },
    { id: "security", label: "安全隐私", icon: <Shield className="w-4 h-4" /> },
    { id: "data", label: "数据集成", icon: <Database className="w-4 h-4" /> },
  ];

  if (!mounted) return null;

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-800 flex flex-col">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-blue-600 dark:text-blue-500" />
              系统设置
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              管理您的系统偏好与配置
            </p>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="bg-slate-100 dark:bg-slate-800/50 rounded-lg p-3">
              <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">
                当前版本
              </p>
              <p className="text-sm font-mono text-slate-700 dark:text-slate-300">
                v2.4.0 (Build 20251224)
              </p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-950/30">
          <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="flex flex-col items-center justify-center h-64 text-slate-500 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Settings className="w-8 h-8 text-slate-400 dark:text-slate-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  功能开发中
                </h3>
                <p className="text-sm">该设置模块正在建设中，敬请期待...</p>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  通知推送设置
                </h3>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-200 dark:divide-slate-800">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-slate-900 dark:text-white font-medium">
                        电子邮件通知
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-500">
                        接收每日摘要和重要警报邮件
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={() =>
                          setNotifications({
                            ...notifications,
                            email: !notifications.email,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-slate-900 dark:text-white font-medium">
                        浏览器推送
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-500">
                        实时接收设备故障和停机通知
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.push}
                        onChange={() =>
                          setNotifications({
                            ...notifications,
                            push: !notifications.push,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-slate-900 dark:text-white font-medium">
                        短信通知
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-500">
                        仅接收紧急严重级别的报警短信
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={() =>
                          setNotifications({
                            ...notifications,
                            sms: !notifications.sms,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {["account", "security", "data"].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center h-64 text-slate-500 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Settings className="w-8 h-8 text-slate-400 dark:text-slate-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  功能开发中
                </h3>
                <p className="text-sm">该设置模块正在建设中，敬请期待...</p>
              </div>
            )}

            {/* Save Button */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                <Save className="w-4 h-4" />
                保存更改
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
