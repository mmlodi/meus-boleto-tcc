import { useEffect, useState } from "react";
import GlobalBarChart from "../../components/MainChart";
import { api } from "../../Service/backendAPI";

function DashboardPage() {
    const [ transactions, setTransactions] = useState([]);
    const [ categories, setCategories] = useState([]);

    useEffect(()=>{
        getCategories();
        getTransation();
    }, [])

    const getTransation = async () => {
        try {
            const result = await api.get('transactions/user/1');// Replace 'data-endpoint' with your actual endpoint
            console.log('NOTIF: SUCESSO',result);
            setTransactions(result);
        } catch (err) {
            console.error("NOTIF: Erro", err)
        }
    };    

    const getCategories = async () => {
        try {
            const result = await api.get('categories');// Replace 'data-endpoint' with your actual endpoint
            console.log('NOTIF: SUCESSO',result);
            setCategories(result);
        } catch (err) {
            console.error("NOTIF: Erro", err)
        }
    };

    return (
    <div style={{ height:'30rem'}}>
        { transactions.length > 0 && categories.length > 0 && <GlobalBarChart Xvalues={transactions} Yvalues={categories}/>}
    </div>)
}

export default DashboardPage;