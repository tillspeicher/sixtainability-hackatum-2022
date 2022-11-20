import type { PersonProps } from "./types"
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
export function Person({ prop = "Person" }: PersonProps) {
return (
  <div className="w-full h-screen bg-black flex flex-col overflow-hidden">
    <div style={{width:"60%"}}>
      <Typography gutterBottom variant="h2" component="div" style={{color: "rgb(255,95, 0)", padding:"2rem"}}>
        Our Awesome Team
      </Typography>
      <Grid container rowSpacing={4} columnSpacing={1}>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 345, marginLeft:"2rem"}}>
            <CardMedia
              component="img"
              height="140"
              image="src/assets/team/tilly_1.png"
              alt="tilly"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Ashmi Banerjee
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Full-stack Developer
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 345,}}>
            <CardMedia
              component="img"
              height="140"
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
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 345,marginLeft:"2rem"}}>
            <CardMedia
              component="img"
              height="140"
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
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 345, }}>
            <CardMedia
              component="img"
              height="140"
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
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>

  </div>
)}
