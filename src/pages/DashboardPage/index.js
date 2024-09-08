import { Fragment, useEffect, useState } from "react";
import GlobalBarChart from "../../components/MainChart";
import { api } from "../../Service/backendAPI";
import useAuth from "../../hooks/useAuth";

function DashboardPage() {
    const [ transactions, setTransactions] = useState([]);
    const [ categories, setCategories] = useState([]);
    const {user} = useAuth();


    useEffect(()=>{
        getCategories();
        getTransation();
    }, [])

    const getTransation = async () => {
        try {
            const result = await api.get('transactions/user/'+ user.id);// Replace 'data-endpoint' with your actual endpoint
            console.log('NOTIF: SUCESSO',result);
            setTransactions(result);
        } catch (err) {
            console.error("NOTIF: Erro", err)
        }
    };    

    const getCategories = async () => {
        try {
            const result = await api.get('categories/user/'+ user.id);// Replace 'data-endpoint' with your actual endpoint
            console.log('NOTIF: SUCESSO',result);
            setCategories(result);
        } catch (err) {
            console.error("NOTIF: Erro", err)
        }
    };

    return (
        <Fragment>
            <h1>Gráficos </h1>
            <div style={{ height:'30rem'}}>
                { transactions.length > 0 && categories.length > 0 && <GlobalBarChart Xvalues={transactions} Yvalues={categories}/>}
            </div>
        </Fragment>
    )
}

export default DashboardPage;