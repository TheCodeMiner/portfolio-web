import { Outlet } from "react-router";

import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function AppLayout() {
  return (
    <>
      <SiteHeader />

      <Outlet />

      <SiteFooter />
    </>
  );
}
