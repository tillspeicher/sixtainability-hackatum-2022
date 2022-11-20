import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles"
import { theme } from "~/styles/theme"
import { AppRoutes } from "~/routes"

export function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
