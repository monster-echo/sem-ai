import React from "react";
import { Settings, X, RotateCcw, Save } from "lucide-react";

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-slate-800">
          <h3 className="text-white font-bold flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            看板系统设置
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-slate-400 block">数据刷新频率</label>
            <select
              aria-label="data refresh rate"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option>实时 (Real-time)</option>
              <option>5 秒</option>
              <option>30 秒</option>
              <option>1 分钟</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400 block">
              报警灵敏度 (负载阈值)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                aria-label="alarm sensitivity"
                className="flex-1 accent-blue-500"
                min="50"
                max="100"
                defaultValue="90"
              />
              <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded border border-slate-700">
                90%
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400 block">显示主题</label>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-blue-500 bg-slate-800 text-white">
                <div className="w-4 h-4 rounded-full bg-slate-950 border border-slate-700"></div>
                深色工业
              </button>
              <button
                className="flex items-center justify-center gap-2 p-3 rounded-lg border border-slate-700 bg-slate-100 text-slate-900 opacity-60 cursor-not-allowed"
                title="暂不支持"
              >
                <div className="w-4 h-4 rounded-full bg-white border border-slate-300"></div>
                浅色办公
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-950/50 border-t border-slate-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> 重置
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> 保存配置
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;
