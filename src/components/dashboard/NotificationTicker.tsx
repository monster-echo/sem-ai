"use client";

import React, { useEffect, useState, useRef } from "react";
import { Bell, CheckCircle, Info, XCircle } from "lucide-react";
import { generateNotifications } from "@/lib/data";
import { Notification } from "@/types";

const ScrollingContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && measureRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const contentWidth = measureRef.current.scrollWidth;
        setIsOverflowing(contentWidth > containerWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [children]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className} relative`}>
      <div
        className={`whitespace-nowrap ${
          isOverflowing ? "animate-marquee inline-block pl-[100%]" : "truncate"
        }`}
      >
        {children}
      </div>
      <div
        ref={measureRef}
        className="absolute top-0 left-0 invisible whitespace-nowrap pointer-events-none"
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
};

export default function NotificationTicker() {
  const [notifications] = useState<Notification[]>(() =>
    generateNotifications()
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (notifications.length <= 1) return;

    const interval = setInterval(() => {
      if (isPaused) return;

      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 300); // Wait for fade out
    }, 4000);

    return () => clearInterval(interval);
  }, [notifications.length, isPaused]);

  if (notifications.length === 0) return null;

  const current = notifications[currentIndex];

  const getIcon = () => {
    switch (current.type) {
      case "ALARM":
        return <Bell className="w-4 h-4 text-orange-500" />;
      case "SUCCESS":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "ERROR":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "INFO":
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getBadgeStyle = () => {
    if (current.type === "ALARM") {
      if (current.level === "CRITICAL")
        return "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400";
      if (current.level === "WARNING")
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400";
      return "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400";
    }
    switch (current.type) {
      case "SUCCESS":
        return "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400";
      case "ERROR":
        return "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400";
      case "INFO":
      default:
        return "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400";
    }
  };

  const getLabel = () => {
    if (current.type === "ALARM") return current.level || "ALARM";
    return current.type;
  };

  return (
    <div
      className="hidden md:flex items-center w-full max-w-xl mx-auto bg-slate-50 dark:bg-slate-800/50 rounded-full px-4 py-1.5 border border-slate-200 dark:border-slate-700/50 shadow-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="shrink-0 mr-3 flex items-center">{getIcon()}</div>
      <div className="flex-1 overflow-hidden h-6 relative flex items-center">
        <div
          className={`flex items-center gap-3 text-sm w-full transition-all duration-300 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <span
            className={`
                font-bold text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0
                ${getBadgeStyle()}
              `}
          >
            {getLabel()}
          </span>
          <ScrollingContent className="flex-1 text-slate-600 dark:text-slate-300">
            <span className="font-medium mr-2">{current.title}</span>
            {current.message}
          </ScrollingContent>
          <span className="text-slate-400 text-xs whitespace-nowrap shrink-0">
            {current.time}
          </span>
        </div>
      </div>
    </div>
  );
}
