import React, { useState, useRef } from "react";
import {
  Maximize2,
  Camera,
  RefreshCw,
  AlertCircle,
  Minimize2,
} from "lucide-react";

interface CameraPlayerProps {
  url?: string;
  name: string;
  status: string;
}

const CameraPlayer: React.FC<CameraPlayerProps> = ({ url, name, status }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 简单的流类型检测
  const isMJPEG =
    url?.includes(".mjpg") ||
    url?.includes(".cgi") ||
    url?.includes("nphMotionJpeg") ||
    url?.includes("/api/camera/proxy");

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setRetryCount((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // 监听全屏变化，处理按 ESC 退出全屏的情况
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  if (!url || status === "idle" || status === "error") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-900">
        <Camera className="w-12 h-12 opacity-20 mb-2" />
        <span className="text-xs opacity-50 font-mono">NO SIGNAL</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 bg-black group ${
        isFullscreen ? "fixed inset-0 z-50 w-screen h-screen" : ""
      }`}
    >
      {/* 加载状态 */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-900/20 backdrop-blur-[2px]">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin opacity-80" />
        </div>
      )}

      {/* 错误状态 */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-slate-900/80 text-white">
          <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
          <span className="text-xs text-slate-300 mb-3">连接中断</span>
          <button
            onClick={handleRetry}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-xs transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> 重连
          </button>
        </div>
      )}

      {/* 播放器核心 */}
      {isMJPEG ? (
        // MJPEG 流必须使用 img 标签
        // Next.js Image 组件不适合用于 MJPEG 视频流，因为它会尝试优化图像，导致流断开或性能问题
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={retryCount} // 改变 key 强制重新加载 img
          src={url}
          alt={`Live feed: ${name}`}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          referrerPolicy="no-referrer"
        />
      ) : (
        // 未来扩展：HLS/WebRTC 流使用 video 标签
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          controls={false}
        >
          <source src={url} />
        </video>
      )}

      {/* 专业 UI 覆盖层 */}
      <div className="absolute top-3 left-3 flex items-center gap-2 z-10 pointer-events-none">
        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-medium text-white border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
          LIVE
        </div>
        <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-slate-300 border border-white/10">
          CAM-0{name.split(" ").pop()}
        </div>
      </div>

      <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          type="button"
          onClick={toggleFullscreen}
          className="p-1.5 bg-black/60 hover:bg-blue-600 text-white rounded backdrop-blur-md border border-white/10 transition-all"
          title={isFullscreen ? "退出全屏" : "全屏查看"}
        >
          {isFullscreen ? (
            <Minimize2 className="w-3.5 h-3.5" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CameraPlayer;
