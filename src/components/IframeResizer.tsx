"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function IframeResizer() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.self === window.top) return;

    const send = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: "intake-resize", height }, "*");
    };

    send();

    const observer = new ResizeObserver(send);
    observer.observe(document.documentElement);

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
