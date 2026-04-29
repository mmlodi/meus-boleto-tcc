import './App.css';
import AppRouter from './Routes';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo, useState } from 'react';

const getInitialThemeMode = () => {
  const storedMode = localStorage.getItem('themeMode');

  if (storedMode === 'light' || storedMode === 'dark') {
    return storedMode;
  }

  if (typeof window.matchMedia !== 'function') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

function App() {
  const [themeMode, setThemeMode] = useState(getInitialThemeMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  const handleToggleTheme = () => {
    setThemeMode((currentMode) => {
      const nextMode = currentMode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('themeMode', nextMode);
      return nextMode;
    });
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header themeMode={themeMode} onToggleTheme={handleToggleTheme}>
          <AppRouter />
        </Header>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
