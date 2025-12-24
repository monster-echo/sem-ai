"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Download,
  Box,
  DollarSign,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { generateAssetList } from "@/lib/data";

export default function AssetsPanel() {
  const [assets, setAssets] = useState([]);
  const [filterType, setFilterType] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setAssets(generateAssetList());
  }, []);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesType = filterType === "ALL" || asset.type === filterType;
      const matchesSearch =
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.serialNumber.includes(searchTerm);
      return matchesType && matchesSearch;
    });
  }, [assets, filterType, searchTerm]);

  const totalValue = useMemo(() => {
    return assets.reduce((sum, asset) => sum + asset.value, 0);
  }, [assets]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-500">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              设备总数
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {assets.length}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-500">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              资产总值
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {formatCurrency(totalValue)}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-500">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              本月即将过保
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              3
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-500/20 text-orange-600 dark:text-orange-500">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              维护中设备
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {assets.filter((a) => a.status === "MAINTENANCE").length}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="搜索设备名称、型号或序列号..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-80 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">所有类型</option>
              <option value="HAAS">HAAS</option>
              <option value="MAZAK">MAZAK</option>
              <option value="DMG">DMG</option>
              <option value="FANUC">FANUC</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
              <Plus className="w-4 h-4" />
              新增资产
            </button>
            <button className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/50 sticky top-0 z-10">
              <tr>
                <th className="p-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  资产编号
                </th>
                <th className="p-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  设备名称
                </th>
                <th className="p-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  型号 / 序列号
                </th>
                <th className="p-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  位置
                </th>
                <th className="p-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  状态
                </th>
                <th className="p-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  购入日期 / 维保到期
                </th>
                <th className="p-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                  资产价值
                </th>
                <th className="p-4 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredAssets.map((asset) => (
                <tr
                  key={asset.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group"
                >
                  <td className="p-4 text-sm font-mono text-slate-500 dark:text-slate-400">
                    {asset.id}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-500 font-bold text-xs">
                        {asset.type.substring(0, 1)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {asset.name}
                        </p>
                        <p className="text-xs text-slate-500">{asset.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {asset.model}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                      {asset.serialNumber}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {asset.location}
                    </div>
                  </td>
                  <td className="p-4">
                    {asset.status === "ACTIVE" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        正常
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 border border-orange-200 dark:border-orange-500/20">
                        <AlertCircle className="w-3 h-3" />
                        维护中
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {asset.purchaseDate}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      保修至: {asset.warrantyExp}
                    </p>
                  </td>
                  <td className="p-4 text-right font-mono text-sm text-slate-600 dark:text-slate-300">
                    {formatCurrency(asset.value)}
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (Mock) */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>显示 {filteredAssets.length} 条记录</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-50">
              上一页
            </button>
            <button className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
