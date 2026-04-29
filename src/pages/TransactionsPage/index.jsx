
import React from "react";
import FullFeaturedCrudGrid from "../../components/CategoryDataGrid";

function TransactionsPage() {
    //Alterar esse datagrid
    return(
        <React.Fragment>
            <h1>Transações</h1>
            <FullFeaturedCrudGrid/>
        </React.Fragment>
    )
}

export default TransactionsPage;