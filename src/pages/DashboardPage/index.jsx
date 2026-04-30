import { Fragment, useEffect, useState } from "react";
import GlobalBarChart from "../../components/MainChart";
import { api } from "../../Service/backendAPI";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

function DashboardPage() {
    const [transactions, setTransactions] = useState([]);
    const [rendaTransactions, setRendaTransactions] = useState([]);
    const [boletoTransactions, setBoletoTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const { user } = useAuth();
    const { t } = useTranslation();

    useEffect(() => {
        getCategories();
        getTransation();
    }, [])

    const getTransation = async () => {
        try {
            const result = await api.get('transactions/user/' + user.id);
            console.log('NOTIF: SUCESSO', result);
            setBoletoTransactions(filterTransaction(result, "BOLETO"));
            setRendaTransactions(filterTransaction(result, "CREDITO"));
            console.log(boletoTransactions);
            setTransactions(result);
        } catch (err) {
            console.error("NOTIF: Erro", err)
        }
    };

    const getCategories = async () => {
        try {
            const result = await api.get('categories/user/' + user.id);
            console.log('NOTIF: SUCESSO', result);
            setCategories(result);
        } catch (err) {
            console.error("NOTIF: Erro", err)
        }
    };

    const filterTransaction = (transactions, tipoCategoria) => {
        return transactions.filter(item => item.category.tipoCategoria === tipoCategoria);
    }

    return (
        <Fragment>
            <h1>{t('pages.charts')}</h1>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                    <h2>{t('pages.bills')}</h2>
                    <div style={{ height: '30rem' }}>
                        {boletoTransactions.length > 0 && categories.length > 0 && <GlobalBarChart Xvalues={boletoTransactions} Yvalues={categories} />}
                    </div>
                </div>
                <div>
                    <h2>{t('pages.income')}</h2>
                    <div style={{ height: '30rem' }}>
                        {rendaTransactions.length > 0 && categories.length > 0 && <GlobalBarChart Xvalues={rendaTransactions} Yvalues={categories} />}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DashboardPage;
