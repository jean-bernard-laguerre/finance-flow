import React from 'react';
import styles from '../../style/transaction.module.css';

const TransactionList = ({transactions}) => {
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