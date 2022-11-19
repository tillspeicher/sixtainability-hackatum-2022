import { Paper, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import PropTypes from "prop-types"
import React from "react"

import type { DashboardBoxProps } from "./types"

export const DashboardBox: React.FC<DashboardBoxProps> = (props) => {
  return (
    <CardBase elevation={5}>
      <Typography variant="h6" color="inherit" component="div">
        {props.title}
      </Typography>
      {props.children}
    </CardBase>
  )
}

DashboardBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string.isRequired,
}

const CardBase = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  margin: 8,
  height: "100vh",
}))
