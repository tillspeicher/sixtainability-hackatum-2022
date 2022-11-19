import { ThemeProvider } from "@mui/material/styles"

import { Home } from "~/pages/Home"
import { theme } from "~/styles"

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  )
}
