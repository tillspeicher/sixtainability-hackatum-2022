import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Grid,
    Box,
} from '@mui/material';
import Slider from '@mui/material/Slider';

import { DashboardBox } from "../DashboardBox"
import type { DashboardProps } from "./types"

export function Dashboard({ prop = "Dashboard" }: DashboardProps) {
return (
    <Box sx={{
        flexGrow: 1,
    }}>
    <AppBar position="static" color={"secondary"} >
        <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 0 }}>
            {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
                Such EVs, much wow
            </Typography>
        </Toolbar>
    </AppBar>
    <Grid container spacing={0}>
        <Grid xs={3}>
            <DashboardBox title={"Info"}>
                Cars, Drivers, etc.
            </DashboardBox>
        </Grid>
        <Grid xs={6}>
            <DashboardBox title={"Map"}>
            </DashboardBox>
        </Grid>
        <Grid xs={3}>
            <DashboardBox title={"Controls"}>
                <Box sx={{ margin: 4 }}>
                    <SliderControl title={"New driver arrival rate"} />
                    <SliderControl title={"Charged return probability"} />
                </Box>
            </DashboardBox>
        </Grid>
    </Grid>
  </Box>
)}

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
