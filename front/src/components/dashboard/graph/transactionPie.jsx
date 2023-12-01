import React from 'react';
import { useContext } from 'react';
import TransactionContext from '../../../context/transactionContext';
import finances from '../../../services/functions';
import styles from '../../../style/graph.module.css';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Colors = {
    Food: "#0074D9C0",
    Transport: "#FF4136C0",
    Health: "#2ECC40C0",
    Entertainment: "#FF851BC0",
    Education: "#7FDBFFC0",
    Salary: "#B10DC9C0",
    Other: "#FFDC00C0",
}

const TransactionPie = ( {title} ) => {

    const transactions = useContext(TransactionContext).transactions
    const filteredTransaction = transactions.filter(transaction => transaction.category_name === title)
    const dataset = finances.getTotalByCategory(filteredTransaction)

    const data = {
        labels: Object.keys(dataset),
        datasets: [{
            label: title,
            data: Object.values(dataset),
            backgroundColor: Object.keys(dataset).map(key => Colors[key]),
        }]
    }

    const options = {
        plugins: {
            title: {
                display: true,
                text: title,
                font: {
                    size: 20
                }
            },
            legend: {
                display: true,
                position: 'bottom'
            }
        }
    }

    return (
        <div className={styles.pie}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default TransactionPie;