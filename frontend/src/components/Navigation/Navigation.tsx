import { Link } from "react-router-dom"

import type { NavigationProps } from "./types"

export function Navigation({ links }: NavigationProps) {
  return (
    <nav>
      {links.map(({ to, label }) => (
        <Link key={label} to={to}>
          {label}
        </Link>
      ))}
    </nav>
  )
}
