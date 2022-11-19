import {
    Typography,
    Box,
} from '@mui/material';
import Slider from '@mui/material/Slider';

import { DashboardBox } from "../DashboardBox"
import type { DashboardProps } from "./types"

export function Dashboard({ prop = "Dashboard" }: DashboardProps) {
return (
    <div className="w-full h-screen bg-black">
        <div className="w-full h-12 bg-zinc-800 drop-shadow-md mb-1 justify-center content-center">
            <p className="text-orange text-center text-xl">
                Such EVs, much wow
            </p>
        </div>
        <div className="table w-full h-full pt-2" >
            <div className="table-cell h-full w-3/12 px-1.5">
                <DashboardBox title={"Info"}>
                    Cars, Drivers, etc.
                </DashboardBox>
            </div>
            <div className="table-cell h-full w-6/12 px-1.5">
                <DashboardBox title={"Map"}>
                </DashboardBox>
            </div>
            <div className="table-cell h-full w-3/12 px-1.5">
                <DashboardBox title={"Controls"}>
                    <div className="p-4">
                        <SliderControl title={"New driver arrival rate"} />
                        <SliderControl title={"Charged return probability"} />
                    </div>
                </DashboardBox>
            </div>
        </div>"
    </div>
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
