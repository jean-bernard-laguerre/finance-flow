import React from 'react';
import styles from '../../style/budget.module.css';

const BudgetView = (props) => {
    return (
        <div className={styles.budget}>
            <span>
                {props.budget.category_name}: {props.budget.amount} €
                &nbsp;
            </span>
            <progress
                className={`${styles.progress} ${
                    props.expenses >= props.budget.amount  ?
                    styles.red :
                    props.expenses >= props.budget.amount * 0.7 ?
                    styles.orange :
                    props.expenses >= props.budget.amount * 0.5 ?
                    styles.yellow :
                    styles.green
                }`}
                value={props.expenses}
                max={props.budget.amount}
                title={`${props.expenses} € / ${props.budget.amount} €`}
            />
        </div>
    )
};

export default BudgetView;