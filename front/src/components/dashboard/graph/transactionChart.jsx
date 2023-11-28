import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import TransactionContext from '../../../context/transactionContext';
import styles from '../../../style/graph.module.css';


const TransactionChart = () => {

    const transactions = useContext(TransactionContext).transactions
    const Credit = transactions.filter(transaction => transaction.category_name === 'Credit')
    const Debit = transactions.filter(transaction => transaction.category_name === 'Debit')
    
    const data = {
        labels: transactions.map(transaction => transaction.transaction_date),
        datasets: [{
            yAxisID: 'A',
            label: 'Credit',
            data: Credit.map(transaction => Number(transaction.amount)),
        },
        {
            yAxisID: 'A',
            label: 'Debit',
            data: Debit.map(transaction => Number(transaction.amount)),
        }]
    }

    const options = {
        scales: {
            A: {
                beginAtZero: true
            }
        }
    }

    return (
        <div className={styles.graph}>
            <Line data={data} options={options} />
        </div>
    );
};

export default TransactionChart;