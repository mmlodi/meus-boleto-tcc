import React, { useEffect, useState } from "react";
import DataGridCategory from "../../components/CategoryDataGrid";
import { api } from "../../Service/backendAPI"
import useAuth from "../../hooks/useAuth";
import { Alert, Snackbar } from "@mui/material";
function CategoryPage() {
    const [categories, setCategories] = useState([]);
    const [snackbar, setSnackbar] = useState(null);
    const {user} = useAuth();
    useEffect(()=>{
        getCategories();
    },[])

    const getCategories = async () => {
        try {
            const result = await api.get('categories/user/'+user.id);
            console.log('NOTIF: SUCESSO',result);
            setCategories(result);
        } catch (err) {
            console.error("NOTIF: Erro", err)
        }
    };

    const postCategories = async (category) => {
        try {
            const result = await api.post('categories',category);// Replace 'data-endpoint' with your actual endpoint
            console.log('NOTIF: SUCESSO',result);
            getCategories();
        } catch (err) {
            console.error("NOTIF: Erro", err)
        }
    };

    const putCategories = async (id,category) => {
        try {
            const result = await api.put('categories/' + id, category);// Replace 'data-endpoint' with your actual endpoint
            console.log('NOTIF: SUCESSO',result);
            getCategories();
        } catch (err) {
            console.error("NOTIF: Erro", err)
        }
    };

    const deleteCategories = async (id) => {
        try {
            const result = await api.delete('categories/'+ id);// Replace 'data-endpoint' with your actual endpoint
            console.log('NOTIF: SUCESSO',result);
            getCategories();
        } catch (err) {
            console.error("NOTIF: Erro", err)
        }
    };

    const handleCreate = (body) =>{
        console.log(body);
        body = {...body, user: {id: user.id }}

        console.log("CRIAÇÃO CATEGORIAAA ",body);
        if (body.categoryName == "" ) {
            setSnackbar({ children: 'O Campo de nome da categoria não estar vazio!', severity: 'error' })
            return;
        }

        if (body.tipoCategoria == null ) {
            setSnackbar({ children: 'O Campo de tipo categoria não estar vazio!', severity: 'error' })
            return;
        }
        postCategories(body);
    }

    const handleUpdate= (id,body) =>{
        if (body.categoryName == "" ) {
            setSnackbar({ children: 'O Campo de nome da categoria não estar vazio!', severity: 'error' })
            return;
        }

        putCategories(id,body);
        setSnackbar({ children: 'Alterações salvas', severity: 'success' })
    }

    const handleDelete = (id) =>{
        deleteCategories(id);
    }

    const handleCloseSnackbar = () => setSnackbar(null);
  
    return(
        <React.Fragment>
            <h1>Categorias</h1>
            
            {<DataGridCategory categories={categories} onCreate={handleCreate} onUpdate={handleUpdate} onDelete={handleDelete}/>}
            <Snackbar
                open
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={handleCloseSnackbar}
                autoHideDuration={6000}
                
                >
                <Alert {...snackbar} hidden={true} onClose={handleCloseSnackbar} />
            </Snackbar>
        </React.Fragment>
    )
}

export default CategoryPage;