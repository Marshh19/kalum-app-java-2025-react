import { CssBaseline } from '@mui/material'
import './App.css'
import { AppBarMenu } from './componets/layout/AppBarMenu'
import { useState } from 'react'
import { SideNav } from './componets/layout/SideNav';

function App() {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleLogout = () => {
    console.log('Sesion Cerrada');
  }

  return (
    <>
      <CssBaseline/>
      <AppBarMenu onMenuClick={handleDrawerToggle} onLogout={handleLogout}></AppBarMenu>
      <SideNav open={drawerOpen} onClose={handleDrawerToggle}></SideNav>
    </>
  )
}

export default App
