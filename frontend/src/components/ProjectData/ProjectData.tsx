import type { ProjectDataProps } from "./types"
import { Box, CardContent, Typography } from "@mui/material"
export function ProjectData({ prop = "ProjectData" }: ProjectDataProps) {
  return (
    <div className="bg-black" style={{ maxHeight: "100%" }}>
      <Box maxWidth={"80%"}>
        <CardContent style={{ padding: "2rem" }}>
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            style={{ color: "rgb(255,95, 0)" }}
          >
            Problem
          </Typography>
          <p style={{ fontSize: "bigger", color: "white" }}>
            A typical passenger vehicle emits about 4.6 metric tons of carbon
            dioxide per year, luckily our generation seems to be the one to take
            this number seriously. As such, experts predict a massive 80% drop
            in car ownership by 2030. This alone leaves a ton of room for
            preparations, programs that welcome the change, future alternatives,
            and Sixt seem to share our vision in building a greener future!
          </p>
        </CardContent>
      </Box>
      <Box maxWidth={"80%"}>
        <CardContent style={{ padding: "2rem" }}>
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            style={{ color: "rgb(255,95, 0)" }}
          >
            Our Proposed Solution
          </Typography>
          <p style={{ fontSize: "bigger", color: "white" }}>
            The project “Sixtainability” is a long term project idea that would
            not only prepare the metropolitan cities for a greener future, but
            also help Sixt expand their EV fleet due to increased awareness and
            access to charging stations.
          </p>
          <br />
          <p style={{ fontSize: "bigger", color: "white" }}>
            Our “Sixtainability” platform allows real time analysis of
            problematic areas regarding charging and similar bottlenecks. Our
            proposed solution comes in the form of a loyalty status and a
            mutually beneficial contract between the loyal customer and Sixt as
            a reward. The platform runs using completely real-world data with
            exception of Sixt specific car information. Fortunately the switch
            between simulated and Sixt data is a couple clicks away allowing to
            easily integrate the official Sixt developer API into the dashboard.
          </p>
        </CardContent>
      </Box>
      <Box maxWidth={"80%"}>
        <CardContent style={{ padding: "1rem" }}>
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            style={{ color: "rgb(255,95, 0)" }}
          >
            Implementation
          </Typography>
          <img
            src={"src/assets/tech/techStack.png"}
            alt={"Tech Stack"}
            width={"60%"}
          />
        </CardContent>
      </Box>
      <Box maxWidth={"80%"}>
        <CardContent style={{ padding: "2rem" }}>
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            style={{ color: "rgb(255,95, 0)" }}
          >
            Future Plans
          </Typography>
          <p style={{ fontSize: "bigger", color: "white" }}>
            While we obviously couldn’t implement everything we thought of
            during the hackathon, the time is definitely on our side. Only time
            will tell whether the idea get’s significant interest from Sixt or
            becomes a standalone startup in the future. We’re definitely
            interested in pursuing the idea after the end of the Hackathon and
            are very confident that as the years go on and the demand for EV’s
            goes up, some form of charging-outsourcing project will become a
            reality, we can only hope that we will be the ones in charge! 🙂
          </p>
          <br />
        </CardContent>
      </Box>
    </div>
  )
}
