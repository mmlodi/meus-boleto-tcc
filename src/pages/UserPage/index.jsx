import React, { Fragment, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Box, FormControl, Grid, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import { api } from "../../Service/backendAPI";
import { useTranslation } from "react-i18next";

export const UserPage = () => {
    const { user } = useAuth();
    const { t } = useTranslation();

    const [email, setEmail] = useState(user.email);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [snackbar, setSnackbar] = useState(null);
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setSnackbar({ children: t('user.passwordMismatch'), severity: 'error' });
            return;
        }

        if (newPassword.length >= 12) {
            setSnackbar({ children: t('user.passwordLength'), severity: 'error' });
            return;
        }

        if (!validateOldPassword(oldPassword)) {
            setSnackbar({ children: t('user.oldPasswordDifferent'), severity: 'error' });
            return;
        }

        const updatedUser = {
            email: email,
            senha: newPassword
        };

        const response = api.put('users/' + user.id, updatedUser);
        if (response.id) {
            setSnackbar({ children: t('user.success'), severity: 'success' });
        } else {
            setSnackbar({ children: t('user.requestError'), severity: 'error' });
        }
    };

    const validateOldPassword = (oldPassword) => {
        return true;
    }

    const handleCloseSnackbar = () => setSnackbar(null);

    return (
        <Fragment>
            <Typography variant="h4" gutterBottom>
                {t('user.title')}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
                <Grid container spacing={3} direction="column">
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                id="email"
                                label={t('auth.email')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                id="senha-antiga"
                                label={t('user.oldPassword')}
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                id="senha-nova"
                                label={t('user.newPassword')}
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                id="confirmacao-senha-nova"
                                label={t('user.confirmNewPassword')}
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {t('user.updateData')}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar
                open={Boolean(snackbar)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={handleCloseSnackbar}
                autoHideDuration={6000}
            >
                {!!snackbar && <Alert {...snackbar} onClose={handleCloseSnackbar} />}
            </Snackbar>
        </Fragment>
    );
};
