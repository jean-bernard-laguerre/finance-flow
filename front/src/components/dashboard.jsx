import React, { useContext } from 'react';
import Budgets from './dashboard/budgets';
import TransactionChart from './dashboard/graph/transactionChart';
import TransactionPie from './dashboard/graph/transactionPie';
import TransactionContext from '../context/transactionContext';
import styles from '../style/dashboard.module.css';

const Dashboard = () => {

    return (
        <section>
            <h2>Dashboard</h2>
            <div className={styles.container}>
            
                <Budgets />
                <div className={styles.graphContainer}>
                    <TransactionChart/>
                    {<div className={styles.pieContainer}>
                        <TransactionPie
                            title="Credit"
                        />
                        <TransactionPie
                            title="Debit"
                        />
                    </div>}
                </div>
            </div>
        </section>
    )
};

export default Dashboard;