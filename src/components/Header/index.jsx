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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import TranslateIcon from '@mui/icons-material/Translate';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import { AccountBox, BarChart, ShowChart } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React  from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

function ThemeToggle({ isDarkMode, onToggleTheme, t }) {
  return (
    <Tooltip title={isDarkMode ? t('theme.dark') : t('theme.light')}>
      <Box sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
        {isDarkMode ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
        <Switch
          checked={isDarkMode}
          onChange={onToggleTheme}
          color="default"
          inputProps={{ 'aria-label': t('theme.toggle') }}
        />
      </Box>
    </Tooltip>
  );
}

function LanguageSelect() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Tooltip title={t('common.language')}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'inherit' }}>
        <TranslateIcon fontSize="small" />
        <Select
          size="small"
          value={i18n.resolvedLanguage || i18n.language}
          onChange={handleLanguageChange}
          variant="standard"
          disableUnderline
          inputProps={{ 'aria-label': t('common.language') }}
          sx={{
            color: 'inherit',
            minWidth: 72,
            '& .MuiSelect-icon': {
              color: 'inherit',
            },
          }}
        >
          <MenuItem value="pt-BR">PT</MenuItem>
          <MenuItem value="en">EN</MenuItem>
        </Select>
      </Box>
    </Tooltip>
  );
}

function Header({ children, themeMode, onToggleTheme }) {
  const navigate = useNavigate();
  const { isAuthenticated, SignOut} = useAuth(); 
  const { t } = useTranslation();
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
                  {t('common.appName')}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LanguageSelect />
                  <ThemeToggle isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} t={t} />
                  <Button color="inherit" onClick={handleLogout}>{t('common.logout')}</Button>
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
                    <ListItemText primary={t('nav.home')} />
                  </ListItemButton>
                </ListItem>
                <ListItem key="Categorias" disablePadding>
                  <ListItemButton onClick={() => navigate('/category')}>
                    <ListItemIcon>
                      <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('nav.categories')} />
                  </ListItemButton>
                </ListItem>
                <ListItem key="Investimentos" disablePadding>
                  <ListItemButton onClick={() => navigate('/investments')}>
                    <ListItemIcon>
                      <ShowChart />
                    </ListItemIcon>
                    <ListItemText primary={t('nav.investments')} />
                  </ListItemButton>
                </ListItem>
                <ListItem key="dash" disablePadding>
                  <ListItemButton onClick={() => navigate('/dashboard')}>
                    <ListItemIcon>
                      <BarChart />
                    </ListItemIcon>
                    <ListItemText primary={t('nav.dashboards')} />
                  </ListItemButton>
                </ListItem>
                <ListItem key="Perfil" disablePadding>
                  <ListItemButton onClick={() => navigate('/user')}>
                    <ListItemIcon>
                      <AccountBox />
                    </ListItemIcon>
                    <ListItemText primary={t('nav.profile')} />
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
              <LanguageSelect />
              <ThemeToggle isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} t={t} />
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
