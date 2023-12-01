import React, { useEffect } from 'react';
import { useState } from 'react';
import { BASE_URL } from '../../services/config';
import { useContext } from 'react';
import AuthContext from '../../context/authContext';
import styles from '../../style/form.module.css';
import TransactionContext from '../../context/transactionContext';
import useForm from '../../hooks/useForm';

const validateForm = (form) => {

    let valid = true
    let fields = ['title', 'description', 'amount', 'date', 'place']

    fields.forEach((field) => {
        if(form[field] == '' || form[field] == undefined) {
            valid = false
        }
    })
    return valid
}

const TransactionForm = (props) => {

    const user = useContext(AuthContext)
    const settings = useContext(TransactionContext)
    const form = useForm({
        title: '',
        description: '',
        amount: '',
        date: '',
        place: '',
        category: 1,
        subCategory: 1,
        user_id: user.currentUser.id
    }, validateForm)

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${BASE_URL}transaction/addTransaction.php`, {
            method: 'POST',
            body: JSON.stringify(form.values),
        })
            .then((response) => response.json())
            .then((data) => {
                props.getTransactions()
                props.closeModal(false)
        })
    }

    return (
        <div className={styles.container}>
            <form className={styles.form}>

                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={form.handleChange}
                    placeholder="Title"
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={form.handleChange}
                    placeholder="Description"
                />
                <label htmlFor="amount">Amount</label>
                <input
                    type="number"
                    name="amount"
                    step={0.01}
                    min={0}
                    value={form.amount}
                    onChange={form.handleChange}
                    placeholder="Amount"
                />
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={form.handleChange}
                    placeholder="Date"
                />
                <label htmlFor="place">Place</label>
                <input
                    type="text"
                    name="place"
                    value={form.place}
                    onChange={form.handleChange}
                    placeholder="Place"
                />
                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    onChange={form.handleSelectChange}
                >
                    {settings.categories.map((category) => {
                        return (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    })}
                </select>
                <label htmlFor="subCategory">SubCategory</label>
                <select
                    name="subCategory"
                    onChange={form.handleSelectChange}
                >
                    {settings.subCategories.map((category) => {
                        return (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    })}
                </select>


                <button
                    disabled={!form.valid}
                    onClick={handleSubmit}
                >
                        Add Transaction
                </button>
            </form>
        </div>
    )
};

export default TransactionForm;