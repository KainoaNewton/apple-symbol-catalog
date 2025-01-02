import { ThemeProvider } from "@/components/ThemeProvider"
import { Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  )
}

export default App