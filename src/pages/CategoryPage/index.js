import React, { useEffect, useState } from "react";
import DataGridCategory from "../../components/CategoryDataGrid";
import { api } from "../../Service/backendAPI"
function CategoryPage() {
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        getCategories();
    },[])

    const getCategories = async () => {
        try {
            const result = await api.get('categories');// Replace 'data-endpoint' with your actual endpoint
            console.log('NOTIF: SUCESSO',result);
            setCategories(result);
        } catch (err) {
            console.error("NOTIF: Erro", err)
        }
    };
    return(
        <React.Fragment>
            <h1>Categorias</h1>
            
            {categories && <DataGridCategory categories={categories}/>}
        </React.Fragment>
    )
}

export default CategoryPage;