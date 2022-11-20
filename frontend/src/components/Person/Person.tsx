import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material"

import type { PersonProps } from "./types"
export function Person({ prop = "Person" }: PersonProps) {
  return (
    <div className="w-full bg-black flex flex-col overflow-hidden">
      <div style={{ width: "100%", marginBottom: "50px"}}>
        <Typography
          gutterBottom
          variant="h2"
          component="div"
          style={{ color: "rgb(255,95, 0)", padding: "2rem" }}
        >
          Our Awesome Team
        </Typography>
        <Container>
          <Grid container rowSpacing={4} columnSpacing={1}>
            <Grid item xs={6}>
              <Card sx={{ maxWidth: 345, marginLeft: "2rem" }}>
                <CardMedia
                  component="img"
                  height="300"
                  image="src/assets/team/ashmi.png"
                  alt="tilly"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Ashmi Banerjee
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Backend Developer
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image="src/assets/team/tilly_1.png"
                  alt="tilly"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Tilly
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Full-stack Developer
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ maxWidth: 345, marginLeft: "2rem" }}>
                <CardMedia
                  component="img"
                  height="300"
                  image="src/assets/team/Gilles.jpg"
                  alt="tilly"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Gilles
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Frontend Developer
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image="src/assets/team/Mantas.png"
                  alt="tilly"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Mantas
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Data Engineer
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
}
