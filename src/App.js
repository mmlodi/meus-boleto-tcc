import './App.css';
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
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CategoryIcon from '@mui/icons-material/Category';
import AppRouter from './Routes';
import { AccountBox, BarChart, ShowChart } from '@mui/icons-material';
import { ThemeProvider,createTheme } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const navigate = useNavigate();
  const drawerWidth = 240;


  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Meus Boleto
            </Typography>
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
            <ListItem key="Boletos" disablePadding>
              <ListItemButton onClick={() => navigate('/transactions')}>
                <ListItemIcon >
                  <FactCheckIcon />
                </ListItemIcon>
                  <ListItemText primary="Boletos" />
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
          <div style={{verticalAlign:'middle'}}>
            <div>Resumo de operacoes</div>
            <div>Patrimonio total: 20 000</div>
            <div>Lucros mes passado: 20 000</div>
            <div>Gastos mes passado: 20 000</div>
          </div>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
          <Toolbar />
          <AppRouter/>
        </Box>
      </Box>
  </ThemeProvider>
  );
}

export default App;

