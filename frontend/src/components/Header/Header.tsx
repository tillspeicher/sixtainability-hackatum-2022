import type { HeaderProps } from "./types"
import { AppBar, Box, Link } from "@mui/material"
// @ts-ignore
import sixtainabilityLogo from "/src/assets/sixtainability.png"

import React from "react"
export function Header({ prop = "Header" }: HeaderProps) {
  return (
    <div>
      <div className="flex w-full h-12 bg-orange drop-shadow-md justify-between content-center">
        <div className="w-full flex justify-between content-center mx-2">
          <img className="h-14" src={sixtainabilityLogo} alt={"Logo"} />
          <Box
            sx={{
              display: "flex",
              alignItems: "right",
              textAlign: "center",
              paddingTop: "1rem",
            }}
          >
            <Link
              sx={{ minWidth: 100, color: "white", textDecoration: "none" }}
              href={"/"}
            >
              Home
            </Link>
            <Link
              sx={{ minWidth: 100, color: "white", textDecoration: "none" }}
              href={"/project"}
            >
              Project
            </Link>
            <Link
              sx={{ minWidth: 100, color: "white", textDecoration: "none" }}
              href={"/team"}
            >
              Team
            </Link>
          </Box>
        </div>
      </div>
    </div>
  )
}
const style = {
  flexGrow: 1,
}
