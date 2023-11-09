import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/authContext';
import TransactionContext from '../context/transactionContext';
import { BASE_URL } from '../services/config'
import Dashboard from '../components/dashboard';

const Home = () => {

    const user = useContext(AuthContext)
    const [transactions, setTransactions] = useState(null)
    const [categories, setCategories] = useState(null)
    const [subCategories, setSubCategories] = useState(null)

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

    const data = useMemo(() =>{
        return { transactions, categories, subCategories }
    }, [transactions, categories, subCategories])

    useEffect(() => {
        if(user.currentUser){
            !transactions && getTransactions()
            !categories && getCategories()
            !subCategories && getSubCategories()
        }
    }, [transactions])

    return <>
        { transactions && categories && subCategories &&
            <TransactionContext.Provider value={data}>
            {
                user.currentUser ?
                (
                    <Dashboard />
                )
                :
                (
                    <h1>Home</h1>
                )
            }
            </TransactionContext.Provider>
        }
    </>
};

export default Home;