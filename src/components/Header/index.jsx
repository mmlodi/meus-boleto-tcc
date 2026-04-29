import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import { AccountBox, BarChart, ShowChart } from '@mui/icons-material';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import React  from 'react';
import { useAuth } from '../../context/AuthContext';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Header( {children}) {
  const navigate = useNavigate();
  const { isAuthenticated, user, SignOut} = useAuth(); 
  const drawerWidth = 240;
  
  const handleLogout = () => {
    SignOut();  // Call SignOut from your AuthContext
    navigate('/login');  // Redirect to the login page
  };

  return (
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ display: 'flex' }}>
          {isAuthenticated && <React.Fragment>
            <CssBaseline />
            <AppBar
              position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,  }}>
              <Toolbar style={{display:'flex', justifyContent:'space-between'}}>
                <Typography variant="h6" noWrap component="div">
                  Meus Boleto
                </Typography>
                <Button color="inherit" onClick={handleLogout}>Sair</Button>
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

          <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
            <Toolbar />
            {children}
          </Box>
        </Box>
      </ThemeProvider>
  );
}

export default Header;
