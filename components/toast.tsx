"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div className="rounded-md border border-[var(--error)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--error)] shadow-md">
        {message}
      </div>
    </div>
  );
}
