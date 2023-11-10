import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { BASE_URL } from '../../services/config';
import AuthContext from '../../context/authContext';
import TransactionContext from '../../context/transactionContext';
import styles from '../../style/form.module.css'

const BudgetForm = (props) => {

    const user = useContext(AuthContext)
    const values = useContext(TransactionContext)
    const [form, setForm] = useState({
        amount: '',
        category_id: '',
        sub_category_id: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: parseInt(e.target.value)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${BASE_URL}budget/addBudget.php`, {
            method: 'POST',
            body: JSON.stringify({
                ...form,
                user_id: user.currentUser.id
            })
        })
            .then((response) => response.json())
            .then((data) => {
                props.getBudgets()
        })
    }

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <select
                    name="category_id"
                    onChange={handleSelectChange}
                >
                    <option value="">Select a category</option>
                    {
                        values.subCategories && values.subCategories.map((subCategory) => (
                            <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                        ))
                    }
                </select>
                <input
                    type="number"
                    name="amount"
                    step={0.01}
                    placeholder="Amount"
                    onChange={handleChange}
                />
                <button
                    onClick={handleSubmit}
                >
                    Create Budget
                </button>
            </form>
        </div>
    )
};

export default BudgetForm;