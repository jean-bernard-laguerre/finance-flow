import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import BudgetsForm from './budgetForm'
import { BASE_URL } from '../../services/config';
import AuthContext from '../../context/authContext';
import TransactionContext from '../../context/transactionContext';
import transacTools from '../../services/functions';
import BudgetView from './budgetView';
import styles from '../../style/budget.module.css';

const Budgets = () => {

    const user = useContext(AuthContext)
    const values = useContext(TransactionContext)
    const [budgets, setBudgets] = useState(null)

    const getBudgets = () => {
        fetch(`${BASE_URL}budget/getBudgets.php/?user_id=${user.currentUser.id}`)
            .then((response) => response.json())
            .then((data) => {
                setBudgets(data.budgets)
        })
    }

    useEffect(() => {
        if(user.currentUser){
            !budgets && getBudgets()
        }
    }, [budgets])

    return (
        <div className={styles.container}>
            <BudgetsForm 
                getBudgets={getBudgets}
            />
            {
                budgets && budgets.map((budget) => (
                    <BudgetView
                        key={budget.id}
                        budget={budget}
                        expenses={transacTools.getSubBalance(
                            values.transactions,
                            budget.category_id,
                        )}
                    />
                ))
            }
        </div>
    )
};

export default Budgets;