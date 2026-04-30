import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';

export default function SignUpSide() {
  const { SignUp } = useAuth();
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData(event.currentTarget);
    const user = {
      userName: data.get('username'),
      email: data.get('email'),
      senha: data.get('senha'),
      novaSenha: data.get('novasenha'),
    };

    if (user.senha == null || user.userName == null || user.email == null || user.novaSenha == null) {
      setError(t('auth.fieldsRequired'));
      setLoading(false);
      return;
    }

    if (user.senha.length < 12) {
      setError(t('auth.passwordMin'));
      setLoading(false);
      return;
    }

    if (user.senha !== user.novaSenha) {
      setError(t('auth.passwordMismatch'));
      setLoading(false);
      return;
    }

    try {
      const response = await SignUp(user.userName, user.senha, user.email);

      if (response.id) {
        console.log(response);
      } else {
        setError(response);
      }
    } catch (err) {
      setError(t('auth.unexpectedError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ minHeight: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url("/static/images/templates/templates-images/sign-in-side-bg.png")',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'left',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('auth.signUp')}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label={t('auth.username')}
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('auth.email')}
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha"
              label={t('auth.password')}
              type="password"
              id="senha"
              autoComplete="new-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="novasenha"
              label={t('auth.confirmPassword')}
              type="password"
              id="novasenha"
              autoComplete="new-password"
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? t('auth.loading') : t('auth.createAccount')}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component="button" onClick={() => { navigate('/login') }} variant="body2">
                  {t('auth.alreadyHaveAccount')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
