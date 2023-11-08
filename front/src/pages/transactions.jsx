import React from 'react';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/authContext';
import { BASE_URL } from '../services/config'
import transacTools from '../services/functions';
import TransactionHeader from '../components/transaction/transactionHeader';
import TransactionForm from '../components/transaction/transactionForm';
import TransactionList from '../components/transaction/transactionList';
import styles from '../style/transaction.module.css';

const Transactions = () => {

    const user = useContext(AuthContext)

    const [transactions, setTransactions] = useState(null)
    const [categories, setCategories] = useState(null)
    const [subCategories, setSubCategories] = useState(null)

    const [filters, setFilters] = useState({
        category: '',
        subCategory: ''
    })

    const getTransactions = () => {
        fetch(`${BASE_URL}transaction/getTransactions.php/?user_id=${user.currentUser.id}`)
            .then((response) => response.json())
            .then((data) => {
                setTransactions(data.data)
        })
    }

    const getCategories = () => {
        fetch(`${BASE_URL}categories/getCategories.php`)
            .then((response) => response.json())
            .then((data) => {
                
                setCategories(data.categories)
        })
    }

    const getSubCategories = () => {
        fetch(`${BASE_URL}categories/getSubCategories.php`)
            .then((response) => response.json())
            .then((data) => {
                setSubCategories(data.subCategories)
        })
    }

    const filterTransactions = (filters) => {
        setTransactions(transacTools.filterTransactions(transactions, filters))
    }

    useEffect(() => {
        if(user.currentUser){
            !transactions && getTransactions()
            !categories && getCategories()
            !subCategories && getSubCategories()
        }
    }, [transactions])

    return <div>
        {
            user.currentUser ?
            (
                <>
                    { (categories && subCategories) && (
                        <>
                            <TransactionForm
                                getTransactions={getTransactions}
                                categories={categories}
                                subCategories={subCategories}
                            />
                            <TransactionHeader 
                                categories={categories}
                                subCategories={subCategories}
                                filterTransactions={filterTransactions}
                            />
                        </>
                        )
                    }
                    
                    {transactions && <TransactionList
                        getTransactions={getTransactions}
                        transactions={transactions} 
                    />}
                </>
            )
            :
            (
                <h1>Transactions</h1>
            )
        }
    </div>
};

export default Transactions;