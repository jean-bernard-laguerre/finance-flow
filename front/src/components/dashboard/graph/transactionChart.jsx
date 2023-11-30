import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import TransactionContext from '../../../context/transactionContext';
import styles from '../../../style/graph.module.css';
import finances from '../../../services/functions';


const TransactionChart = () => {

    const transactions = useContext(TransactionContext).transactions
    const perDay = finances.getPerDayReport(transactions)
    
    const data = {
        labels: Object.keys(perDay),
        datasets: [{
            yAxisID: 'A',
            label: 'Credit',
            data: Object.values(perDay).map(day => day.Credit),
        },
        {
            yAxisID: 'A',
            label: 'Debit',
            data: Object.values(perDay).map(day => day.Debit),
        }]
    }

    const options = {
        scales: {
            A: {
                beginAtZero: true
            }
        },
        maintainAspectRatio: false,
        responsive: true,
    }

    return (
        <div className={styles.graph}>
            <Line 
                data={data}
                options={options}
                width={"100%"}
                height={"100%"}
            />
        </div>
    );
};

export default TransactionChart;