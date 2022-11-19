import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles"

import { Home } from "~/pages/Home"
import { theme } from "~/styles/theme"

export function App() {
  return (
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
            <Home />
        </ThemeProvider>
    </StyledEngineProvider>
  )
}
