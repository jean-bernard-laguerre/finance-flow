import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../../style/transaction.module.css';
import { BASE_URL } from '../../services/config';
import transacTools from '../../services/functions';

const TransactionList = ({transactions, getTransactions}) => {

    const [balance, setBalance] = useState(transacTools.getBalance(transactions))

    const deleteTransaction = (id) => {
        fetch(`${BASE_URL}transaction/deleteTransaction.php/?id=${id}`)
            .then((response) => response.json())
            .then((data) => {
                getTransactions()
        })
    }

    useEffect(() => {
        setBalance(transacTools.getBalance(transactions))
    }, [transactions])
    
    return (
        <div>
            <table className={styles.table}>
                <thead className={styles.table_head}>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Place</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((transaction) => {
                            return (
                                <tr key={transaction.id}>
                                    <td>{transaction.title}</td>
                                    <td>{transaction.amount} €</td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.transaction_date}</td>
                                    <td>{transaction.place}</td>
                                    <td>{transaction.category_name}</td>
                                    <td>{transaction.subcategory_name}</td>
                                    <td>
                                        <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td className={styles.table_head}>Balance:</td>
                        <td className={styles.balance}>{balance} €</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default TransactionList;