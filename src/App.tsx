import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Hub from './pages/Hub'
import Memorial from './pages/Memorial'
import MemorialPadrao from './pages/MemorialPadrao'
import MobileWarning from './components/MobileWarning'
import ClickSpark from './components/ClickSpark'
import { isAutenticado } from './auth/auth'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  return isAutenticado() ? <>{children}</> : <Navigate to="/login" replace />
}

function AppRoutes() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  if (!isDesktop) return <MobileWarning />

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Hub /></PrivateRoute>} />
      <Route path="/memorial-personalizado" element={<PrivateRoute><Memorial /></PrivateRoute>} />
      <Route path="/memorial-padrao" element={<PrivateRoute><MemorialPadrao /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ClickSpark sparkColor="#8b5cf6" sparkCount={7} sparkRadius={24} sparkSize={7} duration={480} />
      <AppRoutes />
    </BrowserRouter>
  )
}
