import React from "react";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-full text-slate-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p>Coming Soon...</p>
      </div>
    </div>
  );
}
