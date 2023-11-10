import React from 'react';
import styles from '../../style/budget.module.css';

const BudgetView = (props) => {
    return (
        <div className={styles.budget}>
            <span>
                {props.budget.category_name}:&nbsp;
            </span>
            <progress
                className={`${styles.progress} ${(props.budget.amount >= props.expenses) ? styles.green : styles.red}`}
                value={props.expenses}
                max={props.budget.amount}
                title={`${props.expenses} € / ${props.budget.amount} €`}
            />
        </div>
    )
};

export default BudgetView;