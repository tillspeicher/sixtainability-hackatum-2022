import { Outlet } from "react-router-dom"

import { Navigation } from "~/components/Navigation"
import { NAV_LINKS } from "~/constants"
import { Header } from "~/components/Header"

export function Base() {
  return (
    <>
      {/*<Navigation links={NAV_LINKS} />*/}
      <Header />
      <Outlet />
    </>
  )
}
