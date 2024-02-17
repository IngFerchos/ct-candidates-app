import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { myTheme } from "./mytheme"

export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={myTheme}>
        <CssBaseline/>
            {children}
    </ThemeProvider>
  )
}
