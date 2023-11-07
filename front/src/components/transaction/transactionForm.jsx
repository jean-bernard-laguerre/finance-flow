import React from 'react';
import { useState } from 'react';
import { BASE_URL } from '../../services/config';
import { useContext } from 'react';
import AuthContext from '../../context/authContext';
import styles from '../../style/form.module.css';

const TransactionForm = (props) => {

    const user = useContext(AuthContext)
    const [form, setForm] = useState({
        title: '',
        description: '',
        amount: 0,
        date: '',
        place: '',
        category: 1,
        subCategory: 1,
        user_id: user.currentUser.id
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSelectChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${BASE_URL}transaction/addTransaction.php`, {
            method: 'POST',
            body: JSON.stringify(form),
        })
            .then((response) => response.json())
            .then((data) => {
                props.getTransactions()
        })
    }

    return (
        <div className={styles.container}>
            <h2>Add a transaction</h2>
            <form className={styles.form}>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                />
                <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                />
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    placeholder="Date"
                />
                <input
                    type="text"
                    name="place"
                    value={form.place}
                    onChange={handleChange}
                    placeholder="Place"
                />
                <select
                    name="category"
                    onChange={handleSelectChange}
                >
                    <option value="1">Credit</option>
                    <option value="2">Debit</option>
                </select>
                <select
                    name="subCategory"
                    onChange={handleSelectChange}
                >
                    <option value="1">Salary</option>
                    <option value="2">Bonus</option>
                    <option value="3">Other</option>
                </select>


                <button onClick={handleSubmit}>Add</button>
            </form>
        </div>
    )
};

export default TransactionForm;