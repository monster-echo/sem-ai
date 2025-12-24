import React, { useState, useEffect, useRef } from "react";
import { Bot, X, Sparkles, User, Send } from "lucide-react";
import { Machine } from "@/types";
import { useTranslation } from "@/hooks/useTranslation";

interface AICopilotProps {
  stats: {
    total: number;
    running: number;
    alarm: number;
    idle: number;
    offline: number;
  };
  machines: Machine[];
}

interface Message {
  id: number;
  role: "ai" | "user";
  content: string;
}

const AICopilot: React.FC<AICopilotProps> = ({ stats, machines }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "ai",
      content: t.copilot.welcome,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: inputValue,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let aiContent = t.copilot.unknown;
      const lowerInput = userMsg.content.toLowerCase();

      if (
        lowerInput.includes("故障") ||
        lowerInput.includes("报警") ||
        lowerInput.includes("alarm")
      ) {
        const alarmCount = stats.alarm;
        const alarmMachines = machines
          .filter((m) => m.status === "ALARM")
          .map((m) => m.name)
          .join(", ");
        // Simple localization for dynamic content - ideally use a proper i18n library with interpolation
        aiContent = `当前共有 ${alarmCount} 台设备处于故障报警状态。${
          alarmCount > 0
            ? `涉及设备：${alarmMachines}。建议立即检查。`
            : "目前运行平稳。"
        }`;
      } else if (lowerInput.includes("运行") || lowerInput.includes("开机")) {
        aiContent = `当前有 ${stats.running} 台设备正在运行中。开机率为 ${(
          (stats.running / machines.length) *
          100
        ).toFixed(1)}%。`;
      } else if (lowerInput.includes("总数") || lowerInput.includes("多少台")) {
        aiContent = `车间当前共有 ${machines.length} 台联网设备。`;
      } else if (lowerInput.includes("oee") || lowerInput.includes("效率")) {
        aiContent = `当前的实时 OEE 指标为 82.4%，较昨日提升了 1.2%。保持得不错！`;
      } else if (lowerInput.includes("产量") || lowerInput.includes("进度")) {
        aiContent = `今日累计实际产量已达标，目前生产进度正常，累计产出超 MES 计划约 5%。`;
      } else if (lowerInput.includes("你好") || lowerInput.includes("hi")) {
        aiContent = t.copilot.greeting;
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "ai", content: aiContent },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-200 origin-bottom-right">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-600 rounded-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white font-bold text-sm">
                  {t.copilot.title}
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {t.copilot.status}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 p-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50/30 dark:bg-slate-950/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                    msg.role === "ai"
                      ? "bg-blue-600/20 border-blue-500/30 text-blue-600 dark:text-blue-400"
                      : "bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {msg.role === "ai" ? (
                    <Sparkles className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`rounded-2xl p-3 text-sm max-w-[80%] leading-relaxed ${
                    msg.role === "ai"
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700"
                      : "bg-blue-600 text-white rounded-tr-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-none p-3 flex gap-1 items-center h-10">
                  <span
                    className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-b-2xl">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.copilot.placeholder}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm rounded-xl pl-4 pr-12 py-3 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="absolute right-2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all duration-300 hover:scale-110 ${
          isOpen
            ? "bg-slate-200 dark:bg-slate-700 rotate-90"
            : "bg-gradient-to-r from-blue-600 to-indigo-600"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-slate-900 dark:text-white" />
        ) : (
          <>
            <Bot className="w-7 h-7 text-white animate-pulse-slow" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </>
        )}
      </button>
    </div>
  );
};

export default AICopilot;
