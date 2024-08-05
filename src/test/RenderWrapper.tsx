/* eslint-disable react-refresh/only-export-components */
import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

interface Props {
  children: ReactNode
}

const theme = createTheme()

const RenderWrapper = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default (children: ReactNode) => {
  return render(<RenderWrapper>{children}</RenderWrapper>)
}
