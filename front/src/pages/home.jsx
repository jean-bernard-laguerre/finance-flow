import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/authContext';
import { BASE_URL } from '../services/config'
import { Chart } from 'chart.js';
import TransationChart from '../components/transaction/transactionChart';

const Home = () => {

    const user = useContext(AuthContext)
    const [transactions, setTransactions] = useState(null)

    const getTransactions = () => {
        fetch(`${BASE_URL}transaction/getTransactions.php/?user_id=${user.currentUser.id}`)
            .then((response) => response.json())
            .then((data) => {
                setTransactions(data.data)
        })
    }

    useEffect(() => {
        if(user.currentUser){
            !transactions && getTransactions()
        }
    }, [transactions])

    return (
        <div>
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
        </div>
    );    
}
export default Home;