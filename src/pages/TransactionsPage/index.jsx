import React from "react";
import FullFeaturedCrudGrid from "../../components/CategoryDataGrid";
import { useTranslation } from "react-i18next";

function TransactionsPage() {
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <h1>{t('pages.transactions')}</h1>
            <FullFeaturedCrudGrid />
        </React.Fragment>
    )
}

export default TransactionsPage;
