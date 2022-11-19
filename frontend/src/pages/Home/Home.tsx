import { Box, Typography } from "@mui/material"

export function Home() {
  return (
    <Box sx={{ width: "100%", maxWidth: 500, margin: "auto" }}>
      <Typography variant="h1" align="center">
        Home Page
      </Typography>
      <Typography variant="h2" align="center">
        This is the home page description
      </Typography>

      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
          nesciunt sit, similique obcaecati corporis dignissimos magnam, cumque
          consectetur excepturi ipsum quasi. Vero quae quo perferendis
          reprehenderit repellendus nam, unde suscipit?
        </p>
        <p>
          Laborum, modi tempora! Vero ducimus temporibus assumenda voluptatem
          deleniti veniam excepturi reiciendis? Quis alias qui nam, temporibus
          illum accusantium officiis perspiciatis possimus quas quaerat esse
          velit ipsa voluptatum ducimus laboriosam?
        </p>
        <p>
          Recusandae saepe exercitationem, debitis iste in hic enim autem atque
          assumenda expedita! Est explicabo, earum ea rerum nostrum mollitia
          ipsam natus? Delectus consequatur ut iusto neque itaque quidem unde
          architecto?
        </p>
      </div>
    </Box>
  )
}
