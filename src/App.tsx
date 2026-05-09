import React, { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppBar, Box, Container } from '@mui/material'
import { HomePage } from './pages/HomePage'
import { RegisterPage } from './pages/RegisterPage'
import { AuthProvider } from './context/AuthContext'

const AppContent: React.FC = () => {
  return(
    <BrowserRouter>
      <Box sx={{ display:'flex', flexDirection:'column', minHeight:"100vh"}}>
        <AppBar/>
        <Box component="main" sx={{ flex:1, py:3 }}>
          <Container>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/register" element={<RegisterPage/>} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

function App() {
  return (
    <>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </>
  )
}

export default App
