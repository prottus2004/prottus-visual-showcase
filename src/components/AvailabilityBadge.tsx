import { useEffect, useState } from "react";

/**
 * Footer availability + local-time badge: a pulsing green dot, an "Available
 * for work" label, and a live IST (Asia/Kolkata) clock ticking every second.
 */
export const AvailabilityBadge = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-2">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="text-xs text-foreground/70">Available for work</span>
      <span className="chrono-mono text-xs text-era">
        {time} <span className="text-foreground/40">IST</span>
      </span>
    </div>
  );
};