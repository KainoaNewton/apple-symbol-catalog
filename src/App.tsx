import { ThemeProvider } from "@/components/ThemeProvider"
import { BrowserRouter } from "react-router-dom"
import Index from "./pages/Index"

function App() {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App