import React, { Fragment, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Box, FormControl, Grid, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import { api } from "../../Service/backendAPI";

export const UserPage = () => {
  const { user } = useAuth();
  
  // State for form fields
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [snackbar, setSnackbar] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  

  // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (newPassword !== confirmNewPassword) {
            setSnackbar({ children: 'A nova senha não é igual a digitada no campo de confirmação', severity: 'error' });
            return;
        }

        if (newPassword.length >= 12 ) {
            setSnackbar({ children: 'A senha precisa ser maior ou igual a 12 caracteres', severity: 'error' });
            return;
        }
        
        if (!validateOldPassword(oldPassword)) {
            setSnackbar({ children: 'A senha antiga é diferente da atual', severity: 'error' });
            return;
        }
        
        // Simulate sending updated data to the server (replace with real API call)
        const updatedUser = {
            email: email,
            senha: newPassword
        };
        
        const response = api.put('users/' + user.id, updatedUser);
        if(response.id){
            setSnackbar({ children: 'Dados foram alterado com sucesso', severity: 'success' });
        }else{
            setSnackbar({ children: 'Houve algum erro com a solicitação', severity: 'error' });
        }
        // TODO Add your API call here to update the user's details
        // e.g., axios.post('/update-user', updatedUser).then(...)
    };

    const validateOldPassword = (oldPassword) => {
        //TODO Send to Backend a request
        //const old = "1234"
        return true;
    }

    const handleCloseSnackbar = () => setSnackbar(null);
  
    return (
        <Fragment>
        <Typography variant="h4" gutterBottom>
            Configurações de usuário
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
                <FormControl fullWidth>
                <TextField
                    id="email"
                    label="Email"
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
                    label="Senha Antiga"
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
                    label="Senha Nova"
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
                    label="Confirmação da Senha Nova"
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
                Atualizar Dados
                </Button>
            </Grid>
            </Grid>
        </Box>
        <Snackbar
            open
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
            
            >
            <Alert {...snackbar} hidden={true} onClose={handleCloseSnackbar} />
            </Snackbar>
        </Fragment>
    );
};
