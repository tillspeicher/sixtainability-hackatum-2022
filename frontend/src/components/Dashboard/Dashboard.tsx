import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  Box,
} from "@mui/material"
import Slider from "@mui/material/Slider"
import Iframe from "react-iframe"

import { DashboardBox } from "../DashboardBox"

import type { DashboardProps } from "./types"

export function Dashboard({ prop = "Dashboard" }: DashboardProps) {
  return (
    <div className="w-full">
      <div className="bg-white w-full h-14 drop-shadow-md">
        <h5>Such EVs, much wow</h5>
      </div>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <DashboardBox title={"Info"}>Cars, Drivers, etc.</DashboardBox>
        </Grid>
        <Grid item xs={6}>
          {/* <DashboardBox title={"Map"}> */}
          <Iframe
            url="http://127.0.0.1:5000"
            width="100%"
            height="100%"
            id="myId"
            styles={{ borderWidth: "0" }}
          />
          {/* </DashboardBox> */}
        </Grid>
        <Grid item xs={3}>
          <DashboardBox title={"Controls"}>
            <Box sx={{ margin: 4 }}>
              <SliderControl title={"New driver arrival rate"} />
              <SliderControl title={"Charged return probability"} />
            </Box>
          </DashboardBox>
        </Grid>
      </Grid>
    </div>
  )
}

type SliderControlProps = {
  title: string
}

const SliderControl: React.FC<SliderControlProps> = (props) => {
  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="body1" color="inherit" component="div">
        New driver arrival rate
      </Typography>
      <Slider />
    </Box>
  )
}
