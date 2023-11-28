import React from 'react';
import { useContext } from 'react';
import TransactionContext from '../../../context/transactionContext';
import transacTools from '../../../services/functions';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Colors = {
    Food: "#0074D9",
    Transport: "#FF4136",
    Health: "#2ECC40",
    Entertainment: "#FF851B",
    Education: "#7FDBFF",
    Salary: "#B10DC9",
    Other: "#FFDC00",
}

const TransactionPie = ( {title} ) => {

    const transactions = useContext(TransactionContext).transactions
    const filteredTransaction = transactions.filter(transaction => transaction.category_name === title)
    const dataset = transacTools.getTotalByCategory(filteredTransaction)

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
        <div>
            <Pie data={data} options={options} />
        </div>
    );
};

export default TransactionPie;