import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import { AccountBox, BarChart, ShowChart } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React  from 'react';
import { useAuth } from '../../context/AuthContext';

function ThemeToggle({ isDarkMode, onToggleTheme }) {
  return (
    <Tooltip title={isDarkMode ? 'Tema escuro' : 'Tema claro'}>
      <Box sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
        {isDarkMode ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
        <Switch
          checked={isDarkMode}
          onChange={onToggleTheme}
          color="default"
          inputProps={{ 'aria-label': 'Alternar tema claro e escuro' }}
        />
      </Box>
    </Tooltip>
  );
}

function Header({ children, themeMode, onToggleTheme }) {
  const navigate = useNavigate();
  const { isAuthenticated, SignOut} = useAuth(); 
  const drawerWidth = 240;
  const isDarkMode = themeMode === 'dark';
  
  const handleLogout = () => {
    SignOut();  // Call SignOut from your AuthContext
    navigate('/login');  // Redirect to the login page
  };

  return (
        <Box sx={{ display: 'flex', minHeight: '100vh', color: 'text.primary', bgcolor: 'background.default' }}>
          {isAuthenticated && <React.Fragment>
            <AppBar
              position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,  }}>
              <Toolbar style={{display:'flex', justifyContent:'space-between'}}>
                <Typography variant="h6" noWrap component="div">
                  Meus Boleto
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ThemeToggle isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
                  <Button color="inherit" onClick={handleLogout}>Sair</Button>
                </Box>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
              variant="permanent"
              anchor="left">
              <Toolbar />
              <Divider />
              <List>
                <ListItem key='Home' disablePadding>
                  <ListItemButton onClick={() => navigate('/')}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
                <ListItem key="Categorias" disablePadding>
                  <ListItemButton onClick={() => navigate('/category')}>
                    <ListItemIcon>
                      <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Categoria" />
                  </ListItemButton>
                </ListItem>
                <ListItem key="Investimentos" disablePadding>
                  <ListItemButton onClick={() => navigate('/investments')}>
                    <ListItemIcon>
                      <ShowChart />
                    </ListItemIcon>
                    <ListItemText primary="Investimentos" />
                  </ListItemButton>
                </ListItem>
                <ListItem key="dash" disablePadding>
                  <ListItemButton onClick={() => navigate('/dashboard')}>
                    <ListItemIcon>
                      <BarChart />
                    </ListItemIcon>
                    <ListItemText primary="Dashboards" />
                  </ListItemButton>
                </ListItem>
                <ListItem key="Perfil" disablePadding>
                  <ListItemButton onClick={() => navigate('/user')}>
                    <ListItemIcon>
                      <AccountBox />
                    </ListItemIcon>
                    <ListItemText primary="Perfil" />
                  </ListItemButton>
                </ListItem>
              </List>
              <Divider />
              {/* <div style={{ padding: 10 }}>
                <Typography variant="body2">Resumo de operações:</Typography>
                <Typography variant="body2">Patrimônio total: R$ 20.000</Typography>
                <Typography variant="body2">Lucros no mês passado: R$ 2.000</Typography>
                <Typography variant="body2">Gastos no mês passado: R$ 1.500</Typography>
              </div> */}
            </Drawer>
          </React.Fragment>
          }
          {!isAuthenticated && (
            <Box
              sx={{
                position: 'fixed',
                top: 12,
                right: 12,
                zIndex: (theme) => theme.zIndex.tooltip,
                display: 'flex',
                alignItems: 'center',
                px: 1,
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: 'background.paper',
                boxShadow: 1,
              }}
            >
              <ThemeToggle isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
            </Box>
          )}

          <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
            <Toolbar />
            {children}
          </Box>
        </Box>
  );
}

export default Header;
