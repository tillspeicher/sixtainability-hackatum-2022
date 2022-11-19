import PropTypes from "prop-types"
import React from "react"

import type { DashboardBoxProps } from "./types"

export const DashboardBox: React.FC<DashboardBoxProps> = (props) => {
  return (
    <div className="w-full h-full bg-zinc-800 drop-shadow-md rounded-sm">
      <p className="text-white text-center text-xl p-2">{props.title}</p>
      {props.children}
    </div>
  )
}

DashboardBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string.isRequired,
}
