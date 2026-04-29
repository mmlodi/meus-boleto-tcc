import { Fragment, useEffect, useState } from "react";
import GlobalBarChart from "../../components/MainChart";
import { api } from "../../Service/backendAPI";
import useAuth from "../../hooks/useAuth";

function DashboardPage() {
    const [ transactions, setTransactions] = useState([]);
    const [ rendaTransactions, setRendaTransactions] = useState([]);
    const [ boletoTransactions, setBoletoTransactions] = useState([]);
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
            setBoletoTransactions(filterTransaction(result,"BOLETO"));
            setRendaTransactions(filterTransaction(result,"CREDITO"));
            console.log(boletoTransactions);
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

    const filterTransaction = (transactions, tipoCategoria) => {
        return transactions.filter( item => item.category.tipoCategoria === tipoCategoria);
    }
    return (
        <Fragment>
            <h1>Gráficos </h1>
            <div style={{display:'flex',justifyContent:'space-around'}}>
                <div>
                    <h2>Boletos</h2>
                    <div style={{ height:'30rem'}}>
                        { boletoTransactions.length > 0 && categories.length > 0 && <GlobalBarChart Xvalues={boletoTransactions} Yvalues={categories}/>}
                    </div>
                </div>
                <div>
                    <h2>Rendas</h2>
                    <div style={{ height:'30rem'}}>
                        { rendaTransactions.length > 0 && categories.length > 0 && <GlobalBarChart Xvalues={rendaTransactions} Yvalues={categories}/>}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DashboardPage;