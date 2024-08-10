import React from "react";
import FullFeaturedCrudGrid from "../../components/CategoryDataGrid";

function CategoryPage() {
    return(
        <React.Fragment>
            <h1>Categorias</h1>
            
            <FullFeaturedCrudGrid/>
        </React.Fragment>
    )
}

export default CategoryPage;