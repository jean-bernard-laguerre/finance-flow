import React from 'react';
import styles from '../../style/transaction.module.css';
import { BASE_URL } from '../../services/config';

const TransactionList = ({transactions, getTransactions}) => {

    const deleteTransaction = (id) => {
        fetch(`${BASE_URL}transaction/deleteTransaction.php`, {
            method: 'POST',
            body: JSON.stringify({id: id}),
        })
            .then((response) => response.json())
            .then((data) => {
                getTransactions()
        })
    }
    
    return (
        <div>
            <h3>Transaction List</h3>
            <table className={styles.table}>
                <thead className={styles.table_head}>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Place</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((transaction) => {
                            return (
                                <tr key={transaction.id}>
                                    <td>{transaction.title}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.transaction_date}</td>
                                    <td>{transaction.place}</td>
                                    <td>{transaction.category_name}</td>
                                    <td>
                                        <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;