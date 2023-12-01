import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { BASE_URL } from '../../services/config';
import AuthContext from '../../context/authContext';
import TransactionContext from '../../context/transactionContext';
import styles from '../../style/form.module.css'
import useForm from '../../hooks/useForm';

const validateForm = (form) => {

    let valid = true
    let fields = ['amount', 'category_id']

    fields.forEach((field) => {
        if(form[field] == '' || form[field] == undefined) {
            valid = false
        }
    })
    return valid
}

const BudgetForm = (props) => {

    const user = useContext(AuthContext)
    const values = useContext(TransactionContext)
    const form = useForm({
        amount: '',
        category_id: '',
        sub_category_id: '',
    }, validateForm)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${BASE_URL}budget/addBudget.php`, {
            method: 'POST',
            body: JSON.stringify({
                ...form.values,
                user_id: user.currentUser.id
            })
        })
            .then((response) => response.json())
            .then((data) => {
                props.getBudgets()
        })
    }

    return (
        <div className={styles.budget}>
            <form className={styles.form}>
                <label htmlFor="category_id">Category</label>
                <select
                    name="category_id"
                    onChange={form.handleSelectChange}
                >
                    <option value="">Select a category</option>
                    {
                        values.subCategories && values.subCategories.map((subCategory) => (
                            <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                        ))
                    }
                </select>
                <label htmlFor="amount">Amount</label>
                <input
                    type="number"
                    name="amount"
                    step={0.01}
                    placeholder="Amount"
                    onChange={form.handleChange}
                />
                <button
                    disabled={!form.valid}
                    onClick={handleSubmit}
                >
                    Create/Update Budget
                </button>
            </form>
        </div>
    )
};

export default BudgetForm;