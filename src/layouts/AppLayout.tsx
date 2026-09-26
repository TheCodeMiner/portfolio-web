import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

import { SiteFooter } from "../components/site/SiteFooter";
import { SiteHeader } from "../components/site/SiteHeader";

/**
 * Restores browser-like hash scrolling after React Router commits a route.
 * The animation frame gives the destination route one paint opportunity to
 * mount its target before the lookup runs.
 */
function HashScrollManager() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const element = document.getElementById(hash.slice(1));
      element?.scrollIntoView();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [hash, pathname]);

  return null;
}

export function AppLayout() {
  return (
    <>
      <HashScrollManager />
      <SiteHeader />

      <Outlet />

      <SiteFooter />
    </>
  );
}
