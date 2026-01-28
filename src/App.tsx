import { CssBaseline } from '@mui/material'
import './App.css'
import { AppBarMenu } from './components/layout/AppBarMenu.tsx'
import { useState } from 'react'
import { SideNav } from './components/layout/SideNav.tsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm.tsx';
import Swal from 'sweetalert2';
import { CareersList } from './components/careers/CareersList.tsx';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './routes/ProtectedRoute.tsx';
import { UserList } from './components/users/UserList.tsx';
import { DashBoard } from './components/dashboard/DashBoard.tsx';

function App() {
  const { isAuthenticated, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Estas seguro de cerrar sesion?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!"
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        window.location.href = '/login';
      }
    });
  }

  return (
    <Router>
      <CssBaseline />
      {isAuthenticated && (
        <>
          <AppBarMenu onMenuClick={handleDrawerToggle} onLogout={handleLogout}></AppBarMenu>
          <SideNav open={drawerOpen} onClose={handleDrawerToggle}></SideNav>
        </>
      )}

      <Routes>
        <Route path='/login' element={<LoginForm onLoginSuccess={() => window.location.href = '/dashboard'} />} />
        <Route path='/dashboard' element={
            <DashBoard/>
        } />
        <Route path='/careers' element={
          <ProtectedRoute>
            <CareersList />
          </ProtectedRoute>
        } />
        <Route path='/users' element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        } />
        <Route path='/' element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  )
}
export default App
