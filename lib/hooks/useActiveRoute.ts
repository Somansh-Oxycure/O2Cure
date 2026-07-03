"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Pathname + hash for active-link detection. `usePathname` omits the hash
 * segment, so we mirror it from `window.location` on the client.
 */
export function useActiveRoute() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  return { pathname, hash };
}
